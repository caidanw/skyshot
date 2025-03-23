<script>
	import "../app.css";

	import { Separator } from "$lib/components/ui/separator";
	import { ModeWatcher } from "mode-watcher";
	import ModeToggle from "$lib/components/ModeToggle.svelte";
</script>

<ModeWatcher />
<div class="min-h-screen flex flex-col">
	<!-- <Header /> -->

	<div
		class="container flex flex-row items-center justify-between py-4 sm:flex-row sm:items-center md:h-16"
	>
		<h2 class="text-lg font-semibold w-full">SkyShot</h2>
		<div class="ml-auto flex space-x-2 sm:justify-end">
			<ModeToggle />
		</div>
	</div>
	<Separator />

	<main class="container p-8 flex-1">
		<slot />
	</main>

	<Separator />
	<footer>
		<p>
			<span>a creation from</span>
			<a
				class="text-sky-500"
				href="https://bsky.app/profile/caidan.dev"
				target="_blank"
			>
				<span>@caidan.dev</span>
			</a>
		</p>
		<p>
			<span>open source on</span>
			<a
				class="text-sky-500"
				href="https://github.com/caidanw/skyshot"
				target="_blank"
			>
				<span>github</span>
			</a>
		</p>
	</footer>
</div>

<style>
	footer {
		/* display: hidden; */
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
