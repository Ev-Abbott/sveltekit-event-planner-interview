import { deleteEventById } from '$lib/server/remote-events';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const rawEventId = data.get('eventId')?.toString();

		if (!rawEventId) {
			error(400, 'No event id provided');
		}

		const eventId = parseInt(rawEventId, 10);
		const wasEventDeleted = await deleteEventById(eventId);

		// We can interpret a falsey server response as not found
		if (!wasEventDeleted) {
			error(404, `No event found for id: ${eventId}`);
		}

		redirect(303, `/`);
	}
};
