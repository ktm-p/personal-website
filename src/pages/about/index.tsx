import { useState, useEffect, useRef, useCallback } from 'react'
import SectionNav from '../../components/SectionNav'
import BackgroundContent from './sections/Background'
import './index.css'

function TimelineContent() {
    return <p>Placeholder.</p>
}

function HobbiesContent() {
    return <p>Placeholder.</p>
}


const SECTIONS: {title: string; Content: () => React.ReactNode}[] = [
    {title: 'Background', Content: BackgroundContent},
    {title: 'Timeline', Content: TimelineContent},
    {title: 'Hobbies', Content: HobbiesContent},
]


export default function About() {
    const [current, setCurrent] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<HTMLElement[]>([])
    const headingRefs = useRef<HTMLElement[]>([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const onScroll = () => {
            const mid = window.innerHeight / 2
            let idx = 0
            headingRefs.current.forEach((heading, i) => {
                if (heading && heading.getBoundingClientRect().top <= mid) idx = i
            })
            setCurrent(idx)
        }

        container.addEventListener('scroll', onScroll, {passive: true})
        return () => container.removeEventListener('scroll', onScroll)
    }, [])

    const goTo = useCallback((idx: number) => {
        const container = containerRef.current
        const section = sectionRefs.current[idx]
        if (!container || !section) return
        container.scrollTo({top: section.offsetTop, behavior: 'smooth'})
    }, [])

    return (
        <main className="about">
            <div ref={containerRef} className="about-scroll">
                {SECTIONS.map(({title, Content}, i) => (
                    <section
                        key={title}
                        ref={el => {if (el) sectionRefs.current[i] = el}}
                        className="about-section"
                    >
                        {i === 0 && <h1>About Me</h1>}
                        <h2 ref={el => {if (el) headingRefs.current[i] = el}}>{title}</h2>
                        <Content />
                    </section>
                ))}

                <SectionNav current={current} labels={SECTIONS.map(s => s.title)} onNavigate={goTo} />
            </div>
        </main>
    )
}
