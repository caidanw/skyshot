<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { Studio } from "@threlte/studio";
	import Scene from "./Scene.svelte";
</script>

<main class="relative flex-1">
	<div class="absolute inset-0">
		<Canvas>
			<Studio>
				<Scene />
			</Studio>
		</Canvas>
	</div>
</main>
