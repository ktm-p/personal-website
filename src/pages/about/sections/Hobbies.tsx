import './Hobbies.css'

export default function HobbiesContent() {
    return (
        <div className='hobbies'>
            <div className='hobbies-left'>
                <p>
                    Believe it or not, I actually have a life outside of work (shocker, I know). Though my hobbies have changed quite a lot over the years, I've compiled a list of things that I'm currently interested in below:

                    <br />

                    <ul>
                        <li>Cards</li>
                        <li>CDs</li>
                        <li>Gunpla</li>
                        <li>Gaming</li>
                        <li>Piano</li>
                    </ul>

                    <br />
                    
                    Typically, if I'm not working on a side-project in my free time, chances are I'll be gaming or working on a Gunpla kit with my girlfriend.

                    <br /><br />

                    Otherwise, I enjoy playing piano, though I've been slacking lately. Very infrequently, I might also publish an arrangement/transcription of whatever song's currently stuck in my head.

                    <br /><br />

                    The latest hobby I've gotten into is collecting physical media. More specifically, my girlfriend and I have been collecting playing cards and CDs. Whenever we're out on dates, we often find ourselves scouring for new additions to our collection.
                </p>
            </div>
            <div className='hobbies-right'>
                <img src="https://assets.ktm-p.net/assets/about/cards.jpg" alt='Card Collection (7/5/2026)' className='hobbies-image'/>
                <img src="https://assets.ktm-p.net/assets/about/cds.jpg" alt='Card Collection (7/5/2026)' className='hobbies-image'/>
                {/* <div className='rectangles'>
                    <div className='rectangle' style={{width: "60%"}} />
                    <div className='rectangle' style={{width: "30%"}} />
                    <div className='rectangle' style={{width: "10%"}} />
                </div> */}
            </div>
        </div>
    )
}