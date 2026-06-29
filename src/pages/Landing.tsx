import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import './Landing.css'

const socials = [
    { icon: <FaGithub />, label: 'GitHub', href: '#' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
    { icon: <FaFileAlt />, label: 'Resume', href: '#' },
    { icon: <FaEnvelope />, label: 'Email', href: '#' },
]

export default function Landing() {
    return (
        <main className="landing">
            <div className="landing-left">
                <img src="https://assets.ktm-p.net/assets/raven/pfp.jpeg" alt="Michael Pham" className="landing-photo" />
                <h1>Michael Pham</h1>
                <h2>Software Engineer @ Epic</h2>
                <div className="landing-socials">
                    {socials.map(({ icon, label, href }) => (
                        <a key={label} href={href} aria-label={label} className="social-link">
                            {icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="landing-right">
                <p>
                    I'm Michael, a Software Engineer currently at Epic Systems.
                    <br /><br />
                    Before my jay-oh-bee, I was a student at Berkeley, double majoring in Mathematics and Computer Science. I also minored in Data Science, and was part of the university's Upsilon Pi Epsilon chapter.
                    <br /><br />
                    My primary interests lie in Software Engineering, with an emphasis on backend development and
                    performance optimization. Aside from Software Engineering, I also enjoy dabbling in cryptography in my free time.
                    <br /><br />
                    Outside of programming, I'm passionate about teaching, having tutored extensively
                    in mathematics and computer science. You can find out more about my professional career via my
                    {' '}<a href="#" className="inline-link">resume</a>.
                    <br /><br />
                    All of the boring work stuff aside, I'm an avid Gunpla lover, always finding myself working on a kit or two with my girlfriend over break. Since starting work, I've also started picking up a few new hobbies such as: cardistry, photography, and CD collecting!
                    <br /><br />
                    You can learn more about my hobbies and what I spend my time doing outside of work {' '}<a href="#" className="inline-link">here</a>.
                </p>
            </div>
        </main>
    )
}
