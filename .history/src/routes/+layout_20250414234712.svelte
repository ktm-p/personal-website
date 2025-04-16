<script>
    import Head from "$lib/components/Head.svelte";
    import Header from "$lib/components/Header.svelte";
    import "$lib/styles/style.css";
</script>
<Header />

<main>
    <slot />
</main>