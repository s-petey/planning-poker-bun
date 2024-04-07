import { app } from '$lib';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { data } = await app.api.rooms[params.roomId].get();

	if (data === null) throw error(500, { message: 'Unable to create item' });

	return {
		room: data
	};
};

export const actions = {
	default: async ({ request, params }) => {
		const data = await request.formData();
		const displayName = data.get('displayName');
		const rawIsHost = data.get('isHost');

		let isHost = false;

		if (rawIsHost === 'on') {
			isHost = true;
		}

		if (
			displayName === null ||
			(typeof displayName === 'string' && displayName.trim().length === 0)
		) {
			return fail(400, { isHost, displayName, missing: true });
		}

		const trimmedName = String(displayName).trim();

		const { data: response } = await app.api.displays.post({
			roomId: params.roomId,
			name: trimmedName,
			cardValue: 0,
			isHost
		});

		if (response === null) throw error(500, { message: 'Unable to create item' });

		const display = response.displays.find((d) => d.name === trimmedName);

		if (display === undefined) {
			throw error(404, 'Could not route to this display');
		}

		throw redirect(303, `/room/${response.id}/${display.name}`);
	}
};
