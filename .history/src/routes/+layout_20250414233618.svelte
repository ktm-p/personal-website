<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Welcome to my personal website!">

    <!-- Tab Title -->
    <title>Home | ktm-p</title>
</head>

<script>
    import Header from "$lib/components/Header.svelte";
    import "$lib/styles/style.css";
</script>
<Header />

<main>
    <slot />
</main>