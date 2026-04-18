export function slugify(str) {
	return str
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/['"]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-')
}