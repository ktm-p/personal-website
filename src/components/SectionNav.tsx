import { createPortal } from 'react-dom'
import './SectionNav.css'

interface SectionNavProps {
    current: number
    labels: string[]
    onNavigate: (idx: number) => void
}

export default function SectionNav({ current, labels, onNavigate }: SectionNavProps) {
    return createPortal(
        <nav className="section-nav">
            <button
                className="section-nav-arrow"
                onClick={() => onNavigate(current - 1)}
                disabled={current === 0}
                aria-label="Previous section"
            >
                ⌃
            </button>

            <div className="section-nav-dots">
                {labels.map((label, i) => (
                    <button
                        key={label}
                        className={`section-nav-dot${i === current ? ' active' : ''}`}
                        onClick={() => onNavigate(i)}
                        aria-label={label}
                    />
                ))}
            </div>
            
            <button
                className="section-nav-arrow"
                onClick={() => onNavigate(current + 1)}
                disabled={current === labels.length - 1}
                aria-label="Next section"
            >
                ⌄
            </button>
        </nav>,
        document.body
    )
}
