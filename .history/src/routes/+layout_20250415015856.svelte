<script>
    import Head from "$lib/components/Head.svelte";
    import Header from "$lib/components/Header.svelte";
    import script from "$lib/script.js";
    import "$lib/styles/style.css";
</script>
<Head />
<Header />

<main>
    <slot />
</main>