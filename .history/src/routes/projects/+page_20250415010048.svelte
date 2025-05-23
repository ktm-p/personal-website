<section class="personal-project">
    <h1 class="section-head">Personal Projects</h1>
    <!-- Pytris -->
    <div class="project-container" id="pytris">
        <enhanced:img src="$lib/assets/projects/personal/pytris_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://github.com/ktm-p/tetris_clone" target="_blank" class="project-title">Pytris <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    Pytris is a Tetris clone implemented in Python, made using the pygame library. The user is able to move and rotate the tetrominoes following the standard Tetris Super Rotation System. Users are also able to hold blocks. A block silhouette feature is implemented as well, along with a preview of the next couple of blocks.

                    <br><br>

                    The project features an understanding of object-oriented programming in order to implement multiple classes (for the game, board, tetrominoes, etc.).
                </p>
            </div>

            <div class="skills-container">
                <div class="skills">Python</div>
            </div>
        </div>
    </div>

    <!-- Audio Analyzer -->
    <div class="project-container" id="audio_analyzer">
        <img src="img/audio_analyzer.png" class="project-img">
        <div class="project-desc">
            <a href="https://github.com/ktm-p/audio_analyzer" target="_blank" class="project-title">Audio Analyzer <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    This is an Audio Analyzer program I wrote using Processing. It features the ability for the user to play a desired mp3 audio file and see graphical representations of certain information on the file. This includes the Audio Waveform and its Polar Graph representation, the Discrete Fourier Transform of the audio, the audio's level, and also its beat.
                    
                    <br><br>
                        
                    For the project, I coded a real Discrete Fourier Transform algorithm, along with creating all of the graphs. The beat detection was implemented by comparing the current audio's level to previous ones and, if the difference is marginal, a beat is detected.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Java</div>
                <div class="skills">Processing</div>
            </div>
        </div>
    </div>

    <!-- Audio Visualizer -->
    <div class="project-container" id="audio_visualizer">
        <img src="img/audio_visualizer.png" class="project-img">
        <div class="project-desc">
            <a href="https://github.com/ktm-p/audio_visualizer" target="_blank" class="project-title">Audio Visualizer <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    After creating the Audio Analyzer and familiarizing myself with Processing, I decided to create my own Audio Visualizer. The project features usage of the Fast Fourier Transform to convert the audio into frequency-domain information, along with implementing a 3D Terrain generation system with Perlin Noise.
                
                    <br><br>
                
                    Using FFT, I created graphics that were responsive to the audio being played: on the top of the screen are lines that represent the amplitudes of certain frequencies. Furthermore, 3D objects were rendered and the speed at which it moved and rotated depends on the frequencies playing. Additionally, a polar graph is constructed whose edges fluctuates depending on the audio. Finally, at the bottom of the screen is a 3D Terrain made using Perlin Noise. The speed at which the user traverses the terrain is influenced by the audio as well.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Java</div>
                <div class="skills">Processing</div>
            </div>
        </div>
    </div>

    <!-- LaTeX Setup -->
    <div class="project-container" id="texsetup">
        <img src="img/texsetup_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://github.com/ktm-p/LaTeX-Setup" target="_blank" class="project-title">LaTeX Setup <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    This is a repo of my LaTeX setup. It includes .sty files for both my homework and course note templates. The templates feature a wide range of custom environments made using tcolorbox and thmtools, along with environments which takes in optional parameters implemented with xparse. Furthermore, the templates contains a table of content command that allows users to easily navigate between different sections.
                
                    <br><br>
                
                    The repo also contains a plethora of macros for maths and computer science, making TeXing faster and more efficient. 
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">LaTeX</div>
            </div>
        </div>
    </div>
</section>

<section class="coursework">
    <h1 class="section-head">Coursework</h1>
    <!-- Build Your Own World -->
    <div class="project-container" id="byow" style="margin-top: 0.5rem;">
        <img src="img/byow_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://sp23.datastructur.es/materials/proj/proj3/" target="_blank" class="project-title">Build Your Own World <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    Build Your Own World (BYOW) is a 2D game where the user tries to collect a key and escape from the maze.
                    <br><br>
                    The game features a pseudo-random world generation system made using Prim's Algorithm. It also has a playable, customizable character, a lighting system made with Breadth-First Search (BFS), limited vision that prevents the user from seeing past walls, and enemies with pathfinding AI implemented using A*-search. Furthermore, there is a save feature, allowing players to save and reload their progress.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Java</div>
            </div>
        </div>
    </div>

    <!-- Optimizing Convolutions -->
    <div class="project-container" id="convolutions">
        <img src="img/convolutions_preview.png" class="project-img">
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

    <!-- A Secure File Sharing System -->
    <div class="project-container" id="secureshare">
        <img src="img/secureshare_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://sp24.cs161.org/proj2/" target="_blank" class="project-title">A Secure File Sharing System <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    In this project, I designed a secure file sharing system which used cryptographic library functions, and then implemented it in Golang.
                    <br><br>
                    As part of the design process, I had to figure out how to implement the sharing system. Then, I had to determine possible vulnerabilities that adversaries can exploit to execute malicious actions. Furthermore, I had to ensure that my code had the functionalities required of a file sharing system. This was accomplished through over three thousand lines of testing code, including fuzz testing as well to handle possible edge cases I may have missed.
                    <br><br>                        
                    In order to ensure the integrity, authenticity, and confidentiality of user data, I used symmetric encryption, HMACs, and digital signatures.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Golang</div>
            </div>
        </div>
    </div>

    <!-- Machine Learning -->
    <div class="project-container" id="ml">
        <img src="img/ml_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://inst.eecs.berkeley.edu/~cs188/sp24/projects/proj5/" target="_blank" class="project-title">Machine Learning <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    Over the course of this project, I learned to use PyTorch on a variety of machine learning problems, ranging from approximating a sinusoidal curve to digit recognition and language detection.
                    <br><br>
                    For recognizing digits, I initially implemented a two-layer Linear Neural Network with a ReLU activation function and Cross-Entropy loss. Later on, I implemented a Convolutional Layer as well to take into account things such as spatial features of the image, and then flattened it down. Ultimately, my model achieved an accuracy of over 98%.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Python</div>
                <div class="skills">PyTorch</div>
            </div>
        </div>
    </div>

    <!-- Reinforcement Learning -->
    <div class="project-container" id="rl">
        <img src="img/rl_preview.png" class="project-img">
        <div class="project-desc">
            <a href="https://inst.eecs.berkeley.edu/~cs188/sp24/projects/proj6/" target="_blank" class="project-title">Reinforcement Learning <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    In this project, I trained Pac-Man using Reinforcement Learning so that he can win. In order to do this, I implemented value iteration, Q-Learning, Approximate Q-Learning, and Deep Q-Learning with PyTorch. I also coded up the Epsilon-Greedy action selection for Pac-Man's policy.
                    <br><br>
                    For Deep Q-Learning, I implemented it using a five-layer Linear Neural Network which uses the ReLU activation function and Mean Square Error loss. Through this, I achieved over an approximately 90% winrate with my Pac-Man agent.
                    <br><br>
                    Through this project, I gained a deeper understanding of PyTorch, along with how to finetune hyperparameters such as the learning rate, batch and hidden layer sizes, and the number of training episodes.
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Python</div>
                <div class="skills">PyTorch</div>
            </div>
        </div>
    </div>

    <!-- Spam Classifier -->
    <div class="project-container" id="spamclass">
        <img src="img/spamclass_preview.png" class="project-img">
        <div class="project-desc">
            <a class="project-title" style="cursor: pointer;">Spam Classifier <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    The goal of this project was to implement a filter that detected whether or not an email was classified as spam or ham using a Logistic Regression model.
                    
                    <br><br>
                    
                    For the project, I had to clean up the dataset and filter out all of the noisy data, analyze the relationship between possible features and their class in order to determine the features to be used, and also extract key information from emails.
                    
                    <br><br>
                    
                    Finally, in order to finetune the hyperparameters of my model, I used GridSearchCV. Ultimately, I created a model that yielded an accuracy of around 99.2% on the testing data provided. 
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">Python</div>
                <div class="skills">Matplotlib</div>
                <div class="skills">NumPy</div>
                <div class="skills">Pandas</div>
                <div class="skills">RegEx</div>
                <div class="skills">scikit-learn</div>
                <div class="skills">Seaborn</div>
            </div>
        </div>
    </div>

    <!-- Double Pendulum System -->
    <div class="project-container" id="doublependulum">
        <img src="img/doublependulum_preview.png" class="project-img">
        <div class="project-desc">
            <a class="project-title" style="cursor: pointer;"> Solving a Double Pendulum System <i class='fas fa-external-link-alt arrow'></i></a>
            <div class="project-text">
                <p>
                    The goal of this project was to using numerical methods to solve a double pendulum system in MATLAB.
                    
                    <br><br>
                    
                    For the project, I set up the system of equation needed and used Newton's Method in order to find an expression for the root of the function. Then, after implementing a Backwards Euler method, I solved the system using both Backwards Euler and RK4 and compared the results.
                    
                    <br><br>
                    
                    Finally, I also explored some properties and results, such as approximating the number of iterations needed to solve the equation, and analyzing the stability of Backwards Euler. 
                </p>
            </div>
            <div class="skills-container">
                <div class="skills">MATLAB</div>
            </div>
        </div>
    </div>
</section>