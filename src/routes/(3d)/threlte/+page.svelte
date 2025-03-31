<script lang="ts">
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
</script>

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
