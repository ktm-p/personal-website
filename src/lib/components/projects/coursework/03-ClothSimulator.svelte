<!-- Optimizing Convolutions -->
<script>
    import { r2 } from '$lib/r2';
</script>

<div class="project-container" id="cloth_sim">
    <img src={r2('assets/projects/coursework/clothsim.png')} class="project-img" alt="" />
    <div class="project-desc">
        <a href="https://github.com/ktm-p/Cloth-Simulator" target="_blank" class="project-title">Real-time Cloth Simulator <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>
        <div class="project-text">
            <p>
                In this project, I built a real-time cloth simulator using a spring-mass based system in C++. The simulator features accurate collision interactions, a variety of shaders, and also realistic ambient wind interactions. More about this project can be read <a href="https://www.ktm-p.net/blog/ClothSim" target="_blank" class="project-title">here <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>.

                <br><br>

                Simulation is done via Verlet integration, allowing for both fast and reasonably realistic results. In order to speed up collision calculations, spatial hashing was utilized, reducing runtime from quadratic down to roughly linear time, allowing for a user-friendly, real-time simulator. Time-varying winds were also implemented, using trigonometric functions to model their path, and basic physics to calculate their effect on the cloth.

                <br><br>

                The project also used GLSL to implement a variety of shaders: Blinn-Phong shading, Texture Mapping, Bump and Displacement mapping, Environment-mapped Reflections, and also a custom custom emulating comic books.
            </p>
        </div>
        <div class="skills-container">
            <div class="skills">C++</div>
            <div class="skills">GLSL</div>
        </div>
    </div>
</div>