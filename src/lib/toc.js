import { unified } from 'unified';
import remarkParse from 'remark-parse';

export function extractHeadings(markdown) {
  const tree = unified().use(remarkParse).parse(markdown);

  const headings = [];

  function visit(node) {
    if (node.type === 'heading') {
      headings.push({
        depth: node.depth,
        text: node.children.map(c => c.value).join('')
      });
    }

    if (node.children) {
      node.children.forEach(visit);
    }
  }

  visit(tree);
  return headings;
}