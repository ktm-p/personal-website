import { useEffect, useRef, useState, useCallback } from 'react'

const ROTATION_SPEED = 360 / 6000 // Takes 6 seconds to do a full revolution

// Logic for rendering disc rotation
export function useDiscRotation(playing: boolean) {
    const [rotation, setRotation] = useState(0)

    const rotationRef = useRef(0)
    const rafRef = useRef(0)
    const lastTsRef = useRef<number | null>(null)

    useEffect(() => {
        if (!playing) {
            cancelAnimationFrame(rafRef.current)
            lastTsRef.current = null
            return
        }

        const tick = (ts: number) => {
            if (lastTsRef.current !== null) {
                rotationRef.current += (ts - lastTsRef.current) * ROTATION_SPEED
            }

            lastTsRef.current = ts
            setRotation(rotationRef.current % 360)

            rafRef.current = requestAnimationFrame(tick)
        }

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            cancelAnimationFrame(rafRef.current)
            lastTsRef.current = null
        }
    }, [playing])

    const resetRotation = useCallback(() => {
        rotationRef.current = 0
        lastTsRef.current = null
        setRotation(0)
    }, [])

    return {
        rotation,
        resetRotation,
    }
}