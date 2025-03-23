<script>
	import { onMount } from "svelte";
	import * as THREE from "three";

	let container;

	onMount(() => {
		// Set up scene
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);
		container.appendChild(renderer.domElement);

		// Add ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		// Add directional light for shadows
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Create card geometry
		const cardWidth = 2;
		const cardHeight = 3;
		const cardDepth = 0.05;
		const geometry = new THREE.BoxGeometry(
			cardWidth,
			cardHeight,
			cardDepth,
		);

		// Create materials for the card
		const frontMaterial = new THREE.MeshStandardMaterial({
			color: 0x2196f3,
			metalness: 0.3,
			roughness: 0.4,
		});

		const edgeMaterial = new THREE.MeshStandardMaterial({
			color: 0x1565c0,
			metalness: 0.5,
			roughness: 0.2,
		});

		const materials = [
			edgeMaterial, // right side
			edgeMaterial, // left side
			edgeMaterial, // top side
			edgeMaterial, // bottom side
			frontMaterial, // front side
			frontMaterial, // back side
		];

		// Create the card mesh
		const card = new THREE.Mesh(geometry, materials);
		scene.add(card);

		// Position camera
		camera.position.z = 5;

		// Animation variables
		let time = 0;
		const wobbleSpeed = 0.8;
		const wobbleAmount = 0.08;
		const floatSpeed = 0.5;
		const floatAmount = 0.1;

		// Handle window resize
		const handleResize = () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		};

		window.addEventListener("resize", handleResize);

		// Animation loop
		const animate = () => {
			requestAnimationFrame(animate);

			time += 0.01;

			// Wobble rotation
			card.rotation.x = Math.sin(time * wobbleSpeed) * wobbleAmount;
			card.rotation.y = Math.sin(time * wobbleSpeed * 1.3) * wobbleAmount;

			// Floating movement
			card.position.y = Math.sin(time * floatSpeed) * floatAmount;

			renderer.render(scene, camera);
		};

		animate();

		return () => {
			window.removeEventListener("resize", handleResize);
			container.removeChild(renderer.domElement);
			geometry.dispose();
			frontMaterial.dispose();
			edgeMaterial.dispose();
			renderer.dispose();
		};
	});
</script>

<div bind:this={container} class="full-screen-container"></div>

<style>
	.full-screen-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>
