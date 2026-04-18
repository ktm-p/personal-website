import { extractHeadings } from '$lib/toc';

const modules = import.meta.glob('../*.md');
const rawModules = import.meta.glob('../*.md', { as: 'raw' });

export async function load({ params }) {
	const match = Object.keys(modules).find((path) =>
		path.endsWith(`${params.slug}.md`)
	);

	if (!match) {
		throw new Error(`Post not found: ${params.slug}`);
	}

	const post = await modules[match]();
	const raw = await rawModules[match]();

	const { title, date } = post.metadata;

	return {
		content: post.default,
		title,
		date,
		toc: extractHeadings(raw)
	};
}