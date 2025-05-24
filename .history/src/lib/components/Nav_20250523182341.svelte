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
        <img class="cs-sun" src="https://csimg.nyc3.digitaloceanspaces.com/Contact-Page/sun.svg" decoding="async" width="20rem" height="20rem">
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <!-- svelte-ignore a11y_invalid_attribute -->
    <div class={`nav-dropdown ${showMenu ? 'show' : ''}`}>
        <a href="javascript:void(0);" on:click={() => showMenu = !showMenu}>
            <i class="fa fa-bars"></i>
        </a>
    </div>
</nav>