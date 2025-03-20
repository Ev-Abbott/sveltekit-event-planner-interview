import { updateEventById } from '$lib/server/remote-events';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formdata = await request.formData();
		const title = formdata.get('title')?.toString();
		const description = formdata.get('description')?.toString();
		const date = formdata.get('date')?.toString();
		if (!title || !date) {
			error(400, 'Title and Date are required');
		}

		const eventId = parseInt(params.eventId, 10);
		const result = await updateEventById(eventId, { title, description, date });

		if (!result) {
			error(404, `No event found for id: ${eventId}`);
		}

		redirect(303, `/${result.id}`);
	}
};
