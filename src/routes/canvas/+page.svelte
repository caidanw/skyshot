<script lang="ts">
	let canvas: HTMLCanvasElement;

	const width = 500;
	const height = 700;

	function drawBorder(
		ctx: CanvasRenderingContext2D,
		borderWidth: number = 0,
	) {
		if (borderWidth <= 0) {
			return;
		}

		ctx.lineWidth = borderWidth;
		ctx.rect(
			borderWidth / 2,
			borderWidth / 2,
			width - borderWidth,
			height - borderWidth,
		);
		ctx.stroke();
	}

	$effect(() => {
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get 2D context from canvas");
		}

		// Draw border
		ctx.strokeStyle = "red";
		drawBorder(ctx, 1);
	});
</script>

<main class="flex-grow">
	<canvas bind:this={canvas} class="border border-black" {width} {height}>
	</canvas>
</main>
