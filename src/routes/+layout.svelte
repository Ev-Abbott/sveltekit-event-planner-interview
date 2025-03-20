<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex items-center justify-center">
	{@render children()}
</div>
