<script lang="ts">
	import { dev } from "$app/environment";
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";

	const enableStudio = false;
</script>

<main class="relative flex-1 container">
	{#if dev && enableStudio}
		<div class="absolute inset-0">
			<Canvas>
				{#await import("@threlte/studio") then { Studio }}
					<Studio>
						<Scene />
					</Studio>
				{/await}
			</Canvas>
		</div>
	{:else}
		<div class="aspect-[6/7] max-h-[70vh] mx-auto">
			<Canvas>
				<Scene />
			</Canvas>
		</div>
	{/if}
</main>
