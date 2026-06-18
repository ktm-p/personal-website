import { PUBLIC_R2_BASE_URL } from '$env/static/public';

export function r2(path) {
	return `${PUBLIC_R2_BASE_URL}/${path}`;
}
