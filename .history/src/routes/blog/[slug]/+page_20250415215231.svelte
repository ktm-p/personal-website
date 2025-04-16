<script>
	export let data;
    import '$lib/styles/prism-darcula.css';

    import { page } from "$app/stores";

    const websiteName = ["ktm-p", data.title].join(" - ");
    const directory = $page.url.pathname.split("/").slice(1, 2).filter(Boolean);
    const tabName = directory.length ? directory.map(str => str.charAt(0).toUpperCase() + str.slice(1))
    : ["Home"];
    $: title = [...tabName, websiteName].join(" | ");
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<article>
	<div class="post-header">
        <h1 class="post-title">{data.title}</h1>
	    <p class="post-date">Published: {data.date}</p>
        <hr class="divider">
    </div>
    <div class="blog-post">
        <svelte:component this={data.content} />
    </div>
</article>