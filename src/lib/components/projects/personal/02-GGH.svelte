<!-- Audio Visualizer -->
<script>
    import { r2 } from '$lib/r2';
</script>

<div class="project-container" id="ggh_cryptosystem">
    <img src={r2('assets/projects/personal/ggh.png')} class="project-img" alt="" />
    <div class="project-desc">
        <a href="https://github.com/ktm-p/ggh" target="_blank" class="project-title">GGH Cryptosystem <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>
        <div class="project-text">
            <p>
                This project is split into two parts: research and implementation. You can read more in my <a href="https://www.ktm-p.net/blog/GGH" target="_blank">blog post <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>.

                <br><br>
                
                For the research, it involved me writing a research paper which is available <a href="https://drive.google.com/file/d/1pTnVYoPMYXWOeRVCBZNntqGpCcJYawS5/view?usp=sharing" target="_blank">here <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>. The paper discusses the mathematic behind lattice-based encryption schemes - namely, the GGH Cryptosystem. It also further explored attacks and recent improvements on the scheme, along with a cryptanalysis of the scheme.

                <br><br>
            
                Afterwards, I implemented the original scheme outlined by Goldreich, Goldwasser, and Halevi in Python. In order to improve numerical stability, I also explored other libraries (such as <code>symPy</code>) in order to mitigate decryption errors. This allowed the implementation to handle higher dimensions, and thus work with longer messages.
            </p>
        </div>
        <div class="skills-container">
            <div class="skills">Python</div>
            <div class="skills">Cryptography</div>
        </div>
    </div>
</div>