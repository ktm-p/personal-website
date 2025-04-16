<script>
	export let data;
    import '$lib/styles/prism-darcula.css';

    $: title = [...title, data.title].join(" - ");
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