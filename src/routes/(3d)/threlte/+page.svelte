<script lang="ts">
	import { dev } from "$app/environment";
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";

	const enableStudio = false;
</script>

<main class="relative flex-1">
	<div class="absolute inset-0">
		<Canvas>
			{#if dev && enableStudio}
				{#await import("@threlte/studio") then { Studio }}
					<Studio>
						<Scene />
					</Studio>
				{/await}
			{:else}
				<Scene />
			{/if}
		</Canvas>
	</div>
</main>
