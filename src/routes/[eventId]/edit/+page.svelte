<script lang="ts">
	import Form from '$lib/form.svelte';
	import type { PageData } from './$types';
	import { page } from '$app/state';

	let { data }: { data: PageData } = $props();
</script>

<div class="grow w-full">
	{#await data.event}
		<p>Loading...</p>
	{:then event}
		{#if event}
			<Form initialData={event} />
		{:else}
			<p class="text-error">Sorry, there is no event for id: {page.params.eventId}</p>
		{/if}
	{:catch}
		<p class="text-error">
			Sorry, something went wrong when fetching event for id: {page.params.eventId}
		</p>
	{/await}
</div>
