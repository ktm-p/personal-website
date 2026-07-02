import "./About.css"

export default function About() {
    return(
        <main className="about">
            <h1>About Me</h1>
            <h2>Background</h2>
            <div className="background">
                <div className="background-left">
                    <p>
                        Hi, my name's Michael.
                        
                        <br /><br />
                        
                        I was born in Vietnam, living in Ho Chi Minh City for the first fifteen years of my life. Having attended an international school, I grew up learning both Vietnamese and English (with bits of Britishness slipping in here and there).
                        
                        <br /><br />
                        In 2019, I immigrated to the United States, ultimately settling down in West Sacramento with my family and attending high school there. While in high school, I met my now-girlfriend of seven years.
                        
                        <br /><br />
                        
                        After high school, I moved to Berkeley for college. At Berkeley, I pursued a double major in Mathematics and Computer Science, alongside a minor in Data Science. In retrospect, my mental health probably did not appreciate this decision.

                        <br /><br />

                        Now, with my job as a Software Engineer at Epic Systems, I find myself moving all the way to Wisconsin. Definitely a massive change in weather from the hellish humidity of Vietnam and the searing heat of Sacramento.

                        <br /><br />

                        Anyways, to the right, you can see all the countries and states I've been to. Right now, most of the map is blank, but hopefully things will change soon... <span style={{fontSize: "0.25rem"}}>hopefully...</span>
                    </p>
                </div>
                <div className="background-right">
                    Placeholder.
                </div>
            </div>
        </main>
    )
}