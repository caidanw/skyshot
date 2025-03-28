import { CanvasTexture } from "three";

export function createCardContextTexture() {
  const ctx = document.createElement("canvas").getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get 2D context from canvas");
  }

  ctx.canvas.width = 500;
  ctx.canvas.height = 700;

  const texture = new CanvasTexture(ctx.canvas);

  return { ctx, texture };
}

export function drawBorder(
  ctx: CanvasRenderingContext2D,
  width: number = 1,
  offset: number = 0,
  color: string = "red",
) {
  if (width <= 0) return;
  if (offset < 0) offset = 0;

  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.strokeRect(
    width / 2 + offset,
    width / 2 + offset,
    ctx.canvas.width - width - offset * 2,
    ctx.canvas.height - width - offset * 2,
  );
}
