<script lang="ts">
	import { dev } from "$app/environment";
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";

	const enableStudio = false;
</script>

{#if dev && enableStudio}
	<main class="relative flex-1 container">
		<div class="absolute inset-0">
			<Canvas>
				{#await import("@threlte/studio") then { Studio }}
					<Studio>
						<Scene />
					</Studio>
				{/await}
			</Canvas>
		</div>
	</main>
{:else}
	<main
		class="relative flex-1 container flex flex-col items-center justify-center gap-2"
	>
		<div id="tweakpane"></div>
		<div
			class="aspect-[6/7] max-h-[70vh] max-w-full mx-auto border border-black grow"
		>
			<Canvas>
				<Scene />
			</Canvas>
		</div>
	</main>
{/if}
