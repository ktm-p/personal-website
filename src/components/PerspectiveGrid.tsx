import { useEffect, useRef } from 'react'

export default function PerspectiveGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const RADIAL = 9 // Number of columns on floor
        const DEPTH = 9 // Number of rows on floor
        const OUTER_ALPHA = 0.1  // Initial opacity
        const INNER_ALPHA = 0.0   // Final opacity

        type P = [number, number]
        const lerp = (a: P, b: P, t: number): P => [
            a[0] + (b[0] - a[0]) * t,
            a[1] + (b[1] - a[1]) * t,
        ]

        // Create a line with gradient from outerAlpha to innerAlpha
        const fadeLine = (p1: P, p2: P, outerAlpha: number, innerAlpha: number) => {
            const grad = ctx.createLinearGradient(p1[0], p1[1], p2[0], p2[1])
            grad.addColorStop(0, `rgba(255,255,255,${outerAlpha})`)
            grad.addColorStop(1, `rgba(255,255,255,${innerAlpha})`)
            ctx.strokeStyle = grad
            ctx.beginPath()
            ctx.moveTo(p1[0], p1[1])
            ctx.lineTo(p2[0], p2[1])
            ctx.stroke()
        }

        const drawFace = (o1: P, o2: P, i1: P, i2: P) => {
            // Drawing radial lines
            for (let n = 0; n <= RADIAL; n++) {
                const t = n / RADIAL
                fadeLine(lerp(o1, o2, t), lerp(i1, i2, t), OUTER_ALPHA, INNER_ALPHA)
            }

            // Drawing depth lines
            for (let d = 1; d < DEPTH; d++) {
                const t = d / DEPTH
                const alpha = OUTER_ALPHA * (1 - t)
                const p1 = lerp(o1, i1, t)
                const p2 = lerp(o2, i2, t)
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`
                ctx.beginPath()
                ctx.moveTo(p1[0], p1[1])
                ctx.lineTo(p2[0], p2[1])
                ctx.stroke()
            }
        }

        const draw = () => {
            const W = canvas.width
            const H = canvas.height

            // Dimensions for back opening
            const iX = W * 0.28
            const iY = H * 0.20
            const iW = W * 0.44
            const iH = H * 0.60

            ctx.clearRect(0, 0, W, H)
            ctx.lineWidth = 0.7

            const TL: P = [0, 0]
            const TR: P = [W, 0]
            const BL: P = [0, H]
            const BR: P = [W, H]
            const iTL: P = [iX, iY]
            const iTR: P = [iX + iW, iY]
            const iBL: P = [iX, iY + iH]
            const iBR: P = [iX + iW, iY + iH]

            // Floor
            drawFace(BL, BR, iBL, iBR)
            // Ceiling
            drawFace(TL, TR, iTL, iTR)
            // Left wall
            drawFace(TL, BL, iTL, iBL)
            // Right wall
            drawFace(TR, BR, iTR, iBR)

        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            draw()
        }

        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
        />
    )
}
