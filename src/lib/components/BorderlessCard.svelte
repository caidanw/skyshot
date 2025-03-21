<script lang="ts">
	import type { Card } from "$lib";

	export let card: Card;
</script>

<div class="card-frame">
	<div class="borderless-card">
		<div class="header-pill">{card.subject.handle}</div>
		<img src={card.photoUrl} alt={card.subject.handle} class="card-image" />
		<div class="footer-text">
			<span>Shot by</span>
			<div class="photographer-name">{card.photographer.handle}</div>
		</div>
	</div>
</div>

<style>
	.card-frame {
		width: 20rem;
		aspect-ratio: 5/7;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: transform 0.3s;
	}

	.card-frame:hover {
		transform: translateY(-8px) rotate(2deg);
	}

	.borderless-card {
		position: relative;
		transition: transform 0.3s;
		height: 100%;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 1rem;
	}

	.header-pill {
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.7);
		color: white;
		padding: 8px 24px;
		border-radius: 2rem;
		font-size: 1.2em;
		z-index: 2;
		backdrop-filter: blur(5px);
	}

	.footer-text {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 20px;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
		color: white;
		text-align: end;
	}

	.footer-text span {
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
