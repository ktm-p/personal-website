#!/usr/bin/env node
/**
 * add-album.mjs
 *
 * Searches Deezer for an album then prints out entry for Albums.ts.
 * Contains the following information:
 *  - Album Title
 *  - Album Cover
 *  - Track Title
 *  - Track Artist
 *  - Track Audio
 * 
 * Usage:
 *   node scripts/add-album.mjs "Charli XCX Brat"
 *   node scripts/add-album.mjs "Radiohead OK Computer" 2       [picks 2nd search result]
 */

const query = process.argv[2]
const resultPick = Number(process.argv[3] ?? 1)

if (!query) {
    console.error('Usage: node scripts/add-album.mjs "Artist Album" [result#]')
    process.exit(1)
}

async function deezer(path) {
    const res = await fetch(`https://api.deezer.com${path}`)
    if (!res.ok) throw new Error(`Deezer API error ${res.status}: ${path}`)

    const data = await res.json()
    if (data.error) throw new Error(`Deezer: ${data.error.message} (code ${data.error.code})`)
    return data
}


// Search for given album
console.log(`\nSearching Deezer for "${query}"...\n`)
const search = await deezer(`/search/album?q=${encodeURIComponent(query)}&limit=8`)

if (!search.data?.length) {
    console.error('No albums found. Try a different search query.')
    process.exit(1)
}

// Returns list of albums
console.log('Results:')
search.data.forEach((a, i) =>
    console.log(`  [${i + 1}] ${a.title} by ${a.artist.name}`)
)

// Picks result user chose. Default = 1
const picked = search.data[resultPick - 1]
if (!picked) {
    console.error(`\nNo result #${resultPick}. Run again without the number to see all results.`)
    process.exit(1)
}

console.log(`\nUsing [${resultPick}]: ${picked.title} by ${picked.artist.name}\n`)

// Fetch album detail
const albumDetail = await deezer(`/album/${picked.id}`)
const coverUrl = albumDetail.cover_xl ?? albumDetail.cover_big ?? albumDetail.cover ?? ''

// Fetch track details
const trackData = await deezer(`/album/${picked.id}/tracks?limit=100`)

if (!trackData.data?.length) {
    console.error('No tracks found for this album.')
    process.exit(1)
}

const tracks = trackData.data.map(t => ({
    title: t.title,
    artist: t.artist.name,
    duration: t.duration,
    src: t.preview || null,
}))

console.log(`${tracks.length} track(s):\n`)
tracks.forEach((t, i) => {
    const mark = t.src ? '[Y]' : '[N]'
    console.log(`  ${mark} ${String(i + 1).padStart(2, '0')}. ${t.title} (${t.duration}s)`)
})

const missing = tracks.filter(t => !t.src).length
if (missing > 0)
    console.log(`\nNote: ${missing} track(s) have no Deezer preview.`)

// Returns ready-to-paste information for Albums.ts
const trackLines = tracks
    .map(t => t.src
        ? `            { title: ${JSON.stringify(t.title)}, artist: ${JSON.stringify(t.artist)}, duration: ${t.duration}, src: ${JSON.stringify(t.src)} },`
        : `            { title: ${JSON.stringify(t.title)}, artist: ${JSON.stringify(t.artist)}, duration: ${t.duration} },`
    )
    .join('\n')

const snippet =
`    {
        title: ${JSON.stringify(albumDetail.title)},
        artist: ${JSON.stringify(albumDetail.artist.name)},
        cover: ${JSON.stringify(coverUrl)},
        tracks: [
${trackLines}
        ],
    },`

console.log('\n\nPaste this into ALBUMS in index.tsx:\n')
console.log('-'.repeat(72))
console.log(snippet)
console.log('-'.repeat(72))
