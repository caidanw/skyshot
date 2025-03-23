<script lang="ts">
	import * as THREE from "three";
	import { floatingCard } from "./floatingCardAction";
</script>

<!-- Usage -->
<div use:floatingCard class="card-container"></div>

<style>
	.card-container {
		width: 100%;
		height: 100%;
		cursor: pointer;
	}
</style>
