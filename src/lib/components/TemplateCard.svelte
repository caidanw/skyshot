<script lang="ts">
	import type { Card } from "$lib";

	const { card = $bindable() }: { card: Card } = $props();
</script>

<div class="card-frame">
	<div class="subject-name">{card.subject.handle}</div>
	<img src={card.photoUrl} alt={card.metadata.title} class="card-image" />
	<div class="footer">
		<span>Shot by</span>
		<div class="photographer-name">{card.photographer.handle}</div>
	</div>
</div>

<style>
	.card-frame {
		width: 20rem;
		aspect-ratio: 5/7;
		border-radius: 1rem;
		overflow: hidden;
		transition: transform 0.3s;
		position: relative;
	}

	.subject-name {
		position: absolute;
		top: 1rem;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 0.25rem 0.75rem;
		border-radius: 2rem;
		font-size: 1.2em;
		z-index: 2;
		backdrop-filter: blur(0.5rem);
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
	}

	.photographer-name {
		font-size: 1.2em;
		font-weight: bold;
	}

	.footer {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 1rem;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		color: white;
		text-align: end;
	}

	.footer span {
		font-size: 0.8em;
		text-transform: uppercase;
		letter-spacing: 1px;
		opacity: 0.8;
	}

	.photographer-name {
		font-size: 1.2em;
		font-weight: bold;
	}
</style>
