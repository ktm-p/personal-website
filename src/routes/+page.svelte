<script>
    import { r2 } from '$lib/r2';
</script>

<section class="about-me">
    <h1 class="section-head">About Me</h1>
    <div class="about-me-flex">
        <div class="about-me-text">
            <p>I'm Michael, a Senior at UC Berkeley and a member of its UPE chapter. I am pursuing a double major in <span class="emph">Maths</span> and <span class="emph">Computer Science</span>, and minoring in <span class="emph">Data Science</span>.
            
            <br><br>

            My primary interests lie in <span class="emph">backend software engineering</span> and <span class="emph">data-driven systems</span>, with a focus on performance optimization. I also have a strong foundation in <span class="emph">algorithms</span> and an interest in <span class="emph">cryptography</span>.

            <br><br>

            Outside of programming, I'm passionate about <span class="emph">teaching</span>, having tutored extensively in mathematics and computer science. My resume can be found <a href="/resume/default/resume.pdf" target="_blank">here <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>.
            
            <br><br>

            In my free time, I <a href="https://musescore.com/user/32734170" target="_blank">transcribe songs <sup><i class='fas fa-external-link-alt arrow'></i></sup></a> that are stuck in my head. I'm also an avid fan of Gunpla, often finding myself working on a kit or two with my girlfriend in our free time.
        </p>
        </div>
        <div>
            <img src={r2('assets/raven/pfp.jpeg')} id="profile-image" alt="Profile Picture" />
        </div>
    </div>
</section>

<section class="professional-links">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="https://github.com/ktm-p" target="_blank">
        <i class="fa fa-brands fa-github" id="github"></i>                
    </a>

    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="https://www.linkedin.com/in/michael-pham-a88a17303/" target="_blank">
        <i class="fa-brands fa-linkedin-in" id="linked-in"></i>
    </a>

    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/resume/default/resume.pdf" target="_blank">
        <i class="fa-regular fa-file" id="resume"></i>
    </a>

    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="mailto:ktmpham@berkeley.edu" target="_blank">
        <i class="fa-regular fa-envelope" id="email"></i>
    </a>
</section>

<br><br>