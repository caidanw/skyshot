<script lang="ts">
	import { Canvas } from "@threlte/core";
	import type { Action } from "svelte/action";
	import { Pane } from "tweakpane";
	import {
		createCardContextTexture,
		drawBorder,
		drawFadingGradient,
	} from "../../canvas/utils";
	import Scene from "./Scene.svelte";

	const settings = $state({
		display3D: false,
	});

	const borderStyle = $state({
		enabled: true,
		width: 10,
		offset: 0,
		color: "#f00",
	});

	const placeholderTextureUrl = "/textures/500x700.png";

	const img = new Image();
	img.src = placeholderTextureUrl;
	img.crossOrigin = "anonymous";
	img.onload = render;

	const { ctx, texture: cardTexture } = createCardContextTexture();

	$effect(() => {
		if (!settings.display3D) {
			document
				.getElementById("canvas-container")
				?.appendChild(ctx.canvas);
		} else {
			document
				.getElementById("canvas-container")
				?.removeChild(ctx.canvas);
		}
	});

	function render() {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

		drawFadingGradient(ctx, 0, 0, ctx.canvas.width, 700);

		// Draw border
		if (borderStyle.enabled) {
			drawBorder(
				ctx,
				borderStyle.width,
				borderStyle.offset,
				borderStyle.color,
			);
		}

		cardTexture.needsUpdate = true;
	}
	$effect(render);

	const tweakpaneAction: Action<HTMLDivElement> = (node) => {
		const pane = new Pane({
			container: node,
			title: "Card Style",
		});
		pane.addBinding(settings, "display3D", {
			label: "Display in 3D",
		});

		const borderFolder = pane.addFolder({
			title: "Border",
		});
		borderFolder.addBinding(borderStyle, "enabled");
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

		return {
			update: () => {
				pane.refresh();
			},
			destory: () => {
				pane.dispose();
			},
		};
	};
</script>

<main
	class="relative flex-1 container flex flex-col items-center justify-center gap-2"
>
	<div id="tweakpane" use:tweakpaneAction></div>
	{#if settings.display3D}
		<div class="aspect-[6/7] max-h-[70vh] max-w-full mx-auto flex-1">
			<Canvas>
				<Scene {cardTexture} />
			</Canvas>
		</div>
	{:else}
		<div
			id="canvas-container"
			class="aspect-[5/7] max-h-[70vh] max-w-full mx-auto flex-1"
		></div>
	{/if}
</main>

<style>
	#canvas-container > :global(canvas) {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
</style>
