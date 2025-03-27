<script lang="ts">
	import { onMount } from "svelte";
	import { Pane } from "tweakpane";

	let canvas: HTMLCanvasElement;

	const width = 500;
	const height = 700;

	const borderStyle = $state({
		borderWidth: 1,
		borderOffset: 0,
		borderColor: "#f00",
	});

	function drawBorder(
		ctx: CanvasRenderingContext2D,
		borderWidth: number = 1,
		borderOffset: number = 0,
		borderColor: string = "red",
	) {
		if (borderWidth <= 0) return;
		if (borderOffset < 0) borderOffset = 0;

		ctx.strokeStyle = borderColor;
		ctx.lineWidth = borderWidth;
		ctx.strokeRect(
			borderWidth / 2 + borderOffset,
			borderWidth / 2 + borderOffset,
			width - borderWidth - borderOffset * 2,
			height - borderWidth - borderOffset * 2,
		);
		ctx.stroke();
	}

	$effect(() => {
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get 2D context from canvas");
		}

		ctx.clearRect(0, 0, width, height);

		// Draw border
		drawBorder(
			ctx,
			borderStyle.borderWidth,
			borderStyle.borderOffset,
			borderStyle.borderColor,
		);
	});

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
		pane.addBinding(borderStyle, "borderWidth", {
			min: 0,
			max: 50,
			step: 1,
		});
		pane.addBinding(borderStyle, "borderOffset", {
			min: 0,
			max: 50,
			step: 1,
		});
		pane.addBinding(borderStyle, "borderColor");

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
