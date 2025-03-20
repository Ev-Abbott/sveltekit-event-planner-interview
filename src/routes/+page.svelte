<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<h1 class="text-xl">Events</h1>
{#await data.events}
	<p>Loading...</p>
{:then events}
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
{:catch}
	<p>There was an error with loading the events</p>
{/await}

<a class="btn" href="/newevent" role="button">Add Event</a>
