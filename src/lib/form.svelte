<script lang="ts">
	import { enhance } from '$app/forms';

	interface FormData {
		title: string;
		description: string;
		date: string;
	}

	let {
		initialData
	}: {
		initialData?: FormData;
	} = $props();

	let formState = $state<FormData>(
		initialData ?? {
			title: '',
			description: '',
			date: ''
		}
	);

	let isEditMode = $state(Boolean(initialData));
	let isSubmitting = $state(false);
</script>

<div>
	<h1 class="font-bold text-center text-4xl">{isEditMode ? 'Edit' : 'Create'} Event</h1>
	<form
		class="flex flex-col justify-center gap-4"
		method="POST"
		use:enhance={() => {
			isSubmitting = true;

			return async ({ update }) => {
				await update();
				isSubmitting = false;
			};
		}}
	>
		<!-- form for creating new event -->
		<div class="flex flex-col">
			<label for="title">Title</label>
			<input
				bind:value={formState.title}
				type="text"
				id="title"
				name="title"
				required
				disabled={isSubmitting}
			/>
		</div>
		<textarea
			id="description"
			name="description"
			bind:value={formState.description}
			rows="4"
			cols="50"
			placeholder="Description"
			disabled={isSubmitting}
		></textarea>
		<div class="flex flex-col">
			<label for="date">Date</label>
			<input
				bind:value={formState.date}
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
</div>
