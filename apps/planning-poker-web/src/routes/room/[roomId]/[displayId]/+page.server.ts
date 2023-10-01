export const ssr = false;
import { app } from '$lib';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { data } = await app.api.rooms[params.roomId].get();

	if (data === null) throw error(500, { message: 'Unable to create item' });

	const currentDisplay = data.displays.find((display) => display.name === params.displayId);

	if (typeof currentDisplay === 'undefined') {
		throw error(404, 'No display');
	}

	return {
		room: data,
		currentDisplay
	};
};
