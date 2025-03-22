<script>
	import "../app.css";
	import Header from "./Header.svelte";
	import "./styles.css";
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			<span>a creation from</span>
			<a href="https://bsky.app/profile/caidan.dev" target="_blank">
				<span>@caidan.dev</span>
			</a>
		</p>
		<p>
			<span>open source on</span>
			<a href="https://github.com/caidanw/skyshot" target="_blank">
				<span>github</span>
			</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
