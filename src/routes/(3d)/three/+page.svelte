<script lang="ts">
	import * as THREE from "three";
	import { floatingCard } from "./floatingCardAction";
</script>

<!-- Usage -->
<div use:floatingCard class="card-container"></div>

<style>
	.card-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
