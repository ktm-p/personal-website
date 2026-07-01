import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export type Phase = 'idle' | 'exit' | 'between' | 'enter'

interface TransitionCtx {
    phase: Phase
    triggerNavigation: (to: string) => void
}

const TransitionContext = createContext<TransitionCtx>({
    phase: 'idle',
    triggerNavigation: () => {},
})

export function usePageTransition() {
    return useContext(TransitionContext)
}

const DURATION = 900

export function TransitionProvider({children}: {children: React.ReactNode}) {
    const [phase, setPhase] = useState<Phase>('idle')
    const navigate = useNavigate()
    const pending = useRef<string | null>(null)
    const busy = useRef(false)

    const triggerNavigation = useCallback((to: string) => {
        if (busy.current) return
        busy.current = true
        pending.current = to
        setPhase('exit')

        setTimeout(() => {
            setPhase('between')
            requestAnimationFrame(() => {
                navigate(pending.current!)
                requestAnimationFrame(() => {
                    setPhase('enter')
                    setTimeout(() => {
                        setPhase('idle')
                        busy.current = false
                    }, DURATION)
                })
            })
        }, DURATION)
    }, [navigate])

    return (
        <TransitionContext.Provider value={{phase, triggerNavigation}}>
            {children}
        </TransitionContext.Provider>
    )
}
