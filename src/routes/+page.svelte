<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div>
	<h1 class="text-3xl font-bold">Events</h1>

	{#await data.events}
		<p>Loading...</p>
	{:then events}
		{#if events.length > 0}
			<ul>
				{#each events as event}
					<li>
						<a role="button" href="/{event.id}">
							<h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
							<p>{event.description}</p>
							<p>{event.date}</p>
						</a>
					</li>
				{/each}
			</ul>
		{:else}
			<p>There are currently no events. Please add an event</p>
		{/if}
	{:catch}
		<p>There was an error with loading the events</p>
	{/await}
</div>
