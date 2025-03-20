<script>
	export let card;
</script>

<div class="card-frame">
	<div class="friend-card">
		<div class="photo-container">
			<img src={card.photo_url} alt={card.name} class="friend-photo" />
			<div class="photo-name-overlay">{card.name}</div>
		</div>
		<div class="photographer">
			<span>Shot by</span>
			<span class="photographer-name">{card.photographer}</span>
		</div>
	</div>
</div>

<style>
	.card-frame {
		width: 20rem;
		aspect-ratio: 5/7;
		background: linear-gradient(45deg, #1a1a1a, #333);
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition: transform 0.3s;
	}

	.card-frame:hover {
		transform: translateY(-8px) rotate(2deg);
	}

	.friend-card {
		height: 100%;
		padding: 0.3rem;
		background: linear-gradient(45deg, #1a1a1a, #333);
	}

	.photo-container {
		position: relative;
	}

	.friend-photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-top-left-radius: 0.7rem;
		border-top-right-radius: 0.7rem;
	}

	.photo-name-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 15px;
		color: white;
		font-size: 1.4em;
		font-weight: bold;
		-webkit-text-stroke: 1px black;
		text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
	}

	.photographer {
		text-align: end;
		color: white;
		font-size: 0.6em;
		text-transform: uppercase;
		letter-spacing: 1px;
	}

	.photographer-name {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		font-size: 1.2em;
		font-weight: bold;
	}
</style>
