<header>
	<div class="h-group">
		<h1>SkyShot</h1>
	</div>

	<div>
		<a href="/new" class="create-button"> + New Card </a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.h-group {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.corner {
		width: 2em;
		height: 2em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}
</style>
