import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa'
import './Landing.css'

const socials = [
    { icon: <FaGithub />, label: 'GitHub', href: 'https://github.com/ktm-p' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/ktm-p/' },
    { icon: <FaFileAlt />, label: 'Resume', href: '#' },
    { icon: <FaEnvelope />, label: 'Email', href: 'mailto:ktmichael.pham@gmail.com' },
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
                    I'm Michael, a Software Engineer at Epic Systems.
                    <br /><br />
                    Prior to starting my <ruby>jay-oh-bee<rt>(job)</rt></ruby>, I was a student at Berkeley, double majoring in Mathematics and Computer Science, and minoring in Data Science. I was also a member of the university's Upsilon Pi Epsilon chapter.
                    <br /><br />
                    My primary interests lie in Software Engineering, with an emphasis on backend development and
                    performance optimization. Aside from Software Engineering, I also enjoy dabbling in cryptography in my free time.
                    <br /><br />
                    Outside of programming, I'm passionate about teaching, having tutored extensively
                    in mathematics and computer science. For more details about my professional career, you can refer to my
                    {' '}<a href="#" className="inline-link">resume</a>.
                    <br /><br />
                    All of the work stuff aside, I'm an avid Gunpla lover, always finding myself working on a kit or two with my girlfriend over our breaks. Since starting work, I've also started picking up a few new hobbies such as cardistry and collecting CDs!
                    <br /><br />
                    If you want to learn more about what I like to do outside of work, feel free to check out my {' '}<a href="#" className="inline-link">about page</a>. Otherwise, you can browse some of my {' '}<a href="#" className="inline-link">past projects</a>, or you can also read my musings and ramblings over at my {' '}<a href="#" className="inline-link">blog</a>.
                </p>
            </div>
        </main>
    )
}
