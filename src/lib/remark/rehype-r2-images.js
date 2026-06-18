import { visit } from 'unist-util-visit';

export function rehypeR2Images(r2Base) {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if ((node.tagName === 'img' || node.tagName === 'source') && node.properties?.src?.startsWith('/blog/')) {
				node.properties.src = r2Base + node.properties.src;
			}
			if (node.tagName === 'video' && node.properties?.poster?.startsWith('/blog/')) {
				node.properties.poster = r2Base + node.properties.poster;
			}
		});
		visit(tree, 'raw', (node) => {
			node.value = node.value.replace(/((?:src|poster)=["'])\/blog\//g, `$1${r2Base}/blog/`);
		});
	};
}
