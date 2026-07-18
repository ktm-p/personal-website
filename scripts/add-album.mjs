#!/usr/bin/env node
/**
 * add-album.mjs
 *
 * Searches Deezer for an album, lets you pick from the results, then upserts the
 * album into a catalog JSON ("albums.json") stored on Cloudflare R2.
 *
 * The catalog stores only metadata/Deezer IDs; I am not uploading .mp3 files!
 *
 * Usage:
 *  List results and you pick:
 *   node scripts/add-album.mjs "Charli XCX Brat"
 *  Picks result k:
 *   node scripts/add-album.mjs "Cbarli XCX Brat" 2
 *  Prints merged JSON without upload: 
 *   node scripts/add-album.mjs "Charli XCX Brat" --dry
 * 
 * Requires:
 *  R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_ALBUMS_KEY
 */

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import dotenv from 'dotenv'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '.env') })
dotenv.config({ path: path.join(__dirname, '..', '.env') })

// Parsing flags
const rawArgs = process.argv.slice(2)
const dryRun = rawArgs.includes('--dry')
const positional = rawArgs.filter(a => !a.startsWith('--'))
const query = positional[0]
const pickArg = positional[1] !== undefined ? Number(positional[1]) : undefined

// R2 Credentials
const { R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET, R2_ALBUMS_KEY } = process.env
const missingEnv = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET', 'R2_ALBUMS_KEY'].filter(k => !process.env[k])

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
})


if (!query) {
    console.error('Usage: node scripts/add-album.mjs "Artist Album" [result#] [--dry]')
    process.exit(1)
}


// Helper for interacting with Deezer
async function deezer(path) {
    const res = await fetch(`https://api.deezer.com${path}`)
    if (!res.ok) throw new Error(`Deezer API error ${res.status}: ${path}`)

    const data = await res.json()
    if (data.error) throw new Error(`Deezer: ${data.error.message} (code ${data.error.code})`)
    return data
}

// Search Deezer for given query, printing out the result
async function searchAlbum(query) {
    console.log(`\nSearching Deezer for "${query}"...\n`)
    const search = await deezer(`/search/album?q=${encodeURIComponent(query)}&limit=8`)

    if (!search.data?.length) {
        throw new Error('No albums found. Try a different search query.')
    }

    console.log('Results:')
    search.data.forEach((a, i) =>
        console.log(`  [${i + 1}] ${a.title} by ${a.artist.name}`)
    )

    return search.data
}


// Prompts user to pick a result
async function chooseAlbum(results) {
    // If the user passes in a specific result number
    if (pickArg !== undefined) {
        if (!Number.isInteger(pickArg) || pickArg < 1 || pickArg > results.length) {
            throw new Error(`Invalid result #${positional[1]}. There are ${results.length} results.`)
        }
        return results[pickArg - 1]
    }

    // Otherwise, interactive interface for user to select result
    const count = results.length
    const rl = createInterface({
        input: stdin,
        output: stdout
    })

    while (true) {
        const ans = await rl.question(
            `\nPick a result # (1-${results.length}):`
        )

        const n = Number(ans)

        if (Number.isInteger(n) && n >= 1 && n <= count) {
            rl.close()
            const picked = results[n - 1]
            console.log(`\nUsing [${n}]: ${picked.title} by ${picked.artist.name}\n`)
            return picked
        }

        console.log('\nInvalid selection made. Please select a valid number.')
    }
}

// Fetches album and tracks using the Deezer API given the Album ID
async function fetchMetadata(id) {
    const [albumDetail, trackData] = await Promise.all([
        deezer(`/album/${id}`),
        deezer(`/album/${id}/tracks?limit=100`)
    ])

    return {albumDetail, trackData}
}

// Builds the album given the Album ID
async function buildAlbum(id) {
    const {albumDetail, trackData} = await fetchMetadata(id)

    if (!trackData.data?.length) {
        throw new Error('No tracks found for this album.')
    }
    
    const album = {
        deezerAlbumId: albumDetail.id,
        title: albumDetail.title,
        artist: albumDetail.artist.name,
        cover: albumDetail.cover_xl ?? albumDetail.cover_big ?? albumDetail.cover ?? '',
        tracks: trackData.data.map(t => ({
            deezerTrackId: t.id,
            title: t.title,
            artist: t.artist.name,
            duration: t.duration,
        })),
    }

    console.log(`${album.tracks.length} track(s):`)
    album.tracks.forEach((t, i) =>
        console.log(`  ${String(i + 1).padStart(2, '0')}. ${t.title} (${t.duration}s)`)
    )

    return album
}

// Upserts into our R2
function makeCatalog(albums) {
    return { version: 1, albums }
}

// Merge album into an existing catalog, replacing any album with the same ID. Sorted by artist name, then album name (A-Z).
function upsert(catalog, album) {
    const albums = Array.isArray(catalog?.albums) ? [...catalog.albums] : []

    const idx = albums.findIndex(
        a => a.deezerAlbumId === album.deezerAlbumId
    )

    if (idx >= 0) {
        albums[idx] = album
        console.log(`\nReplacing existing entry for "${album.title}" in catalog.`)
    } else {
        albums.push(album)
        console.log(`\nAppending "${album.title}" to catalog.`)
    }

    albums.sort((a, b) =>
        a.artist.localeCompare(b.artist) ||
        a.title.localeCompare(b.title)
    )

    return makeCatalog(albums)
}

// Loads catalog from our R2
async function loadCatalog(s3) {
    try {
        const res = await s3.send(new GetObjectCommand({Bucket: R2_BUCKET, Key: R2_ALBUMS_KEY}))

        return JSON.parse(await res.Body.transformToString())
    } catch (err) {
        if (err?.name === 'NoSuchKey' || err?.$metadata?.httpStatusCode === 404) {
            console.log('\nNo existing albums.json found. Creating a new catalog.')
            return makeCatalog([])
        }

        throw err
    }
}

// Upload catalog to R2
async function uploadCatalog(s3, catalog) {
    await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: R2_ALBUMS_KEY,
        Body: JSON.stringify(catalog),
        ContentType: 'application/json',
        CacheControl: 'max-age=300',
    }))

    console.log(`\nUploaded ${catalog.albums.length} album(s) to r2://${R2_BUCKET}/${R2_ALBUMS_KEY}`)
}

async function main() {
    const results = await searchAlbum(query)
    const picked = await chooseAlbum(results)
    const album = await buildAlbum(picked.id)

    if (dryRun) {
        const merged = upsert(makeCatalog([]), album)
        console.log('\n--- DRY RUN (not uploaded) ---')
        console.log(JSON.stringify(merged, null, 2))
        return
    }

    if (missingEnv.length) {
        console.error(`\nMissing env var(s): ${missingEnv.join(', ')}. Set them in .env or run with --dry.`)
        process.exit(1)
    }


    const catalog = await loadCatalog(s3)
    const merged = upsert(catalog, album)

    await uploadCatalog(s3, merged)
}

try {
    await main()
} catch (err) {
    console.error(err.message)
    process.exit(1)
}