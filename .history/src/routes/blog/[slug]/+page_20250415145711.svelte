<script>
	export let data;
    import 'prismjs/themes/prism-darcula.css';
</script>

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