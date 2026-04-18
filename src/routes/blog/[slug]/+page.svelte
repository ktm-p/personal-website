<script>
	export let data;
    import '$lib/styles/prism-darcula.css';
    import { page } from "$app/stores";
	import { onMount } from 'svelte';
	import { slugify } from '$lib/utils/slugify';

	let activeId = '';

	onMount(() => {
		const hs = document.querySelectorAll('.blog-post h1');

		hs.forEach(h => {
			h.id = slugify(h.textContent);
		});
		
		const headings = Array.from(document.querySelectorAll('.blog-post h1'));

		let lastScrollY = window.scrollY;

		const NAV_OFFSET = window.innerHeight / 3;
		const UP_THRESHOLD = window.innerHeight / 2;

		function updateActive() {
			const currentScrollY = window.scrollY;
			const scrollingDown = currentScrollY > lastScrollY;

			let current = headings[0];

			for (const h of headings) {
				const rect = h.getBoundingClientRect();

				if (scrollingDown) {
					if (rect.top - NAV_OFFSET <= 0) {
						current = h;
					}
				} else {
					if (rect.top - UP_THRESHOLD <= 0) {
						current = h;
					}
				}
			}

			if (current) {
				activeId = current.id;
			}

			lastScrollY = currentScrollY;
		}

		window.addEventListener('scroll', updateActive);
		updateActive();

		return () => window.removeEventListener('scroll', updateActive);
	});
</script>

<!-- <svelte:head>
    <title>{title}</title>
</svelte:head> -->

<div class="layout">
    {#if data.toc && data.toc.filter(h => h.depth < 2).length > 0}
        <aside class="toc">
            <h3>Contents</h3>
            {#each data.toc.filter(h => h.depth < 2) as item}
                {@const slug = slugify(item.text)}

                <div class="toc-item" class:active={activeId === slug}>
                    <a href={`#${slug}`}>
                        {item.text}
                    </a>
                </div>
            {/each}
        </aside>
    {/if}
    
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
</div>
