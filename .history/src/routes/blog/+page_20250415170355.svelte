<script>
	export let data;
</script>

<h1 class="section-head blog-head">Welcome to my Blog</h1>
<hr class="divider">
{#each data.posts as post}
    <div class="blog-container">
        <a href={post.path} class="post-title">
            {post.meta.title}
        </a>
        <div class="post-date">
            {post.meta.date}
        </div>
    </div>
{/each}