<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	{#await data.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
			<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
			<p>{event.description}</p>
			<p>{event.date}</p>
		{:else}
			<p>Sorry, there is no event for id: {page.params.eventId}</p>
		{/if}
	{:catch}
		<p>Sorry, something went wrong when fetching event for id: {page.params.eventId}</p>
	{/await}
</div>
