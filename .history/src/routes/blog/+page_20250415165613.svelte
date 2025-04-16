<script>
	export let data;
</script>

<h1 class="section-head blog-head">Welcome to my Blog</h1>
<hr class="divider">
<div class="blog-container">
	{#each data.posts as post}
		<li>
            <a href={post.path}>
                {post.meta.title}
            </a>
            <br>
			Published {post.meta.date}
		</li>
	{/each}
</div>