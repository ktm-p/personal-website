<head>
    <!-- Meta Information -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Welcome to my personal website!">

    <!-- Ico Files -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v6.5.2/css/all.css">

    <!-- Tab Title -->
    <title>Home | ktm-p</title>
    <link rel="icon" type="image/x-icon" href="/img/ktmp-logo-white.ico">
</head>

<script>
    import Header from "$lib/components/Header.svelte";
    import "$lib/styles/style.css";
</script>
<Header />

<main>
    <slot />
</main>