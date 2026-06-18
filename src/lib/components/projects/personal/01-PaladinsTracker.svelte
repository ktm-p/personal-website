<!-- Audio Visualizer -->
<script>
    import { r2 } from '$lib/r2';
</script>

<div class="project-container" id="paladins_tracker">
    <img src={r2('assets/projects/personal/paladins_tracker.png')} class="project-img" alt="" />
    <div class="project-desc">
        <a href="https://github.com/ktm-p/Paladins-Tracker" target="_blank" class="project-title">PaladinsTracker <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>
        <div class="project-text">
            <p>
                PaladinsTracker is a Discord bot, utilizing the Hi-Rez API and MongoDB to fetch live player statistics. You can read more about it <a href="https://www.ktm-p.net/blog/Paladins">here <sup><i class='fas fa-external-link-alt arrow'></i></sup></a>.
                
                <br><br>

                Unlike other bots, PaladinsTracker can not only display users' statistics, but also track changes in them. It also is capable of reconstructing malformed matches, and stores extra information such as a user's Platform ID. 
            
                <br><br>
            
                Additionally, to improve user experience, I optimized the bot's performance by using asynchronous operations, caching, and enhanced database queries, resulting in a speedup of over 5x.
            </p>
        </div>
        <div class="skills-container">
            <div class="skills">Python</div>
            <div class="skills">APIs</div>
            <div class="skills">MongoDB</div>
        </div>
    </div>
</div>