import type { Event } from './server/remote-events';

interface FormError {
	status: number;
	message: string;
}

type SubmittedEvent = Omit<Event, 'id'>;

export function isFormError(data: SubmittedEvent | FormError): data is FormError {
	return (data as FormError).status !== undefined;
}

export function validateFormData(formData: FormData): SubmittedEvent | FormError {
	const title = formData.get('title')?.toString();
	const description = formData.get('description')?.toString();
	const date = formData.get('date')?.toString();
	const nowDate = formData.get('nowDate')?.toString() ?? new Date().toISOString().slice(0, 16);

	if (!title || !date) {
		return {
			status: 400,
			message: 'Title and Date are required!'
		};
	}

	if (new Date(date).getTime() < new Date(nowDate).getTime()) {
		return {
			status: 400,
			message: 'Event cannot be in the past!'
		};
	}

	return {
		title,
		description,
		date
	};
}
