<script>
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
</script>

<!-- <div class="card-container flex-grow flex flex-col"> -->
<Canvas>
	<Scene />
</Canvas>

<!-- </div> -->

<style>
	.card-container {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
	.card-container canvas {
		width: 100%;
		height: 100%;
	}
</style>
