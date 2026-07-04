import { useState, useEffect, useRef, useCallback } from 'react'
import Globe from '../components/Globe'
import SectionNav from '../components/SectionNav'
import './About.css'

const SECTIONS = ['Background', 'Why CS?', 'Experience', 'Hobbies']

export default function About() {
    const [current, setCurrent] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const sectionRefs = useRef<HTMLElement[]>([])

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const idx = sectionRefs.current.indexOf(entry.target as HTMLElement)
                        if (idx !== -1) setCurrent(idx)
                    }
                }
            },
            { root: container, threshold: 0.5 }
        )

        sectionRefs.current.forEach(s => { if (s) observer.observe(s) })
        return () => observer.disconnect()
    }, [])

    const goTo = useCallback((idx: number) => {
        const container = containerRef.current
        if (!container) return
        container.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })
    }, [])

    return (
        <main className="about">
            <div ref={containerRef} className="about-scroll">

                {/* Background */}
                <section ref={el => { if (el) sectionRefs.current[0] = el }} className="about-section">
                    <h1>About Me</h1>
                    <h2>Background</h2>
                    <div className="background">
                        <div className="background-left">
                            <p>
                                Hi, my name's Michael.

                                <br /><br />

                                I was born in Vietnam, living in Ho Chi Minh City for the first fifteen years of my life. I am bilingual, being fluent in both English and Vietnamese. I also studied French, though my fluency in it has degraded dramatically.

                                <br /><br />

                                In 2019, I immigrated to the United States, ultimately settling down in West Sacramento with my family and attending high school there. While in high school, I met the love of my life <span style={{fontSize: "0.75rem"}}>(shout-out to my girlfriend: she helped design this website!)</span>.

                                <br /><br />

                                After high school, I moved to Berkeley for college. At Berkeley, I pursued a double major in Mathematics and Computer Science, alongside a minor in Data Science. In retrospect, my mental health probably did not appreciate this decision.

                                <br /><br />

                                Now, with my job as a Software Engineer at Epic Systems, I find myself moving all the way to Madison, Wisconsin. Definitely a massive change in both location and weather, but I'm looking forward to whatever the city's got in store for me!

                                <br /><br />

                                Anyways, to the right, you can see all of the countries and U.S. states that I've been to. Right now, it's pretty empty, but hopefully things will change soon... <span style={{fontSize: "0.25rem"}}>hopefully...</span>
                            </p>
                        </div>
                        <div className="background-right">
                            <div className="globe-card">
                                <Globe size={420} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why CS */}
                <section ref={el => { if (el) sectionRefs.current[1] = el }} className="about-section">
                    <h2>Why?</h2>
                    <p>Placeholder.</p>
                </section>

                {/* Experience */}
                <section ref={el => { if (el) sectionRefs.current[2] = el }} className="about-section">
                    <h2>Experience</h2>
                    <p>Placeholder.</p>
                </section>

                {/* Hobbies */}
                <section ref={el => { if (el) sectionRefs.current[3] = el }} className="about-section">
                    <h2>Hobbies</h2>
                    <p>Placeholder.</p>
                </section>

                <SectionNav current={current} labels={SECTIONS} onNavigate={goTo} />

            </div>
        </main>
    )
}
