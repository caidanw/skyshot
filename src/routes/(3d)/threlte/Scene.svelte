<script lang="ts">
	import { T, useTask } from "@threlte/core";
	import {
		interactivity,
		OrbitControls,
		RoundedBoxGeometry,
		useTexture,
	} from "@threlte/extras";
	import { Mesh } from "three";

	interactivity();

	const imageTextureUrl =
		"https://placehold.co/800?text=placeholder\\nimage&font=roboto";

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

	let card: Mesh;

	let float = 0;
	useTask("floatAnimation", (delta) => {
		float += delta;
		console.log("float", float);

		// Floating movement with configurable speed and amount
		card.position.y = Math.sin(float * config.floatSpeed);
		card.position.y *= config.floatAmount;
		console.log("card.position.y", card.position.y);
	});

	useTask("rotateAnimation", (delta) => {
		card.rotation.y += delta * 0.3;
	});

	// const idleTask = useTask("idle", (delta) => {
	// 	// wobble-effect
	// 	// bounce effect
	// });
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]}>
	<OrbitControls enableDamping enablePan={false} />
	<!-- <TrackballControls rotateSpeed={3} /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh bind:ref={card} scale={1.5}>
	<RoundedBoxGeometry args={[2.5, 3.5, 0.08]} creaseAngle={0.8} />
	<!-- <T.BoxGeometry args={[2.5, 3.5, 0.08]} /> -->

	{#await useTexture(imageTextureUrl)}
		<T.MeshStandardMaterial color="black" />
	{:then texture}
		<T.MeshStandardMaterial map={texture} />
	{/await}
</T.Mesh>
