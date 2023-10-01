import { app } from '$lib';
import { error, fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	const { data } = await app.api.rooms.get();

	if (!Array.isArray(data)) throw error(500, { message: 'Invalid room data' });

	return {
		rooms: data
	};
};

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const roomName = data.get('roomName');

		if (roomName === null || (typeof roomName === 'string' && roomName.trim().length === 0)) {
			return fail(400, { roomName, missing: true });
		}

		const trimmedName = String(roomName).trim();

		const { data: response } = await app.api.rooms.post({
			label: '',
			name: trimmedName,
			showVotes: false
		});

		if (response === null) throw error(500, { message: 'Unable to create item' });

		throw redirect(303, `/room/${response.id}`);
	}
};
