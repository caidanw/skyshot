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

	<slot />
</div>
