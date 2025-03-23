<script lang="ts">
	import { floatingCard } from "./floatingCardAction.svelte";
</script>

<div use:floatingCard class="card-container flex-grow"></div>

<style>
	.card-container {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
