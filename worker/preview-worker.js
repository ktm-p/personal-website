/**
 * Cloudflare Worker
 *
 * Resolves FRESH Deezer preview URLs on demand so the site never stores expiring
 * (`hdnea=exp=…`) links. Given a Deezer album id it returns a map of
 * { [deezerTrackId]: previewUrl } for that album's tracks.
 *
 * Slightly sketch, but we ball unless I get told it's a no-no... I can't really find much information on this.
 */

const DEEZER_API = 'https://api.deezer.com'

// Worker echoes back the request's Origin only if it's in the provided [vars] list
function corsHeaders(request, env) {
    const requestOrigin = request.headers.get('Origin') || ''
    const allowed = (env?.ALLOWED_ORIGINS || env?.ALLOWED_ORIGIN || '*')
        .split(',')
        .map(o => o.trim())
        .filter(Boolean)

    const allowOrigin = allowed.includes('*')
        ? '*'
        : (allowed.includes(requestOrigin) ? requestOrigin : allowed[0])

    return {
        'Access-Control-Allow-Origin': allowOrigin,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin',
    }
}

function json(request, body, status, env, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json', ...corsHeaders(request, env), ...extraHeaders },
    })
}

export default {
    async fetch(request, env, ctx) {
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers: corsHeaders(request, env) })
        }
        if (request.method !== 'GET') {
            return json(request, { error: 'method not allowed' }, 405, env)
        }

        const url = new URL(request.url)

        // Only accept /album/<digits>
        const match = url.pathname.match(/^\/album\/(\d+)$/)
        if (!match) {
            return json(request, { error: 'not found - use GET /album/:numericId' }, 400, env)
        }
        const albumId = match[1]

        // Skips the Deezer subrequest whenever possible using cache
        const cache = caches.default
        const cacheKey = new Request(`${url.origin}/album/${albumId}`, request)
        const cached = await cache.match(cacheKey)
        if (cached) return cached

        let deezerRes
        try {
            deezerRes = await fetch(`${DEEZER_API}/album/${albumId}/tracks?limit=100`, {
                headers: { 'Accept': 'application/json' },
            })
        } catch {
            return json(request, { error: 'upstream fetch failed' }, 502, env)
        }
        if (!deezerRes.ok) {
            return json(request, { error: `deezer error ${deezerRes.status}` }, 502, env)
        }

        const data = await deezerRes.json()
        if (data.error) {
            return json(request, { error: data.error.message || 'deezer error' }, 404, env)
        }

        const previews = {}
        for (const t of data.data ?? []) {
            if (t.preview) previews[t.id] = t.preview
        }

        const res = json(request, previews, 200, env, { 'Cache-Control': 'max-age=300' })
        // Cache asynchronously; never longer than Deezer's preview validity
        ctx.waitUntil(cache.put(cacheKey, res.clone()))
        return res
    },
}
