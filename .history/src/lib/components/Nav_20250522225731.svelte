<script>
    let showMenu = false;    
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<nav style="position: sticky; top: 0px;" id="nav-bar">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/"><enhanced:img src="$lib/assets/raven/ktmp-logo-white-centred-text-spaced.png" class="nav-logo"></enhanced:img></a>
    <div class={`nav-links ${showMenu ? 'show' : ''}`}>
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/courses">Courses</a>
        <a class="nav-link" href="/projects">Projects</a>
        <a class="nav-link" href="/blog">Blog</a>
        
    </div>
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <!-- svelte-ignore a11y_invalid_attribute -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="nav-dropdown" on:click={() => showMenu = !showMenu}>
        <i class="fa fa-bars"></i>
    </div>
</nav>