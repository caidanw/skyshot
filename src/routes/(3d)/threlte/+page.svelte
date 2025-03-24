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
		display: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
