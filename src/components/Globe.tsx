import { useEffect, useRef, useCallback } from 'react'
import { geoOrthographic, geoPath, geoGraticule } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'

// Countries' ISO Code
const VISITED = new Set([
    840, // United States
    704, // Vietnam
    344, // Hong Kong
])

const WORLD_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json'

export default function Globe({size = 420}: {size?: number}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rotationRef = useRef<[number, number, number]>([0, -20, 0])
    const scaleRef = useRef(size / 2 - 16)
    const draggingRef = useRef(false)
    const lastPosRef = useRef({x: 0, y: 0})
    const animIdRef = useRef<number>(0)

    // Lets users zoom in on the globe
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const baseScale = size / 2 - 16
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            scaleRef.current = Math.max(
                baseScale * 0.5,
                Math.min(baseScale * 3, scaleRef.current - e.deltaY * 0.4)
            )
        }
        canvas.addEventListener('wheel', onWheel, {passive: false})
        return () => canvas.removeEventListener('wheel', onWheel)
    }, [size])

    // Draws the actual globe itself
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const projection = geoOrthographic()
            .translate([size / 2, size / 2])
            .clipAngle(90)

        const pathGen  = geoPath(projection, ctx)
        const graticule = geoGraticule()
        let countries: GeoJSON.FeatureCollection | null = null

        fetch(WORLD_URL)
            .then(r => r.json())
            .then((world: Topology) => {
                countries = feature(world, (world.objects as any).countries) as GeoJSON.FeatureCollection
            })

        const draw = () => {
            projection
                .rotate(rotationRef.current)
                .scale(scaleRef.current)

            ctx.clearRect(0, 0, size, size)

            // Longitude/Latitude lines
            ctx.beginPath()
            pathGen(graticule())
            ctx.strokeStyle = 'rgba(255,255,255,0.07)'
            ctx.lineWidth = 0.5
            ctx.stroke()

            // Countries
            if (countries) {
                for (const f of countries.features) {
                    const visited = VISITED.has(Number(f.id))
                    ctx.beginPath()
                    pathGen(f)
                    if (visited) {
                        ctx.fillStyle = 'rgba(255,255,255,0.45)'
                        ctx.fill()
                        ctx.strokeStyle = 'rgba(255,255,255,0.85)'
                    } else {
                        ctx.strokeStyle = 'rgba(255,255,255,0.15)'
                    }
                    ctx.lineWidth = 0.5
                    ctx.stroke()
                }
            }

            // Globe outline
            ctx.beginPath()
            pathGen({type: 'Sphere'})
            ctx.strokeStyle = 'rgba(255,255,255,0.7)'
            ctx.lineWidth = 1.5
            ctx.stroke()
        }

        const frame = () => {
            if (!draggingRef.current) {
                const r = rotationRef.current
                rotationRef.current = [r[0] + 0.12, r[1], r[2]]
            }
            draw()
            animIdRef.current = requestAnimationFrame(frame)
        }

        animIdRef.current = requestAnimationFrame(frame)
        return () => cancelAnimationFrame(animIdRef.current)
    }, [size])

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        draggingRef.current = true
        lastPosRef.current = {x: e.clientX, y: e.clientY}
    }, [])

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        if (!draggingRef.current) return
        const dx = e.clientX - lastPosRef.current.x
        const dy = e.clientY - lastPosRef.current.y
        const [lambda, phi, gamma] = rotationRef.current
        rotationRef.current = [
            lambda + dx * 0.35,
            Math.max(-90, Math.min(90, phi - dy * 0.35)),
            gamma,
        ]
        lastPosRef.current = {x: e.clientX, y: e.clientY}
    }, [])

    const onMouseUp = useCallback(() => {
        draggingRef.current = false
    }, [])

    return (
        <canvas
            ref={canvasRef}
            width={size}
            height={size}
            style={{cursor: 'grab', display: 'block'}}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        />
    )
}
