<script lang="ts">
	import { floatingCard } from "./floatingCardAction";
</script>

<div use:floatingCard class="card-container"></div>

<style>
	.card-container {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
