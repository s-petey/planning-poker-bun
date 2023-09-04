import { app } from '$lib';
import { error } from '@sveltejs/kit';

export const load = async () => {
	const { data, error: getError } = await app.api.id['123'].get();

	if (getError) {
		throw error(getError.status, getError.value);
	}

	return { data: data };
};
