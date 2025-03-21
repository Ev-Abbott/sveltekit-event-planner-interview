import { updateEventById } from '$lib/server/remote-events';
import { isFormError, validateFormData } from '$lib/validation';
import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formdata = await request.formData();
		const validatedData = validateFormData(formdata);

		if (isFormError(validatedData)) {
			return fail(validatedData.status, { message: validatedData.message });
		}

		const eventId = parseInt(params.eventId, 10);
		const result = await updateEventById(eventId, validatedData);

		if (!result) {
			error(404, `No event found for id: ${eventId}`);
		}

		redirect(303, `/${result.id}`);
	}
};
