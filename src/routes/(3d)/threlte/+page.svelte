<script lang="ts">
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
</script>

<main class="relative flex-1">
	<div class="absolute inset-0">
		<Canvas>
			<Scene />
		</Canvas>
	</div>
</main>
