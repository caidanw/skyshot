<script lang="ts">
	import { dev } from "$app/environment";
	import { T, useTask } from "@threlte/core";
	import {
		interactivity,
		OrbitControls,
		RoundedBoxGeometry,
		useTexture,
	} from "@threlte/extras";
	import type { Mesh, PointLight } from "three";
	import { Pane } from "tweakpane";

	interactivity();

	// const imageTextureUrl =
	// 	"https://placehold.co/800?text=placeholder\\nimage&font=roboto";
	const imageTextureUrl =
		"https://placehold.co/500x700?text=placeholder\\nimage&font=roboto";

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

	// useTask("rotateAnimation", (delta) => {
	// 	card.rotation.y += delta * 0.3;
	// });

	// const idleTask = useTask("idle", (delta) => {
	// 	// wobble-effect
	// 	// bounce effect
	// });

	$effect(() => {
		return;
		if (!dev) return;

		const mainElem = document.querySelector("main");
		if (!mainElem) {
			console.error("target element for tweakpane not found");
			return;
		}

		const elem = mainElem.appendChild(document.createElement("div"));
		elem.style.position = "absolute";
		elem.style.right = "0";

		const pane = new Pane({
			container: elem,
			title: "Scene Config",
		});
		// pane.addBinding(card, "position");

		return () => {
			mainElem.removeChild(elem);
			pane.dispose();
		};
	});
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 10]}>
	<OrbitControls enableDamping enablePan={false} rotateSpeed={2} />
	<!-- <TrackballControls rotateSpeed={3} /> -->
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[1, 2, 4]} intensity={1.2} />
<T.DirectionalLight position={[-5, 0, 2]} intensity={0.7} color={0xfafafa} />
<T.DirectionalLight position={[0, 2, -5]} intensity={0.8} />
<T.PointLight position={[2, 1, 3]} distance={10} />

<T.Mesh bind:ref={card} scale={1.5}>
	<RoundedBoxGeometry args={[2.5, 3.5, 0.08]} />
	<!-- <T.BoxGeometry args={[2.5, 3.5, 0.08]} /> -->

	{#await useTexture(imageTextureUrl)}
		<T.MeshStandardMaterial color="black" />
	{:then texture}
		<T.MeshPhysicalMaterial
			map={texture}
			metalness={0.1}
			roughness={1 - config.glossiness}
			clearcoat={0.8}
			clearcoatRoughness={0.2}
			reflectivity={config.reflectivity * 0.9}
			envMapIntensity={config.envMapIntensity * 0.8}
			ior={1.4}
		/>
	{/await}
</T.Mesh>
