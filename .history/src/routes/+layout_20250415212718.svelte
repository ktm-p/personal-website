<script>
    import Head from "$lib/components/Head.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import "$lib/styles/style.css";

    // Navbar resizing
    import { onMount } from "svelte";
    onMount(() => {
        const navbar = document.querySelector("nav")
        const watcher = document.createElement("div");

        watcher.setAttribute("data-watcher", "");
        watcher.setAttribute("style", "margin: 0;")
        navbar.before(watcher);

        const navObserver = new IntersectionObserver((entries) => {navbar.classList.toggle("sticking", !entries[0].isIntersecting)});
        navObserver.observe(watcher);


        document.querySelector('.current').addEventListener('click', (event) => {
            event.preventDefault();
            window.scroll({top: 0, behavior: 'smooth'});
        });
    });

    // Dynamic title changing
    import { page } from "$app/stores";

    const appName = "ktm-p";
    const segments = $page.url.pathname.split("/").slice(1, 2).filter(Boolean);
    const capitalizedSegments = segments.length ? segments.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    : ["Home"];
    $: title = [...capitalizedSegments, appName].join(" | ");
    </script>

<Head />
<svelte:head>
    <title>{title}</title>
</svelte:head>
<Nav />

<main>
    <slot />
</main>