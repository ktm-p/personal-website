<script>
    import Head from "$lib/components/Head.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import "$lib/styles/style.css";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    // Navbar resizing
    onMount(() => {
        const navbar = document.querySelector("nav")
        const watcher = document.createElement("div");

        watcher.setAttribute("data-watcher", "");
        watcher.setAttribute("style", "margin: 0;")
        navbar.before(watcher);

        const navObserver = new IntersectionObserver((entries) => {navbar.classList.toggle("sticking", !entries[0].isIntersecting)});
        navObserver.observe(watcher);
    });

    onMount(() => {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('nav a');

        links.forEach(link => {
            // Normalize both paths to avoid trailing slash mismatches
            const linkPath = new URL(link.href).pathname
            const pathToMatch = currentPath

            if (linkPath === pathToMatch) {
                link.classList.add('current');
            } else {
                link.classList.remove('current');
            }
        });
    });

    // Dynamic title changing
    const websiteName = "ktm-p";
    const directory = $page.url.pathname.split("/").slice(1, 2).filter(Boolean);
    const tabName = directory.length ? directory.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    : ["Home"];
    $: title = [...tabName, websiteName].join(" | ");
</script>

<Head />
<svelte:head>
    <title>{title}</title>
</svelte:head>
<Nav />

<main>
    <slot />
</main>