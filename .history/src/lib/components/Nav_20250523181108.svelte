<script>
    import { slide } from 'svelte/transition';
    let showMenu = false;    
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
	$: currentPath = $page.url.pathname;

    onMount(() => {
        var body = window.document.body;
        var darkmode_toggle = window.document.getElementById("darkmode_toggle");

        function enableDarkMode() {
            document.body.classList.add("darkMode");
            localStorage.setItem("theme", "dark");
            darkmode_toggle.checked = true;
        }

        function disableDarkMode() {
            document.body.classList.remove("darkMode");
            localStorage.setItem("theme", "light");
            darkmode_toggle.checked = false;
        }

        function detectTheme() {
            let theme = "light";

            if (localStorage.getItem("theme")) {
                theme = localStorage.getItem("theme");
            }

            else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = "dark";
            }

            // if there is no preference set, the default of light will be used. apply accordingly
            theme === "dark" ? enableDarkMode() : disableDarkMode();
        }
        
        detectTheme();

        darkmode_toggle.addEventListener("click", () => {
            localStorage.getItem("theme") === "light" ? enableDarkMode() : disableDarkMode();
        });
    });
</script>

<nav style="position: sticky; top: 0px;" id="nav-bar">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/"><enhanced:img src="$lib/assets/raven/ktmp-logo-white-centred-text-spaced.png" class="nav-logo"></enhanced:img></a>
    <div class={`nav-links ${showMenu ? 'show' : ''}`}>
        <a class={`nav-link ${currentPath === '/' ? 'current' : ''}`} href="/">Home</a>
        <a class={`nav-link ${currentPath === '/courses' ? 'current' : ''}`} href="/courses">Courses</a>
        <a class={`nav-link ${currentPath === '/projects' ? 'current' : ''}`} href="/projects">Projects</a>
        <a class={`nav-link ${currentPath.startsWith('/blog') ? 'current' : ''}`} href="/blog">Blog</a>
    </div>
    <div class="darkmode_toggle" style="margin-left: -80rem;">
        <svg class="cs-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 480" style="enable-background:new 0 0 480 480" xml:space="preserve"><path d="M459.782 347.328c-4.288-5.28-11.488-7.232-17.824-4.96-17.76 6.368-37.024 9.632-57.312 9.632-97.056 0-176-78.976-176-176 0-58.4 28.832-112.768 77.12-145.472 5.472-3.712 8.096-10.4 6.624-16.832S285.638 2.4 279.078 1.44C271.59.352 264.134 0 256.646 0c-132.352 0-240 107.648-240 240s107.648 240 240 240c84 0 160.416-42.688 204.352-114.176 3.552-5.792 3.04-13.184-1.216-18.496z"/></svg>
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <!-- svelte-ignore a11y_invalid_attribute -->
    <div class={`nav-dropdown ${showMenu ? 'show' : ''}`}>
        <a href="javascript:void(0);" on:click={() => showMenu = !showMenu}>
            <i class="fa fa-bars"></i>
        </a>
    </div>
</nav>