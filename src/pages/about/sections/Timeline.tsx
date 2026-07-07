import { useState } from 'react'
import './Timeline.css'

export interface TimelineEvent {
    year: number
    title: string
    description: string
}

const EVENTS: TimelineEvent[] = [
    {
        year: 2003,
        title: "Hello World",
        description: "I was born in Ho Chi Minh City, Vietnam, and would spend the next fifteen years of my life there. Hopefully I find time to visit in the future; I wonder if that apartment project next to my childhood home is finally complete...",
    },
    {
        year: 2007,
        title: "The ABC International School",
        description: "I began attending the ABC International School at the age of four. This would be the school I'd attend for the rest of my time in Vietnam. My time here deeply influenced my trajectory in life, shaping both my interests and character. Though perhaps unfortunately, it also shaped my accent...",
    },
    {
        year: 2019,
        title: "Immigration",
        description: "In the middle of my freshman year of high school, my family and I immigrated to the United States. Needless to say, this was a pivotal moment in our lives: we left our belongings, our family, and our old life behind in order to start anew in foreign lands in hopes of a better future.",
    },
    {
        year: 2019,
        title: "River City High School",
        description: "I began attending River City High School, located in West Sacramento, California. Although my time in high school was mostly forgettable, it was here where the best and most important event of my life occurred: meeting my girlfriend.",
    },
    {
        year: 2020,
        title: "Volunteer Tutoring",
        description: "In my sophomore year of high school, I began volunteering at my high school's afterschool tutoring program. Here, I aided students from a variety of backgrounds in mathematics, ranging from Math 1 all the way to AP Calculus BC.",
    },
    {
        year: 2022,
        title: "Teaching Assistant",
        description: "In my senior year of high school, I was a teaching assistant for my high school's AP Calculus BC class. As part of my duties, I helped create and grade homework assignments, along with giving individual help to students.",
    },
    {
        year: 2022,
        title: "Berkeley",
        description: "After high school, I attended Berkeley. Here, I studied Mathematics, Computer Science, and Data Science. I thoroughly enjoyed my time in college, having made great friends, took very challenging but rewarding courses, and grew significantly as a person.",
    },
    {
        year: 2024,
        title: "Private Tutoring",
        description: "During my summer breaks, I was a private tutor, working with both high school and college students. I tutored in mathematics, with a focus on Calculus. As a tutor, I provided lectures on the course material, helped students work through assignments, and created personalised lesson materials to reinforce understanding.",
    },
    {
        year: 2026,
        title: "Epic Systems",
        description: "After graduating from Berkeley, I am now working as a Software Engineer at Epic Systems. Moving to an entirely different state, living alone, working a full-time job - it's a massive change in my life, but I'm excited to see how this new chapter unfolds!",
    }
]

const VISIBLE = 2

export default function TimelineContent() {
    const [index, setIndex] = useState(0)

    const atStart = index === 0
    const atEnd = index >= EVENTS.length - VISIBLE

    const trackWidth = EVENTS.length * (100 / VISIBLE)
    const eventWidth = 100 / EVENTS.length
    const translateX = -(index * eventWidth)

    const fadeClass = !atEnd ? 'fade-right' : ''

    return (
        <div className="timeline">
            <div className="timeline-nav">
                <button className="timeline-arrow" onClick={() => setIndex(i => i - 1)} disabled={atStart} aria-label="Previous Event">&#8249;</button>
            </div>

            <div className={`timeline-viewport ${fadeClass}`}>
                <div className="timeline-track" style={{width: `${trackWidth}%`, transform: `translateX(${translateX}%)`,}}>
                    {EVENTS.map((event, i) => (
                        <div key={i} className="timeline-event" style={{ width: `${eventWidth}%` }}>
                            <div className="timeline-event-top">
                                <span className="timeline-year">{event.year}</span>
                            </div>

                            <div className="timeline-marker-row">
                                <div className="timeline-marker" />
                                <div className="timeline-line" />
                            </div>

                            <div className="timeline-event-bottom">
                                <strong className="timeline-title">{event.title}</strong>
                                <p className="timeline-description">{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="timeline-nav">
                <button className="timeline-arrow" onClick={() => setIndex(i => i + 1)} disabled={atEnd} aria-label="Next Event">&#8250;</button>
            </div>
        </div>
    )
}
