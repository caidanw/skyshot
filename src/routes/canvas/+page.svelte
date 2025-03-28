<script lang="ts">
	import { onMount } from "svelte";
	import { Pane } from "tweakpane";
	import { drawBorder } from "./utils";

	let canvas: HTMLCanvasElement;

	const width = 500;
	const height = 700;

	const borderStyle = $state({
		width: 1,
		offset: 0,
		color: "#f00",
	});

	const img = new Image();
	img.src = "https://placehold.co/500x700";
	img.onload = render;

	function render() {
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get 2D context from canvas");
		}

		ctx.clearRect(0, 0, width, height);

		ctx.drawImage(img, 0, 0, width, height);

		// Draw border
		drawBorder(
			ctx,
			borderStyle.width,
			borderStyle.offset,
			borderStyle.color,
		);
	}
	$effect(render);

	onMount(() => {
		const tweakpaneElem = document.getElementById("tweakpane");
		if (!tweakpaneElem) {
			console.error("target element for tweakpane not found");
			return;
		}

		const pane = new Pane({
			container: tweakpaneElem,
			title: "Card Style",
		});

		const borderFolder = pane.addFolder({
			title: "Border",
		});
		borderFolder.addBinding(borderStyle, "width", {
			min: 0,
			max: 50,
			step: 1,
		});
		borderFolder.addBinding(borderStyle, "offset", {
			min: 0,
			max: 50,
			step: 1,
		});
		borderFolder.addBinding(borderStyle, "color");

		return () => {
			pane.dispose();
		};
	});
</script>

<main class="flex-grow flex flex-col items-center justify-center gap-2">
	<div id="tweakpane"></div>
	<canvas bind:this={canvas} class="border border-black" {width} {height}>
	</canvas>
</main>
