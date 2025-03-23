<script lang="ts">
	import * as THREE from "three";

	// Simplified options interface
	interface CardOptions {
		color?: number;
		edgeColor?: number;
		wobble?: number;
		float?: number;
		mouseResponse?: number;
	}

	// Simplified floating card action
	function floatingCard(node: HTMLElement, options: CardOptions = {}) {
		// Simplified config with fewer options
		const config = {
			color: 0x2196f3,
			edgeColor: 0x1565c0,
			wobble: 0.08,
			float: 0.1,
			mouseResponse: 0.5,
			...options,
		};

		// Setup renderer
		const renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setClearColor(0x000000, 0);
		node.appendChild(renderer.domElement);

		// Setup scene and camera
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000,
		);
		camera.position.z = 5;

		// Lighting
		scene.add(new THREE.AmbientLight(0xffffff, 0.2));
		const light = new THREE.DirectionalLight(0xffffff, 2);
		light.position.set(5, 5, 5);
		scene.add(light);

		// Create card
		const geometry = new THREE.BoxGeometry(2.5, 3.5, 0.05);
		const materials = [
			new THREE.MeshStandardMaterial({
				color: config.edgeColor,
				metalness: 0.5,
				roughness: 0.0,
			}), // sides
			new THREE.MeshStandardMaterial({
				color: config.edgeColor,
				metalness: 0.5,
				roughness: 0.2,
			}),
			new THREE.MeshStandardMaterial({
				color: config.edgeColor,
				metalness: 0.5,
				roughness: 0.2,
			}),
			new THREE.MeshStandardMaterial({
				color: config.edgeColor,
				metalness: 0.5,
				roughness: 0.2,
			}),
			new THREE.MeshStandardMaterial({
				color: config.color,
				metalness: 0.3,
				roughness: 0.4,
			}), // front/back
			new THREE.MeshStandardMaterial({
				color: config.color,
				metalness: 0.3,
				roughness: 0.4,
			}),
		];
		const card = new THREE.Mesh(geometry, materials);
		scene.add(card);

		// State tracking variables
		let isInteracting = false;
		let targetRotationX = 0,
			targetRotationY = 0;
		let currentRotationX = 0,
			currentRotationY = 0;
		let interactionTimer: number | null = null;

		// Handle interaction start
		function startInteraction(event: MouseEvent | TouchEvent) {
			isInteracting = true;

			// Get pointer position
			const pos =
				event instanceof MouseEvent
					? { x: event.clientX, y: event.clientY }
					: {
							x: event.touches[0].clientX,
							y: event.touches[0].clientY,
						};

			updateRotation(pos.x, pos.y);

			// Reset timer
			if (interactionTimer) clearTimeout(interactionTimer);
			interactionTimer = setTimeout(() => (isInteracting = false), 5000);

			// event.preventDefault();
		}

		// Update rotation based on pointer position
		function updateRotation(x: number, y: number) {
			const rect = node.getBoundingClientRect();

			// Convert to normalized coordinates (-1 to 1)
			const normalizedX = ((x - rect.left) / rect.width) * 2 - 1;
			const normalizedY = -(((y - rect.top) / rect.height) * 2 - 1);

			// Set target rotation
			targetRotationY = normalizedX * config.mouseResponse;
			targetRotationX = normalizedY * config.mouseResponse;
		}

		// Handle pointer move
		function handleMove(event: MouseEvent | TouchEvent) {
			if (!isInteracting) return;

			const pos =
				event instanceof MouseEvent
					? { x: event.clientX, y: event.clientY }
					: {
							x: event.touches[0].clientX,
							y: event.touches[0].clientY,
						};

			updateRotation(pos.x, pos.y);
		}

		// Handle window resize
		function handleResize() {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
		}

		// Add event listeners
		node.addEventListener("mousedown", startInteraction);
		node.addEventListener("touchstart", startInteraction, {
			passive: false,
		});
		window.addEventListener("mousemove", handleMove);
		window.addEventListener("touchmove", handleMove, { passive: true });
		window.addEventListener("resize", handleResize);

		// Animation loop
		let frameId: number;

		function animate(time: number) {
			frameId = requestAnimationFrame(animate);
			time *= 0.001;

			// Auto animation values
			const autoX = Math.cos(time * 0.8) * config.wobble;
			const autoY = Math.sin(time * 1.2) * config.wobble;

			// Smooth transition to target rotation
			currentRotationX += (targetRotationX - currentRotationX) * 0.1;
			currentRotationY += (targetRotationY - currentRotationY) * 0.1;

			// Set rotation (blend between auto and interactive)
			card.rotation.x = isInteracting ? currentRotationX : autoX;
			card.rotation.y = isInteracting ? currentRotationY : autoY;

			// Floating movement
			card.position.y = Math.sin(time * 0.5) * config.float;

			renderer.render(scene, camera);

			console.log(isInteracting);
		}

		animate(0);

		return {
			update(newOptions: CardOptions) {
				Object.assign(config, newOptions);
			},
			destroy() {
				// Clean up
				cancelAnimationFrame(frameId);

				// Remove event listeners
				node.removeEventListener("mousedown", startInteraction);
				node.removeEventListener("touchstart", startInteraction);
				window.removeEventListener("mousemove", handleMove);
				window.removeEventListener("touchmove", handleMove);
				window.removeEventListener("resize", handleResize);

				if (interactionTimer) clearTimeout(interactionTimer);

				// Dispose Three.js resources
				node.removeChild(renderer.domElement);
				geometry.dispose();
				materials.forEach((m) => m.dispose());
				renderer.dispose();
			},
		};
	}
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
	}
</style>
