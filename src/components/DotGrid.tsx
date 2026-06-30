import { useEffect, useRef } from "react";

export default function DotGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const SPACING = 28
        const RADIUS = 1.2
        const COLOR = '150, 150, 150'

        let animId: number
        let t = 0

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const cols = Math.ceil(canvas.width / SPACING)
            const rows = Math.ceil(canvas.height / SPACING)

            for (let r = 0; r <= rows; r++) {
                for (let c = 0; c <= cols; c++) {
                    const x = c * SPACING
                    const y = r * SPACING
                    const wave = Math.sin(t + c * 0.4 + r * 0.4)
                    const alpha = 0.15 + 0.2 * ((wave + 1) / 2)

                    ctx.beginPath()
                    ctx.arc(x, y, RADIUS, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${COLOR}, ${alpha})`
                    ctx.fill()
                }
            }

            t += 0.025
            animId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    )
}
