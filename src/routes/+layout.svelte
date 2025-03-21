<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-dvh">
	<nav class="p-4">
		<ul class="flex gap-4">
			<li><a class="link" href="/">Home</a></li>
			<li><a class="link" href="/newevent" role="button">Add Event</a></li>
		</ul>
	</nav>
	<div class="w-8/12 flex flex-col items-center justify-center grow self-center">
		{@render children()}
	</div>
</div>
