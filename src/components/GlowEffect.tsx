import { useEffect, useRef } from "react";

export default function GlowEffect() {
    const glowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = glowRef.current
        if (!el) return
        const onMove = (e: MouseEvent) => {
        el.style.background = `radial-gradient(35rem at ${e.clientX}px ${e.clientY}px, rgba(124, 124, 124, 0.1), transparent 80%)`
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return (
        <div 
            ref={glowRef}
            style={{
                position: 'fixed', inset: 0,
                pointerEvents: 'none',
                zIndex: 1,
                transition: 'background 0.1s ease',
            }}
        />
    )
}