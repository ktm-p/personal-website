<script>
	export let data;
</script>

<article class="blog-post">
	<div class="post-header">
        <h1 class="post-title">{data.title}</h1>
	    <p class="post-date">Published: {data.date}</p>
        <hr class="divider">
    </div>
	<svelte:component this={data.content} />
</article>