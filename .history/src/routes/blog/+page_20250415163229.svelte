<script>
	export let data;
</script>

<h1>Blog Page</h1>

<ul>
	{#each data.posts as post}
		<li>
            <a href={post.path}>
                {post.meta.title}
            </a>
            <br>
			Published {post.meta.date}
		</li>
	{/each}
</ul>