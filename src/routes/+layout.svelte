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
		class="container flex flex-row items-center justify-between py-2 sm:flex-row sm:items-center md:h-16"
	>
		<a href="/" class="text-xl font-bold pr-2">SkyShot</a>
		<div class="flex gap-2">
			<ModeToggle />
		</div>
	</div>
	<Separator />

	<main class="container p-8 flex-1">
		<slot />
	</main>

	<Separator />
	<footer
		class="container flex flex-col items-center justify-center py-2 leading-5"
	>
		<p>
			<span>a creation from</span>
			<a
				class="font-medium text-sky-500"
				href="https://bsky.app/profile/caidan.dev"
				target="_blank"
			>
				<span>@caidan.dev</span>
			</a>
		</p>
		<p>
			<span>open source on</span>
			<a
				class="font-medium text-sky-500"
				href="https://github.com/caidanw/skyshot"
				target="_blank"
			>
				<span>github</span>
			</a>
		</p>
	</footer>
</div>
