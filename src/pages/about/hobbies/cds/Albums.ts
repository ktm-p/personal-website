export interface Track {
    deezerTrackId: number
    title: string
    artist: string
    duration: number
    src?: string
}

export interface Album {
    deezerAlbumId: number
    title: string
    artist: string
    cover: string
    tracks: Track[]
}

interface Catalog {
    version: number
    albums: Album[]
}

const ALBUMS_URL = import.meta.env.VITE_ALBUMS_URL as string | undefined
const PREVIEW_WORKER_URL = import.meta.env.VITE_PREVIEW_WORKER_URL as string | undefined

// Loads the album catalog from our R2
export async function fetchAlbums(): Promise<Album[]> {
    if (!ALBUMS_URL) throw new Error('VITE_ALBUMS_URL is not set')
    const res = await fetch(ALBUMS_URL, { cache: 'no-cache' })
    if (!res.ok) throw new Error(`Failed to load album catalog (${res.status})`)
    const data = (await res.json()) as Catalog
    return data.albums ?? []
}

// Returns fresh URLs for music preview from Deezer using Cloudflare Workers
export async function fetchAlbumPreviews(deezerAlbumId: number): Promise<Record<string, string>> {
    if (!PREVIEW_WORKER_URL) throw new Error('VITE_PREVIEW_WORKER_URL is not set')
    const base = PREVIEW_WORKER_URL.replace(/\/$/, '')
    const res = await fetch(`${base}/album/${deezerAlbumId}`)
    if (!res.ok) throw new Error(`Preview worker error (${res.status})`)
    return (await res.json()) as Record<string, string>
}
