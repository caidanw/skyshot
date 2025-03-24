<script>
	import { T, useTask } from "@threlte/core";
	import { interactivity, useTexture } from "@threlte/extras";
	import { Spring } from "svelte/motion";

	interactivity();

	const imageTextureUrl =
		"https://placehold.co/800?text=placeholder\\nimage&font=roboto";

	const scale = new Spring(2);

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});

	const idleTask = useTask("idle", (delta) => {
		// wobble-effect
		// bounce effect
	});
</script>

<T.PerspectiveCamera
	makeDefault
	fov={50}
	position={[5, 5, 10]}
	oncreate={(ref) => {
		ref.lookAt(0, 1, 0);
	}}
/>

<T.AmbientLight intensity={0.5} />
<T.DirectionalLight position={[0, 10, 10]} />

<T.Mesh
	rotation.y={rotation}
	position.y={1}
	scale={scale.current}
	onpointerenter={() => {}}
	onpointerleave={() => {}}
>
	<T.BoxGeometry args={[2.5, 3.5, 0.08]} />

	{#await useTexture(imageTextureUrl)}
		<T.MeshStandardMaterial color="black" />
	{:then texture}
		<T.MeshStandardMaterial map={texture} />
	{/await}
</T.Mesh>
