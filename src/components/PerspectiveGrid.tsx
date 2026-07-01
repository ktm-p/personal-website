import { useEffect, useRef } from 'react'
import { usePageTransition, type Phase } from '../context/TransitionContext'

const DURATION = 900 // Match TransitionContext
const IDLE_SPEED = 0
const PEAK_SPEED = 10.0

function easeInOut(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

export default function PerspectiveGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const {phase} = usePageTransition()
    const phaseRef = useRef<Phase>(phase)

    useEffect(() => {phaseRef.current = phase}, [phase])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const RADIAL = 9
        const DEPTH = 9
        const OUTER_ALPHA = 0.1
        const INNER_ALPHA = 0.0

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

        const drawFace = (o1: P, o2: P, i1: P, i2: P, offset: number) => {
            // Radial lines
            for (let n = 0; n <= RADIAL; n++) {
                const t = n / RADIAL
                fadeLine(lerp(o1, o2, t), lerp(i1, i2, t), OUTER_ALPHA, INNER_ALPHA)
            }

            // Depth lines
            for (let d = 0; d < DEPTH; d++) {
                const t = 1 - ((d / DEPTH + offset) % 1)
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

        const drawAt = (offset: number) => {
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
            drawFace(BL, BR, iBL, iBR, offset)
            // Ceiling
            drawFace(TL, TR, iTL, iTR, offset)
            // Left wall
            drawFace(TL, BL, iTL, iBL, offset)
            // Right wall
            drawFace(TR, BR, iTR, iBR, offset)
        }

        let depthOffset = 0
        let prevTime = 0
        let exitStart: number | null = null
        let enterStart: number | null = null
        let animId: number

        const frame = (now: number) => {
            const dt = prevTime === 0 ? 0 : (now - prevTime) / 1000
            prevTime = now

            const p = phaseRef.current
            let speed = IDLE_SPEED

            if (p === 'exit') {
                if (exitStart === null) {exitStart = now; enterStart = null}
                const progress = Math.min((now - exitStart) / DURATION, 1)
                speed = IDLE_SPEED + easeInOut(progress) * (PEAK_SPEED - IDLE_SPEED)
            } else if (p === 'enter') {
                if (enterStart === null) {enterStart = now; exitStart = null}
                const progress = Math.min((now - enterStart) / DURATION, 1)
                speed = PEAK_SPEED - easeInOut(progress) * (PEAK_SPEED - IDLE_SPEED)
            } else {
                exitStart = null
                enterStart = null
            }

            depthOffset = (depthOffset + speed * dt) % 1
            drawAt(depthOffset)
            animId = requestAnimationFrame(frame)
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener('resize', resize)
        animId = requestAnimationFrame(frame)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0}}
        />
    )
}
