import { useState, useRef, useEffect, useCallback } from 'react'
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from 'react-icons/fa'
import type { Album } from './Albums'
import { ALBUMS } from './Albums'
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

    const {rotation, resetRotation} = useDiscRotation(playing)

    const audioRef = useRef<HTMLAudioElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const playingRef = useRef(false)
    const transitioningRef = useRef(false)
    const seekingRef = useRef(false) 
    const dragTimeRef = useRef<number | null>(null)

    const syncPlaying = (v: boolean) => {playingRef.current = v; setPlaying(v)}

    const album = ALBUMS[albumIdx]
    const track = album.tracks[trackIdx]
    const hasAudio = Boolean(track.src)

    // Updates duration of the track
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onDuration = () => {
            if (isFinite(audio.duration)) setDuration(audio.duration)
        }

        audio.addEventListener("durationchange", onDuration)

        return () => audio.removeEventListener("durationchange", onDuration)
    }, [])

    // Play Helper Function
    const play = async () => {
        const audio = audioRef.current

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
        audioRef.current?.pause()
        syncPlaying(false)
    }

    // Playback Toggler
    const togglePlay = () => playing ? pause() : play()


    // Reset state when album is changed
    const resetAlbum = () => {
        resetRotation()
        setTrackIdx(0)
        pause()
        setCurrentTime(0)
        setDuration(0)
    }

    useEffect(() => {
        resetAlbum()
    }, [albumIdx, resetRotation])


    // Loads new track
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.src = track.src ?? ''
        audio.volume = volume
        setCurrentTime(0)
        if (playingRef.current && track.src) audio.play().catch(() => syncPlaying(false))
    }, [albumIdx, trackIdx])


    // Updates current time of the track
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onTime = () => {
            const timeLeft = audio.duration - audio.currentTime

            if (seekingRef.current && isFinite(timeLeft) && timeLeft <= 3) {
                seekingRef.current = false
                dragTimeRef.current = null
                setSeeking(false)
                setCurrentTime(audio.currentTime)
            } else if (!seekingRef.current) {
                setCurrentTime(audio.currentTime)
            }
        }

        audio.addEventListener("timeupdate", onTime)

        return () => audio.removeEventListener("timeupdate", onTime)
    }, [])

    // Handles when track ends in album
    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const onEnded = () => {
            if (trackIdx < album.tracks.length - 1) {
                setTrackIdx(i => i + 1)
            } else {
                pause()
                setCurrentTime(0)
                setTrackIdx(0) // Returns to first track
            }
        }

        audio.addEventListener("ended", onEnded)

        return () => audio.removeEventListener("ended", onEnded)
    }, [trackIdx, album.tracks.length])


    // Allows using spacebar to pause/unpause
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.code !== 'Space') return
            
            // Override default spacebar behaviour
            e.preventDefault()

            const audio = audioRef.current
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


    // Dragging progress bar logic
    const seekToClientX = useCallback((clientX: number) => {
        const bar = progressRef.current
        const audio = audioRef.current

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
    }, [duration])
    
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
            if (seekingRef.current && dragTimeRef.current !== null && audioRef.current) {
                audioRef.current.currentTime = dragTimeRef.current
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
    }, [seekToClientX])

    const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value)
        setVolume(v)
        if (audioRef.current) audioRef.current.volume = v
    }

    const prevTrack = () => {if (trackIdx > 0) setTrackIdx(i => i - 1)}
    const nextTrack = () => {if (trackIdx < album.tracks.length - 1) setTrackIdx(i => i + 1)}

    // CD Transition animation
    const finishTransition = () => {
        setCarouselAnim('')
        transitioningRef.current = false
    }

    const goAlbum = (dir: 1 | -1) => {
        const newIdx = albumIdx + dir
        if (newIdx < 0 || newIdx >= ALBUMS.length || transitioningRef.current) return
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

    const prevAlbum = ALBUMS[albumIdx - 1]
    const nextAlbum = ALBUMS[albumIdx + 1]

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

                    <button className="cd-nav-arrow" onClick={() => goAlbum(1)} disabled={albumIdx === ALBUMS.length - 1} aria-label="Next album">
                        &#8250;
                    </button>
                </section>

                {/* Player */}
                <section className="cd-player">
                    <div className="cd-info">
                        <span className="cd-album-name">{track.title}</span>
                        <span className="cd-track-name">{track.artist}</span>
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

                <audio ref={audioRef} />
            </div>
        </main>
    )
}
