<script lang="ts">
	import { enhance } from '$app/forms';

	let isCreating = $state(false);
</script>

<form
	method="POST"
	use:enhance={() => {
		isCreating = true;

		return async ({ update }) => {
			await update();
			isCreating = false;
		};
	}}
>
	<!-- form for creating new event -->
	<label for="title">Title</label>
	<input type="text" id="title" name="title" required disabled={isCreating} />
	<textarea
		id="description"
		name="description"
		rows="4"
		cols="50"
		placeholder="Description"
		disabled={isCreating}
	></textarea>
	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" required disabled={isCreating} />
	<button type="submit">Create Event</button>
</form>

{#if isCreating}
	<p>Saving Event... please wait</p>
{/if}
