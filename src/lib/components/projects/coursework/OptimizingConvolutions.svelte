<!-- Optimizing Convolutions -->
<div class="project-container" id="convolutions">
    <enhanced:img src="$lib/assets/projects/coursework/convolutions_preview.png" class="project-img"></enhanced:img>
    <div class="project-desc">
        <a href="https://inst.eecs.berkeley.edu/~cs61c/fa23/projects/proj4/" target="_blank" class="project-title">Optimizing Convolutions <i class='fas fa-external-link-alt arrow'></i></a>
        <div class="project-text">
            <p>
                This project is focused on optimizations to better the runtime of a naive implementation of the 2D Convolution Algorithm.
                <br><br>
                In order to optimize the base algorithm, I applied different techniques such as working with pointers directly via pointer arithmetics, reorganizing the order in which the steps were executed to optimize cache usage, and using registers for commonly-used variables.
                <br><br>
                The project also used OpenMP to introduce parallel programming, significantly reducing the runtime even more. Also, by using SIMD instructions to vectorize operations, along with loop unrolling, the runtime was further reduced. Overall, the optimizations led to approximately a x50 speedup.
            </p>
        </div>
        <div class="skills-container">
            <div class="skills">C</div>
            <div class="skills">OpenMP</div>
            <div class="skills">OpenMPI</div>
            <div class="skills">SIMD</div>
        </div>
    </div>
</div>