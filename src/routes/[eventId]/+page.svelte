<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isDeleting = $state(false);
</script>

<div>
	{#await data.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
			<form
				method="POST"
				action="?/delete"
				use:enhance={() => {
					isDeleting = true;
					return async ({ update }) => {
						await update();
						isDeleting = false;
					};
				}}
			>
				<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
				<p>{event.description}</p>
				<p>{event.date}</p>
				<input type="hidden" name="eventId" value={event.id} />
				<a
					aria-disabled={isDeleting}
					class="btn aria-disabled:btn-disabled"
					role="button"
					href="/{event.id}/edit"
				>
					Edit
				</a>
				<button class="btn" disabled={isDeleting}>Delete</button>
				{#if isDeleting}
					<p>Deleting event...</p>
				{/if}
			</form>
		{:else}
			<p>Sorry, there is no event for id: {page.params.eventId}</p>
		{/if}
	{:catch}
		<p>Sorry, something went wrong when fetching event for id: {page.params.eventId}</p>
	{/await}
</div>
