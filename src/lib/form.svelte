<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from './server/remote-events';

	type EventFormData = Omit<Event, 'id'>;

	let {
		initialData
	}: {
		initialData?: EventFormData;
	} = $props();

	let formState = $state<EventFormData>(
		initialData ?? {
			title: '',
			description: '',
			date: ''
		}
	);

	let isEditMode = $state(Boolean(initialData));
	let error = $state<string | null>(null);
	let isSubmitting = $state(false);

	// this date needs to match the format expected for `min` prop
	const nowDate = new Date().toISOString().slice(0, 16);
</script>

<div>
	<h1 class="font-bold text-center text-4xl">{isEditMode ? 'Edit' : 'Create'} Event</h1>
	<form
		class="flex flex-col justify-center gap-4"
		method="POST"
		use:enhance={() => {
			isSubmitting = true;
			error = null;

			return async ({ update, result }) => {
				await update();
				if (result.type === 'failure') {
					// we know the type we are sending
					error = (result.data?.message as string) ?? 'Something went wrong! Try again.';
				}
				isSubmitting = false;
			};
		}}
	>
		<!-- form for creating new event -->
		<div class="flex flex-col">
			<label for="title">Title <span class="text-red-500">*</span></label>
			<input
				bind:value={formState.title}
				type="text"
				class="text-gray-600 placeholder:text-gray-400"
				placeholder="Please enter a title"
				id="title"
				name="title"
				required
				disabled={isSubmitting}
			/>
		</div>
		<textarea
			id="description"
			name="description"
			class="text-gray-600 placeholder:text-gray-400"
			bind:value={formState.description}
			rows="4"
			cols="50"
			placeholder="Description"
			disabled={isSubmitting}
		></textarea>
		<div class="flex flex-col">
			<label for="date">Date <span class="text-red-500">*</span></label>
			<input type="hidden" name="nowDate" value={nowDate} />
			<input
				class="text-gray-600 placeholder:text-gray-400"
				bind:value={formState.date}
				min={nowDate}
				type="datetime-local"
				id="date"
				name="date"
				required
				disabled={isSubmitting}
			/>
		</div>
		<button disabled={isSubmitting} class="btn btn-primary text-white" type="submit"
			>{isEditMode ? 'Update' : 'Create'} Event</button
		>
	</form>

	{#if isSubmitting}
		<p>{isEditMode ? 'Updating' : 'Creating'} Event... please wait</p>
	{/if}

	{#if error}
		<p class="text-error">Error: {error}</p>
	{/if}
</div>
