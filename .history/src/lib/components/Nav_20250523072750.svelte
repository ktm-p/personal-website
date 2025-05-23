<script>
    import { slide } from 'svelte/transition';
    let showMenu = false;    
    import { page } from '$app/stores';
	$: currentPath = $page.url.pathname;
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
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <!-- svelte-ignore a11y_invalid_attribute -->
    <div class={`nav-dropdown ${showMenu ? 'show' : ''}`}>
        <a href="javascript:void(0);" on:click={() => showMenu = !showMenu}>
            <i class="fa fa-bars"></i>
        </a>
    </div>
</nav>