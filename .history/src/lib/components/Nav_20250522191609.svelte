<nav style="position: sticky; top: 0px;" id="nav-bar">
    <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href="/"><enhanced:img src="$lib/assets/raven/ktmp-logo-white-centred-text-spaced.png" class="nav-logo"></enhanced:img></a>
    <div class="nav-links">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/courses">Courses</a>
        <a class="nav-link" href="/projects">Projects</a>
        <a class="nav-link" href="/blog">Blog</a>
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <!-- svelte-ignore a11y_invalid_attribute -->
        <a href="javascript:void(0);" class="menu" on:click={responsiveWindow()}>
            <i class="fa fa-bars"></i>
        </a>
    </div>
</nav>