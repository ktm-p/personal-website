<script>
	export let data;
</script>

<h1>Blog</h1>

<ul>
	{#each data.posts as post}
		<li>
            <a href={post.path}>
                {post.meta.title}
            </a>
			Published {post.meta.date}
		</li>
	{/each}
</ul>