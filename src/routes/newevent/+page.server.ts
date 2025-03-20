import { createEvent } from '$lib/server/remote-events';
import { isFormError, validateFormData } from '$lib/validation';
import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const formdata = await request.formData();
		const validatedData = validateFormData(formdata);

		if (isFormError(validatedData)) {
			error(validatedData.status, validatedData.message);
		}

		const newEvent = await createEvent(validatedData);
		redirect(303, `/${newEvent.id}`);
	}
};
