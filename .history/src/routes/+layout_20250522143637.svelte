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
    });

    // Current Navigation Link
    onMount(() => {
        const currentUrl = window.location.pathname;
        const navLinks = document.querySelectorAll("nav-link");

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentUrl) {
                link.classList.add("current");
            } else {
                link.classList.remove("current");
            }
        });
    });

    // Resized Window
    function responsiveWindow() {
        var navbar = document.getElementById("nav-bar");
        if (navbar.className === "nav") {
            navbar.className += " responsive";
        } else {
            navbar.className = "nav";
        }
    }    

    // Dynamic title changing
    import { page } from "$app/stores";

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