<script>
    import Head from "$lib/components/Head.svelte";
    import Nav from "$lib/components/Nav.svelte";
    import "$lib/styles/style.css";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    // Dynamic title changing
    const websiteName = "ktm-p";
    $: directory = $page.url.pathname.split("/").slice(1, 2).filter(Boolean);
    $: tabName = directory.length ? directory.map(str => str.charAt(0).toUpperCase() + str.slice(1))
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