<script>
	export let data;
</script>

<article>
	<h1 class="post-title">{data.title}</h1>
	<p class="post-date">Published: {data.date}</p>
	<svelte:component this={data.content} />
</article>