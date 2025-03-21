<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { formatDate } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let isDeleting = $state(false);
</script>

<div class="grow w-full">
	<h1 class="text-3xl font-bold text-left text-white">Event Details</h1>
	<hr class="pb-2" />
	{#await data.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
			<form
				class="flex flex-col gap-2"
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
				<h2 class="text-lg font-bold">
					#{event.id}: <span class="text-white font-normal">{event.title}</span>
				</h2>
				<div>
					<p class="font-bold">
						Description: <span class="text-white font-normal">{event.description}</span>
					</p>
					<p class="font-bold">
						Date: <span class="text-white font-normal">{formatDate(event.date)}</span>
					</p>
					<input type="hidden" name="eventId" value={event.id} />
				</div>
				<a
					aria-disabled={isDeleting}
					class="btn btn-primary aria-disabled:btn-disabled text-white"
					role="button"
					href="/{event.id}/edit"
				>
					Edit
				</a>
				<button class="btn btn-error" disabled={isDeleting}>Delete</button>
				{#if isDeleting}
					<p>Deleting event...</p>
				{/if}
			</form>
		{:else}
			<p class="text-error">Sorry, there is no event for id: {page.params.eventId}</p>
		{/if}
	{:catch}
		<p class="text-error">
			Sorry, something went wrong when fetching event for id: {page.params.eventId}
		</p>
	{/await}
</div>
