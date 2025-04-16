<script>
    import Head from "$lib/components/Head.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import "$lib/styles/style.css";

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
</script>

<Head />
<Nav />

<main>
    <slot />
</main>