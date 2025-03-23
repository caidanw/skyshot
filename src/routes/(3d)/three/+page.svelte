<script lang="ts">
	import type { Action } from "svelte/action";
	import * as THREE from "three";

	// Custom action for creating a floating card
	const floatingCard: Action = (node, options = {}) => {
		// Default options
		const config = {
			cardWidth: 2,
			cardHeight: 3,
			cardDepth: 0.05,
			cardColor: 0x2196f3,
			edgeColor: 0x1565c0,
			wobbleSpeed: 0.8,
			wobbleAmount: 0.08,
			floatSpeed: 0.5,
			floatAmount: 0.1,
			...options,
		};

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
		node.appendChild(renderer.domElement);

		// Add ambient light
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		// Add directional light for shadows
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(5, 5, 5);
		scene.add(directionalLight);

		// Create card geometry
		const geometry = new THREE.BoxGeometry(
			config.cardWidth,
			config.cardHeight,
			config.cardDepth,
		);

		// Create materials for the card
		const frontMaterial = new THREE.MeshStandardMaterial({
			color: config.cardColor,
			metalness: 0.3,
			roughness: 0.4,
		});

		const edgeMaterial = new THREE.MeshStandardMaterial({
			color: config.edgeColor,
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
		let animationFrame;

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
			animationFrame = requestAnimationFrame(animate);

			time += 0.01;

			// Wobble rotation
			card.rotation.x =
				Math.sin(time * config.wobbleSpeed) * config.wobbleAmount;
			card.rotation.y =
				Math.sin(time * config.wobbleSpeed * 1.3) * config.wobbleAmount;

			// Floating movement
			card.position.y =
				Math.sin(time * config.floatSpeed) * config.floatAmount;

			renderer.render(scene, camera);
		};

		animate();

		return {
			update(newOptions) {
				// Update options if they change
				Object.assign(config, newOptions);
			},
			destroy() {
				// Clean up resources when component is destroyed
				cancelAnimationFrame(animationFrame);
				window.removeEventListener("resize", handleResize);
				node.removeChild(renderer.domElement);
				geometry.dispose();
				frontMaterial.dispose();
				edgeMaterial.dispose();
				renderer.dispose();
			},
		};
	};
</script>

<!-- Example usage with Svelte 5 syntax -->
<div
	use:floatingCard={{
		cardColor: 0x3f51b5,
		wobbleAmount: 0.1,
		floatAmount: 0.15,
	}}
	class="full-screen-container"
></div>

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
