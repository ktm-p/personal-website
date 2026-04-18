<script>
	export let data;
    import '$lib/styles/prism-darcula.css';
    import { page } from "$app/stores";
	import { onMount } from 'svelte';

	let activeId = '';

	onMount(() => {
		const headings = Array.from(document.querySelectorAll('.blog-post h1'));

		let positions = [];

		const NAV_OFFSET = 120;
        const getUpThreshold = () => window.innerHeight / 2;

		function computePositions() {
			positions = headings.map(h => ({
				id: h.id,
				top: h.offsetTop
			}));
		}

		computePositions();

		let lastScrollY = window.scrollY;
		let ticking = false;

		function updateActive() {
			const currentScrollY = window.scrollY;
			const scrollingDown = currentScrollY > lastScrollY;

			const threshold = scrollingDown
				? currentScrollY + NAV_OFFSET
				: currentScrollY + getUpThreshold();

			let current = positions[0];

			for (const p of positions) {
				if (p.top <= threshold) {
					current = p;
				} else {
					break;
				}
			}

			if (current) {
				activeId = current.id;
			}

			lastScrollY = currentScrollY;
		}

		function onScroll() {
			if (!ticking) {
				requestAnimationFrame(() => {
					updateActive();
					ticking = false;
				});
				ticking = true;
			}
		}

		function onResize() {
			computePositions();
			updateActive();
		}

		window.addEventListener('scroll', onScroll);
		window.addEventListener('resize', onResize);

		updateActive();

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onResize);
		};
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
                {@const slug = item.text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}

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
