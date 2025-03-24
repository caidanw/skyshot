<script lang="ts">
	import { Canvas } from "@threlte/core";
	import Scene from "./Scene.svelte";
</script>

<div>
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	div {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: rgb(14, 22, 37);

		flex: 1;
	}
</style>
