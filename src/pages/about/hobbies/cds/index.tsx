import { useState, useRef, useEffect, useCallback } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa'
import type { Album } from './Albums'
import { fetchAlbums, fetchAlbumPreviews } from './Albums'
import { useDiscRotation } from './DiscRotation'
import './index.css'


// Formatting time to be MM:SS
function formatTime(s: number): string {
    const m = Math.floor(s / 60)
    return `${m}:${Math.floor(s % 60).toString().padStart(2, '0')}`
}

// Rendering CD Disc
function CDisc({album, rotation = 0, size}: {album: Album; rotation?: number; size: number}) {
    return (
        <div className="cd-disc" style={{width: size, height: size, transform: `rotate(${rotation}deg)`}}>
            {album.cover ? <img src={album.cover} alt={album.title} className='cd-cover'/> : <div className='cd-cover cd-cover-empty'/>}
            <div className="cd-hole" />
        </div>
    )
}

// Transition Timing
const TRANSITION_MS = 350

// How many seconds left for crossfade to start
const CROSSFADE_SECONDS = 3

export default function CDs() {
    // Set initial state
    const [albumIdx, setAlbumIdx] = useState(0)
    const [trackIdx, setTrackIdx] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(0.8)
    const [carouselAnim, setCarouselAnim] = useState('')
    const [seeking, setSeeking] = useState(false)
    // Which of the two audio tracks is the main one
    const [activeIndex, setActiveIndex] = useState(0)

    // Album catalog is loaded from R2 at runtime
    const [albums, setAlbums] = useState<Album[]>([])
    const [catalogState, setCatalogState] = useState<'loading' | 'ready' | 'error'>('loading')
    const [hydrating, setHydrating] = useState(false)

    const {rotation, resetRotation} = useDiscRotation(playing)

    // Two audio tracks to allow for crossfade effect
    const audioRefA = useRef<HTMLAudioElement>(null)
    const audioRefB = useRef<HTMLAudioElement>(null)

    const progressRef = useRef<HTMLDivElement>(null)
    const playingRef = useRef(false)
    const transitioningRef = useRef(false)
    const seekingRef = useRef(false)
    const dragTimeRef = useRef<number | null>(null)

    const activeIndexRef = useRef(0)
    const crossfadingRef = useRef(false) // Flag for if a crossfade is in progress
    const handoffRef = useRef(false) // Flag for if next trackIdx change is a crossfade handoff (don't reload)
    const rafRef = useRef<number | null>(null)
    const volumeRef = useRef(volume)

    const syncPlaying = (v: boolean) => {playingRef.current = v; setPlaying(v)}

    // Helpers to reach the active/inactive tracks
    const activeAudio = useCallback(() => (activeIndexRef.current === 0 ? audioRefA : audioRefB).current, [])
    const inactiveAudio = useCallback(() => (activeIndexRef.current === 0 ? audioRefB : audioRefA).current, [])

    // Safe against an empty catalog (loading/error) and an out-of-range trackIdx after album switches
    const album = albums[albumIdx]
    const track = album ? (album.tracks[trackIdx] ?? album.tracks[0]) : undefined
    const hasAudio = Boolean(track?.src)

    // Load the album catalog once on mount (catalogState starts as 'loading')
    useEffect(() => {
        let cancelled = false
        fetchAlbums()
            .then(list => { if (!cancelled) { setAlbums(list); setCatalogState('ready') } })
            .catch(err => { if (!cancelled) { console.error('Failed to load albums:', err); setCatalogState('error') } })
        return () => { cancelled = true }
    }, [])

    // Resolve fresh preview URLs for the active album via the Worker
    useEffect(() => {
        const alb = albums[albumIdx]
        if (!alb || alb.tracks.every(t => t.src)) return
        let cancelled = false
        setHydrating(true)
        fetchAlbumPreviews(alb.deezerAlbumId)
            .then(map => {
                if (cancelled) return
                setAlbums(prev => prev.map((a, i) =>
                    i === albumIdx
                        ? { ...a, tracks: a.tracks.map(t => ({ ...t, src: map[t.deezerTrackId] ?? t.src })) }
                        : a
                ))
            })
            .catch(err => { if (!cancelled) console.error('Failed to refresh previews:', err) })
            .finally(() => { if (!cancelled) setHydrating(false) })
        return () => { cancelled = true }
    }, [albumIdx, albums])

    // Cancels crossfade and restores both tracks to a clean state
    const cancelCrossfade = useCallback(() => {
        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
        crossfadingRef.current = false
        handoffRef.current = false

        const inc = inactiveAudio()
        if (inc) {
            inc.pause()
            inc.currentTime = 0
            inc.volume = volumeRef.current
        }

        const act = activeAudio()
        if (act) act.volume = volumeRef.current
    }, [activeAudio, inactiveAudio])

    // Completes a crossfade: hand off playback to the incoming track and advance the track
    const finalizeCrossfade = useCallback((nextIdx: number) => {
        if (!crossfadingRef.current) return
        crossfadingRef.current = false

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }

        const outgoing = activeAudio()
        const incoming = inactiveAudio()

        if (outgoing) {
            outgoing.pause()
            outgoing.volume = volumeRef.current // restore for later reuse
        }
        if (incoming) incoming.volume = volumeRef.current

        // Swaps the two tracks
        handoffRef.current = true
        activeIndexRef.current = activeIndexRef.current === 0 ? 1 : 0
        setActiveIndex(activeIndexRef.current)
        setTrackIdx(nextIdx)
    }, [activeAudio, inactiveAudio])

    // Begins a crossfade from the active track into the next track
    const startCrossfade = useCallback((nextIdx: number, nextSrc: string) => {
        const outgoing = activeAudio()
        const incoming = inactiveAudio()
        if (!outgoing || !incoming) return

        crossfadingRef.current = true

        incoming.src = nextSrc
        incoming.currentTime = 0
        incoming.volume = 0
        incoming.play().catch(() => {})

        const step = () => {
            if (!crossfadingRef.current) return

            if (!isFinite(outgoing.duration)) {
                rafRef.current = requestAnimationFrame(step)
                return
            }

            const timeLeft = outgoing.duration - outgoing.currentTime
            const p = Math.max(0, Math.min(1, (CROSSFADE_SECONDS - timeLeft) / CROSSFADE_SECONDS))
            const vol = volumeRef.current

            outgoing.volume = vol * (1 - p)
            incoming.volume = vol * p

            if (p >= 1) {
                finalizeCrossfade(nextIdx)
                return
            }
            rafRef.current = requestAnimationFrame(step)
        }
        rafRef.current = requestAnimationFrame(step)
    }, [activeAudio, inactiveAudio, finalizeCrossfade])

    // Updates duration of the active track
    useEffect(() => {
        const audio = activeAudio()
        if (!audio) return

        const onDuration = () => {
            if (isFinite(audio.duration)) setDuration(audio.duration)
        }

        audio.addEventListener("durationchange", onDuration)

        return () => audio.removeEventListener("durationchange", onDuration)
    }, [activeIndex, activeAudio, track?.src])

    // Play Helper Function
    const play = async () => {
        const audio = activeAudio()

        if (!audio || !hasAudio)
            return

        try {
            await audio.play()
            syncPlaying(true)
        } catch {
            syncPlaying(false)
        }
    }

    // Pause Helper Function
    const pause = () => {
        if (crossfadingRef.current) cancelCrossfade()
        audioRefA.current?.pause()
        audioRefB.current?.pause()
        syncPlaying(false)
    }

    // Playback Toggler
    const togglePlay = () => playing ? pause() : play()


    // Reset state when album is changed
    const resetAlbum = () => {
        cancelCrossfade()
        resetRotation()
        setTrackIdx(0)
        pause()
        setCurrentTime(0)
        setDuration(0)
    }

    useEffect(() => {
        resetAlbum()
    }, [albumIdx, resetRotation])


    // Loads new track onto the active deck
    useEffect(() => {
        const audio = activeAudio()
        if (!audio) return

        // A crossfade handoff already has the correct track playing; don't reload it
        if (handoffRef.current) {
            handoffRef.current = false
            setCurrentTime(0)
            if (isFinite(audio.duration)) setDuration(audio.duration)
            return
        }

        audio.src = track?.src ?? ''
        audio.volume = volumeRef.current
        setCurrentTime(0)
        if (playingRef.current && track?.src) audio.play().catch(() => syncPlaying(false))
    }, [albumIdx, trackIdx, activeIndex, activeAudio, track?.src])


    // Updates current time of the track, and triggers the crossfade near the end
    useEffect(() => {
        const audio = activeAudio()
        if (!audio) return

        const onTime = () => {
            // Ignore events from a track that is no longer the active one (post-handoff straggler)
            if (audio !== activeAudio()) return

            const timeLeft = audio.duration - audio.currentTime

            if (seekingRef.current && isFinite(timeLeft) && timeLeft <= 3) {
                seekingRef.current = false
                dragTimeRef.current = null
                setSeeking(false)
                setCurrentTime(audio.currentTime)
            } else if (!seekingRef.current) {
                setCurrentTime(audio.currentTime)
            }

            // Start the crossfade CROSSFADE_SECONDS before the current track ends only if it's auto-advancing
            if (album && playingRef.current && !crossfadingRef.current && !seekingRef.current && isFinite(audio.duration)) {
                const hasNext = trackIdx < album.tracks.length - 1
                const nextSrc = hasNext ? album.tracks[trackIdx + 1].src : undefined
                if (hasNext && nextSrc && audio.duration > CROSSFADE_SECONDS && timeLeft <= CROSSFADE_SECONDS) {
                    startCrossfade(trackIdx + 1, nextSrc)
                }
            }
        }

        audio.addEventListener("timeupdate", onTime)

        return () => audio.removeEventListener("timeupdate", onTime)
    }, [activeIndex, trackIdx, albumIdx, album, activeAudio, startCrossfade])

    // Handles when a track ends in an album
    useEffect(() => {
        const audio = activeAudio()
        if (!audio) return

        const onEnded = () => {
            // Ignore a straggler event from a track that has already been swapped out by a crossfade handoff (otherwise, we double-advances trackIdx, thereby skipping a track)
            if (audio !== activeAudio()) return

            // A track ending mid-crossfade just completes the crossfade
            if (crossfadingRef.current) {
                finalizeCrossfade(trackIdx + 1)
                return
            }

            if (album && trackIdx < album.tracks.length - 1) {
                setTrackIdx(i => i + 1)
            } else {
                pause()
                setCurrentTime(0)
                setTrackIdx(0) // Returns to first track
            }
        }

        audio.addEventListener("ended", onEnded)

        return () => audio.removeEventListener("ended", onEnded)
    }, [activeIndex, trackIdx, album, activeAudio, finalizeCrossfade])


    // Allows using spacebar to pause/unpause
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== 'Space') return

            // Override default spacebar behaviour
            e.preventDefault()

            const audio = activeAudio()
            if (!audio || !hasAudio) return

            if (playingRef.current) {
                pause()
            } else {
                play()
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [hasAudio])

    // Cancel any pending fade frame on unmount
    useEffect(() => () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }, [])


    // Dragging progress bar logic
    const seekToClientX = useCallback((clientX: number) => {
        const bar = progressRef.current
        const audio = activeAudio()

        if (!bar || !duration) return

        if (audio && isFinite(audio.duration) && audio.duration - audio.currentTime <= 2) {
            seekingRef.current = false
            dragTimeRef.current = null
            setSeeking(false)
            return
        }

        const pct = Math.max(0, Math.min(1, (clientX - bar.getBoundingClientRect().left) / bar.offsetWidth))
        dragTimeRef.current = pct * duration
        setCurrentTime(dragTimeRef.current)
    }, [duration, activeAudio])

    // When mouse is held down, we set seekingRef to True, and we move the progress bar accordingly
    const onProgressMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault() // Prevents highlighting when moving mouse around
        seekingRef.current = true
        setSeeking(true)
        seekToClientX(e.clientX)
    }, [seekToClientX])

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!seekingRef.current) return

            seekToClientX(e.clientX)
        }

        const onUp   = () => {
            const audio = activeAudio()
            if (seekingRef.current && dragTimeRef.current !== null && audio) {
                audio.currentTime = dragTimeRef.current
            }

            dragTimeRef.current = null
            seekingRef.current = false
            setSeeking(false)
        }

        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup',   onUp)

        return () => {
            document.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseup',   onUp)
        }
    }, [seekToClientX, activeAudio])

    const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value)
        volumeRef.current = v
        setVolume(v)
        // Mid-crossfade the fade loop owns both tracks' volume; otherwise set the active deck directly
        if (!crossfadingRef.current) {
            const audio = activeAudio()
            if (audio) audio.volume = v
        }
    }

    // If a previously-resolved preview URL fails (e.g. an expired token mid-session), re-resolve the active album's previews once.
    const handleAudioError = useCallback((e: React.SyntheticEvent<HTMLAudioElement>) => {
        const el = e.currentTarget
        if (hydrating || !el.src || !el.src.includes('dzcdn')) return
        const alb = albums[albumIdx]
        if (!alb) return
        setHydrating(true)
        fetchAlbumPreviews(alb.deezerAlbumId)
            .then(map => setAlbums(prev => prev.map((a, i) =>
                i === albumIdx
                    ? { ...a, tracks: a.tracks.map(t => ({ ...t, src: map[t.deezerTrackId] ?? t.src })) }
                    : a
            )))
            .catch(() => {})
            .finally(() => setHydrating(false))
    }, [albums, albumIdx, hydrating])

    // No crossfades for manual skips
    const prevTrack = () => {if (trackIdx > 0) {cancelCrossfade(); setTrackIdx(i => i - 1)}}
    const nextTrack = () => {if (album && trackIdx < album.tracks.length - 1) {cancelCrossfade(); setTrackIdx(i => i + 1)}}

    // CD Transition animation
    const finishTransition = () => {
        setCarouselAnim('')
        transitioningRef.current = false
    }

    const goAlbum = (dir: 1 | -1) => {
        const newIdx = albumIdx + dir
        if (newIdx < 0 || newIdx >= albums.length || transitioningRef.current) return
        cancelCrossfade()
        transitioningRef.current = true
        setCarouselAnim(dir === 1 ? 'slide-exit-left' : 'slide-exit-right')
        setTimeout(() => {
            setAlbumIdx(newIdx)
            setCarouselAnim(dir === 1 ? 'slide-enter-right' : 'slide-enter-left')
            setTimeout(finishTransition, TRANSITION_MS)
        }, TRANSITION_MS)
    }

    const totalTime = duration
    const pct = totalTime > 0 ? (currentTime / totalTime) * 100 : 0

    const prevAlbum = albums[albumIdx - 1]
    const nextAlbum = albums[albumIdx + 1]

    if (catalogState === 'loading') {
        return (
            <main className="cds">
                <h1>CD Collection</h1>
                <p className="cds-status">Loading albums…</p>
            </main>
        )
    }
    if (catalogState === 'error') {
        return (
            <main className="cds">
                <h1>CD Collection</h1>
                <p className="cds-status">Couldn't load the album catalog. Please try again later.</p>
            </main>
        )
    }
    if (!album || !track) {
        return (
            <main className="cds">
                <h1>CD Collection</h1>
                <p className="cds-status">No albums yet.</p>
            </main>
        )
    }

    return (
        <main className="cds">
            <h1>CD Collection</h1>

            <div className="cd-section">
                <h2>{album.title}</h2>

                {/* CD Carousel */}
                <section className="cd-carousel-section">
                    <button className="cd-nav-arrow" onClick={() => goAlbum(-1)} disabled={albumIdx === 0} aria-label="Previous album">
                        &#8249;
                    </button>

                    <div className={`cd-carousel${carouselAnim ? ` ${carouselAnim}` : ''}`}>
                        <div className="cd-slot side">
                            {prevAlbum && <CDisc album={prevAlbum} size={200} />}
                        </div>
                        <div className="cd-slot center">
                            <CDisc album={album} rotation={rotation} size={280} />
                        </div>
                        <div className="cd-slot side">
                            {nextAlbum && <CDisc album={nextAlbum} size={200} />}
                        </div>
                    </div>

                    <button className="cd-nav-arrow" onClick={() => goAlbum(1)} disabled={albumIdx === albums.length - 1} aria-label="Next album">
                        &#8250;
                    </button>
                </section>

                {/* Player */}
                <section className="cd-player">
                    <div className="cd-info">
                        <span className="cd-album-name">{track.title}</span>
                        <span className="cd-track-name">{track.artist}</span>
                        {hydrating && !hasAudio && <span className="cd-loading-audio">Loading audio…</span>}
                    </div>

                    <div className="cd-progress-area">
                        <span className="cd-time">{formatTime(currentTime)}</span>
                        <div className={`cd-progress-bar${seeking ? ' seeking' : ''}`} ref={progressRef} onMouseDown={onProgressMouseDown}>
                            <div className="cd-progress-fill" style={{ width: `${pct}%` }} />
                            <div className="cd-progress-thumb" style={{ left: `${pct}%` }} />
                        </div>
                        <span className="cd-time cd-time-right">{formatTime(totalTime)}</span>
                    </div>

                    <div className="cd-controls">
                        <button className="cd-btn" onClick={prevTrack} disabled={trackIdx === 0} aria-label="Previous track">
                            <FaStepBackward />
                        </button>
                        <button className="cd-btn cd-btn-play" onClick={togglePlay} disabled={!hasAudio} aria-label={playing ? 'Pause' : 'Play'}>
                            {playing ? <FaPause /> : <FaPlay />}
                        </button>
                        <button className="cd-btn" onClick={nextTrack} disabled={trackIdx === album.tracks.length - 1} aria-label="Next track">
                            <FaStepForward />
                        </button>

                        <div className="cd-volume-control">
                            <FaVolumeUp className="cd-volume-icon" />
                            <input type="range" className="cd-volume-slider" min={0} max={1} step={0.01} value={volume} onChange={onVolumeChange} aria-label="Volume"/>
                        </div>
                    </div>
                </section>

                <audio ref={audioRefA} onError={handleAudioError} />
                <audio ref={audioRefB} onError={handleAudioError} />
            </div>
        </main>
    )
}
