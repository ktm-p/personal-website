<!-- Audio Visualizer -->
<script>
    import { r2 } from '$lib/r2';
</script>

<div class="project-container" id="audio_visualizer">
    <img src={r2('assets/projects/personal/audio_visualizer.png')} class="project-img" alt="" />
    <div class="project-desc">
        <a href="https://github.com/ktm-p/audio_visualizer" target="_blank" class="project-title">Audio Visualizer <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>
        <div class="project-text">
            <p>
                The Audio Visualizer uses the FFT algorithm to convert audio into frequency-domain information, which is then used to generate dynamic graphics visualizing the audio played.
            
                <br><br>
            
                Using FFT data, we created 3D objects that generate, move, and change colors in response to the audio's frequencies. Additionally, we implemented a fluctuating polar graph, where each point corresponds to a frequency value to create a tunnel effect. Lastly, we created an audio-responsive 3D terrain using Perlin Noise. A demo is available <a href="https://youtu.be/7KIApzMEXdQ">here <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>.
            </p>
        </div>
        <div class="skills-container">
            <div class="skills">Java</div>
            <div class="skills">Processing</div>
        </div>
    </div>
</div>