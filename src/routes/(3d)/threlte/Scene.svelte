<script>
	import { T, useTask } from "@threlte/core";
	import {
		interactivity,
		OrbitControls,
		RoundedBoxGeometry,
		useTexture,
	} from "@threlte/extras";
	import { Spring } from "svelte/motion";

	interactivity();

	const imageTextureUrl =
		"https://placehold.co/800?text=placeholder\\nimage&font=roboto";

	const scale = new Spring(2);

	// let rotation = 0;
	// useTask((delta) => {
	// 	rotation += delta;
	// });

	// const idleTask = useTask("idle", (delta) => {
	// 	// wobble-effect
	// 	// bounce effect
	// });
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 5, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh
	scale={scale.current}
	onpointerenter={() => {}}
	onpointerleave={() => {}}
>
	<RoundedBoxGeometry args={[2.5, 3.5, 0.08]} creaseAngle={0.8} />
	<!-- <T.BoxGeometry args={[2.5, 3.5, 0.08]} /> -->

	{#await useTexture(imageTextureUrl)}
		<T.MeshStandardMaterial color="black" />
	{:then texture}
		<T.MeshStandardMaterial map={texture} />
	{/await}
</T.Mesh>
