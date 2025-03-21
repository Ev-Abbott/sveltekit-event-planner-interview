<script lang="ts">
	import { formatDate } from '$lib';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="grow w-full">
	<h1 class="text-3xl font-bold text-left text-white">Event List</h1>
	<hr class="mb-4" />
	{#await data.events}
		<p>Loading...</p>
	{:then events}
		{#if events.length > 0}
			<ul class="grid grid-cols-3 gap-4 p-2">
				{#each events as event}
					<li class="border-2 p-2 rounded-lg">
						<a role="button" href="/{event.id}">
							<h2 class="text-lg font-bold">
								#{event.id}: <span class="text-white font-normal">{event.title}</span>
							</h2>
							<p class="text-white mb-2">{event.description}</p>
							<p class="text-lg font-bold">
								Date: <span class="text-white font-normal">{formatDate(event.date)}</span>
							</p>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-error">There are currently no events. Please add an event</p>
		{/if}
	{:catch}
		<p class="text-error">There was an error with loading the events</p>
	{/await}
</div>
