<script>
	export let data;
</script>

<h1 class="section-head blog-head">Welcome to my Blog</h1>
<hr class="divider">
{#each data.posts as post}
    <div class="blog-container">
        <a href={post.path}>
            {post.meta.title}
        </a>
        <br>
        <span style="font-weight: bold;">Published</span>: {post.meta.date}
    </div>
{/each}