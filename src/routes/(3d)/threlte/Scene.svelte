<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import { interactivity, OrbitControls } from "@threlte/extras";
	import type { Mesh, Texture } from "three";

	const { cardTexture }: { cardTexture?: Texture } = $props();

	interactivity();

	const config = {
		cardWidth: 2.5,
		cardHeight: 3.5,
		cardDepth: 0.05,
		cardColor: 0x2196f3,
		edgeColor: 0x1565c0,
		wobbleSpeed: 0.8,
		wobbleAmount: 0.08,
		floatSpeed: 0.4,
		floatAmount: 0.6,
		mouseInfluence: 0.5,
		interactionDuration: 0, // milliseconds
		wobbleDuringInteractionAmount: 0.2, // Amount of wobble during interaction
		glossiness: 0.9, // High glossiness for that shiny look
		reflectivity: 0.7, // Medium-high reflectivity
		envMapIntensity: 1.2, // Slightly boosted environment map for more pronounced reflections
	};

	// const scale = new Spring(2);

	let card: Mesh = $state()!;

	let float = 0;
	useTask("floatAnimation", (delta) => {
		float += delta;
		// console.log("float", float);

		// Floating movement with configurable speed and amount
		card.position.y =
			Math.sin(float * config.floatSpeed) * config.floatAmount;
		// console.log("card.position.y", card.position.y);
	});

	let wobble = 0;
	useTask("wobbleAnimation", (delta) => {
		wobble += delta;

		// Wobble effect with configurable speed and amount
		card.rotation.x =
			Math.cos(wobble * config.wobbleSpeed) * config.wobbleAmount;
		card.rotation.y =
			Math.sin(wobble * config.wobbleSpeed) * config.wobbleAmount;
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10.5]}>
	<OrbitControls enableDamping enablePan={false} rotateSpeed={2} />
	<!-- <TrackballControls rotateSpeed={3} /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[1, 2, 6]} intensity={1.2} />
<T.DirectionalLight position={[-3, 0, 8]} intensity={0.7} />
<T.DirectionalLight position={[0, 2, -5]} intensity={0.8} />
<T.PointLight position={[2, 1, 6]} distance={10} />

<T.Mesh bind:ref={card} scale={1}>
	<!-- <RoundedBoxGeometry args={[2.5, 3.5, 0.08]} /> -->
	<T.BoxGeometry args={[5, 7, 0.08]} />

	<T.MeshPhysicalMaterial
		map={cardTexture}
		metalness={0.1}
		roughness={1 - config.glossiness}
		clearcoat={0.8}
		clearcoatRoughness={0.2}
		reflectivity={config.reflectivity * 0.9}
		envMapIntensity={config.envMapIntensity * 0.8}
		ior={1.4}
	/>

	<!-- Use a normap map texture for the card surface material -->
	<!-- {#await useTexture("/textures/white-plain-paper/white-plain-paper_normal-ogl.png")} -->
	<!-- 	<T.MeshStandardMaterial color="black" /> -->
	<!-- {:then normalMapTexture} -->
	<!-- 	<T.MeshPhysicalMaterial -->
	<!-- 		map={cardTexture} -->
	<!-- 		normalMap={normalMapTexture} -->
	<!-- 		metalness={0.1} -->
	<!-- 		roughness={1 - config.glossiness} -->
	<!-- 		clearcoat={0.8} -->
	<!-- 		clearcoatRoughness={0.2} -->
	<!-- 		reflectivity={config.reflectivity * 0.9} -->
	<!-- 		envMapIntensity={config.envMapIntensity * 0.8} -->
	<!-- 		ior={1.4} -->
	<!-- 	/> -->
	<!-- {/await} -->
</T.Mesh>
