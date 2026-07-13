#!/usr/bin/env node
/**
 * Script to upload music using yt-dlp onto an R2 storage.
 * Contains the following information:
 * - Album Name
 * - Artist Name
 * - Album Cover
 * - Tracks:
 *  - Track Name
 *  - Track Duration
 *  - Track source
 * 
 * Usage:
 *   node scripts/add-album.mjs "https://music.youtube.com/playlist?list=..."
 *   node scripts/add-album.mjs "Cafune I Watch The Moon"
 **/

import 'dotenv/config'
import { execSync } from 'child_process'
import { readdirSync, readFileSync, mkdtempSync, rmSync, createReadStream } from 'fs'
import { join, extname, basename } from 'path'
import { tmpdir } from 'os'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const {
    R2_ACCOUNT_ID,
    R2_ACCESS_KEY_ID,
    R2_SECRET_ACCESS_KEY,
    R2_BUCKET,
    R2_PUBLIC_URL,
    R2_PREFIX,
} = process.env

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET || !R2_PREFIX) {
    console.error('Error: Missing R2 information.')
    process.exit(1)
}

const query = process.argv[2]
if (!query) {
    console.error('Usage: node scripts/add-album.mjs [url or search query]')
    process.exit(1)
}

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY
    },
})

const slugify = str =>
    str.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const contentType = file => ({
    '.mp3': 'audio/mpeg',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.png': 'image/png',
}[extname(file).toLowerCase()] ?? 'application/octet-stream')

async function uploadToR2(localPath, r2Key) {
    await s3.send(new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: r2Key,
        Body: createReadStream(localPath),
        ContentType: contentType(localPath),
    }))
    const base = R2_PUBLIC_URL || `https://${R2_BUCKET}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
    return `${base}/${r2Key}`
}

const tmpDir = mkdtempSync(join(tmpdir(), 'album-'))
console.log(`\nDownloading to: ${tmpDir}\n`)

try {
    const isUrl = query.startsWith('http')
    const outputTmpl = join(tmpDir, '%(autonumber)02d. %(title)s.%(ext)s')
    const ytArgs = [
        '-x', '--audio-format', 'mp3', '--audio-quality', '0',
        '--write-thumbnail', '--convert-thumbnails', 'jpg',
        '--write-info-json', '--no-write-playlist-metafiles',
        '-o', outputTmpl,
        isUrl ? query : `ytsearch1:${query} full album`,
    ]

    try {
        execSync(`yt-dlp ${ytArgs.map(a => JSON.stringify(a)).join(' ')}`, { stdio: 'inherit' })
    } catch {
        console.error('\nError: yt-dlp failed. Make sure yt-dlp and ffmpeg are both on your PATH.')
        throw err
    }

    const files = readdirSync(tmpDir)
    const mp3Files = files.filter(f => f.endsWith('.mp3')).sort()

    if (mp3Files.length === 0) {
        const allFiles = readdirSync(tmpDir)
        console.error('\nError: No MP3 files found. Files actually downloaded:')
        throw err
    }

    // Read first track's JSON for album metadata
    const firstJson = join(tmpDir, mp3Files[0].replace('.mp3', '.info.json'))
    const firstInfo = JSON.parse(readFileSync(firstJson, 'utf8'))
    const albumTitle = firstInfo.album ?? firstInfo.playlist_title ?? firstInfo.title ?? 'Unknown Album'
    const albumArtist = firstInfo.artist ?? firstInfo.channel ?? firstInfo.uploader ?? 'Unknown Artist' // TO-DO: Album may have multiple artists
    const albumSlug = slugify(`${albumArtist}-${albumTitle}`)

    console.log(`\n${albumTitle} - ${albumArtist}`)
    console.log(`\n${mp3Files.length} track(s) found\n`)

    let coverUrl = ''
    const jpgFiles = files.filter(f => /\.(jpg|jpeg)$/i.test(f)).sort()

    if (jpgFiles.length > 0) {
        const localCover = join(tmpDir, jpgFiles[0])
        const r2Key = `${R2_PREFIX}/${albumSlug}/cover.jpg`
        process.stdout.write('\nUploading cover art... ')
        try {
            coverUrl = await uploadToR2(localCover, r2Key)
            console.log(`Done: ${coverUrl}`)
        } catch (err) {
            console.error(`Error: Failed to upload album cover`)
            throw err
        }
        
    }

    const tracks = []
    console.log()

    for (let i = 0; i < mp3Files.length; i++) {
        const mp3File = mp3Files[i]
        const jsonFile = mp3File.replace('.mp3', '.info.json')
        const infoPath = join(tmpDir, jsonFile)

        let trackTitle = basename(mp3File, '.mp3')
        let artist = ''
        let duration = 0

        if (files.includes(jsonFile)) {
            const info = JSON.parse(readFileSync(infoPath, 'utf8'))
            trackTitle = info.title ?? trackTitle
            artist = info.artist ?? info.channel ?? 'Unknown Artist'
            duration = Math.round(info.duration ?? 0)
        }

        const num = String(i + 1).padStart(2, '0')
        const r2Key = `${R2_PREFIX}/${albumSlug}/${num}-${slugify(trackTitle)}.mp3`

        process.stdout.write(`[${num}] ${trackTitle} (${duration}s)... `)
        try {
            const src = await uploadToR2(join(tmpDir, mp3File), r2Key)
            console.log("Done")
            tracks.push({title: trackTitle, artist, duration, src})
        } catch (err) {
            console.error(`Error: Failed to upload ${trackTitle}`)
            throw err
        }   
    }

    console.log("Finished uploading all tracks")

    const trackLines = tracks
        .map(t => `\t\t{ title: ${JSON.stringify(t.title)}, artist: ${JSON.stringify(t.artist)}, duration: ${t.duration}, src: ${JSON.stringify(t.src)} },`)
        .join('\n')

    const snippet = `{\n\ttitle: ${JSON.stringify(albumTitle)},\n\tartist: ${JSON.stringify(albumArtist)},\n\tcover: ${JSON.stringify(coverUrl)},\n\ttracks: [${trackLines}\n\t],\n},`

    console.log('\n\nUpload complete! Paste this into ALBUMS in index.tsx:\n')
    console.log('-'.repeat(72))
    console.log(snippet)
    console.log('-'.repeat(72))
} catch (err) {
    console.error(err)
    process.exitCode = 1
} finally {
    rmSync(tmpDir, {recursive: true, force: true})
}