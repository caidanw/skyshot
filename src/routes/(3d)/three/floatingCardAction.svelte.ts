import * as THREE from "three";

interface CardOptions {
  cardWidth?: number;
  cardHeight?: number;
  cardDepth?: number;
  cardColor?: number;
  edgeColor?: number;
  wobbleSpeed?: number;
  wobbleAmount?: number;
  floatSpeed?: number;
  floatAmount?: number;
  mouseInfluence?: number;
  interactionDuration?: number;
  wobbleDuringInteractionAmount?: number;
  glossiness?: number; // New option for controlling glossiness
  reflectivity?: number; // New option for controlling reflectivity
  envMapIntensity?: number; // New option for controlling environment map intensity
}

export function floatingCard(node: HTMLElement, options: CardOptions = {}) {
  // Configuration with reasonable defaults
  const config = {
    cardWidth: 2.5,
    cardHeight: 3.5,
    cardDepth: 0.05,
    cardColor: 0x2196f3,
    edgeColor: 0x1565c0,
    wobbleSpeed: 0.8,
    wobbleAmount: 0.08,
    floatSpeed: 0.5,
    floatAmount: 0.1,
    mouseInfluence: 0.5,
    interactionDuration: 0, // milliseconds
    wobbleDuringInteractionAmount: 0.2, // Amount of wobble during interaction
    glossiness: 0.9, // High glossiness for that shiny look
    reflectivity: 0.7, // Medium-high reflectivity
    envMapIntensity: 1.2, // Slightly boosted environment map for more pronounced reflections
    ...options,
  };

  let nodeSize = node.getBoundingClientRect();

  // Setup renderer with physically correct lighting
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  // renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(nodeSize.width, nodeSize.height);
  renderer.setClearColor(0x000000, 0);
  // Using toneMapping for better visual quality
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2; // Slightly brighter exposure
  node.appendChild(renderer.domElement);

  // Setup scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    // window.innerWidth / window.innerHeight,
    nodeSize.width / nodeSize.height,
    0.1,
    1000,
  );
  camera.position.z = 3.2;

  // Create environment map for realistic reflections
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
  cubeRenderTarget.texture.type = THREE.HalfFloatType;

  // Create a simple environment for reflections
  const gradientTexture = new THREE.CubeTextureLoader().load([
    createGradientDataURL(0xd0e0f0, 0x87ceeb), // right
    createGradientDataURL(0xd0e0f0, 0x87ceeb), // left
    createGradientDataURL(0xffffff, 0xd0e0f0), // top
    createGradientDataURL(0x87ceeb, 0x4682b4), // bottom
    createGradientDataURL(0xd0e0f0, 0x87ceeb), // front
    createGradientDataURL(0xd0e0f0, 0x87ceeb), // back
  ]);
  scene.environment = gradientTexture;

  // Enhanced lighting setup
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  // Main directional light (simulates sun/main light source)
  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
  mainLight.position.set(2, 2, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);

  // Fill light (reduces harsh shadows)
  const fillLight = new THREE.DirectionalLight(0xfafafa, 0.7);
  fillLight.position.set(-5, 0, 2);
  scene.add(fillLight);

  // Rim light (creates highlight on edges)
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
  rimLight.position.set(0, 2, -5);
  scene.add(rimLight);

  // Add a soft point light for specular highlights
  const highlightLight = new THREE.PointLight(0xffffff, 1, 10);
  highlightLight.position.set(2, 1, 3);
  scene.add(highlightLight);

  // Create card with configurable dimensions
  const geometry = new THREE.BoxGeometry(
    config.cardWidth,
    config.cardHeight,
    config.cardDepth,
  );

  // Enhanced materials for glossy appearance
  const frontMaterial = new THREE.MeshPhysicalMaterial({
    color: config.cardColor,
    metalness: 0.1, // Lower metalness for plastic/glass look
    roughness: 1 - config.glossiness, // Inverse of glossiness
    clearcoat: 1.0, // Add clearcoat for that glossy finish
    clearcoatRoughness: 0.1, // Make clearcoat smooth
    reflectivity: config.reflectivity,
    envMapIntensity: config.envMapIntensity,
    ior: 1.5, // Index of refraction similar to glass/plastic
  });

  const edgeMaterial = new THREE.MeshPhysicalMaterial({
    color: config.edgeColor,
    metalness: 0.2,
    roughness: 0.2, // Smoother edges
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    reflectivity: config.reflectivity * 0.9,
    envMapIntensity: config.envMapIntensity * 0.8,
    ior: 1.4,
  });

  const materials = [
    edgeMaterial, // right
    edgeMaterial, // left
    edgeMaterial, // top
    edgeMaterial, // bottom
    frontMaterial, // front
    frontMaterial, // back
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
  }

  function endInteraction(event: MouseEvent | TouchEvent) {
    // Reset timer
    if (interactionTimer) clearTimeout(interactionTimer);
    interactionTimer = setTimeout(
      () => (isInteracting = false),
      config.interactionDuration,
    );
  }

  // Update rotation based on pointer position with inverted vertical response
  function updateRotation(x: number, y: number) {
    const rect = node.getBoundingClientRect();

    // Convert to normalized coordinates (-1 to 1)
    const normalizedX = ((x - rect.left) / rect.width) * 2 - 1;
    const normalizedY = -(((y - rect.top) / rect.height) * 2 - 1);

    // Set target rotation - inverse the Y rotation to push the card away from mouse
    targetRotationY = normalizedX * config.mouseInfluence;

    // Invert the X rotation so mouse at top pushes top of card back (and bottom for bottom)
    targetRotationX = -normalizedY * config.mouseInfluence;
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
    nodeSize = node.getBoundingClientRect();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(nodeSize.width, nodeSize.height);
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.aspect = nodeSize.width / nodeSize.height;
    camera.updateProjectionMatrix();
  }

  // Add event listeners
  node.addEventListener("mousedown", startInteraction);
  node.addEventListener("touchstart", startInteraction, { passive: false });
  node.addEventListener("mouseup", endInteraction);
  node.addEventListener("touchend", endInteraction);
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("touchmove", handleMove, { passive: true });
  window.addEventListener("resize", handleResize);

  // Animation loop
  let frameId: number;
  let lastTime = 0;

  function animate(time: number) {
    frameId = requestAnimationFrame(animate);
    // const deltaTime = time - lastTime;
    lastTime = time;

    // Normalized time for animations
    const normalizedTime = time / 700;

    // Auto animation values with configurable speed and amount
    const autoX =
      Math.cos(normalizedTime * config.wobbleSpeed) * config.wobbleAmount;
    const autoY =
      Math.sin(normalizedTime * config.wobbleSpeed * 1.3) * config.wobbleAmount;

    // Smooth transition to target rotation
    currentRotationX += (targetRotationX - currentRotationX) * 0.1;
    currentRotationY += (targetRotationY - currentRotationY) * 0.1;

    // Set rotation (blend between auto and interactive)
    card.rotation.x = isInteracting
      ? currentRotationX + autoX * config.wobbleDuringInteractionAmount
      : autoX;
    card.rotation.y = isInteracting
      ? currentRotationY + autoY * config.wobbleDuringInteractionAmount
      : autoY;

    // Floating movement with configurable speed and amount
    card.position.y =
      Math.sin(normalizedTime * config.floatSpeed) * config.floatAmount;

    // Move highlight light in a slow circular pattern for dynamic reflections
    highlightLight.position.x = 2 + Math.sin(normalizedTime * 0.2) * 1;
    highlightLight.position.z = 3 + Math.cos(normalizedTime * 0.15) * 1;

    renderer.render(scene, camera);
  }

  // Helper function to create gradient data URLs for the environment map
  function createGradientDataURL(
    colorTop: number,
    colorBottom: number,
  ): string {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 64);
      gradient.addColorStop(0, "#" + colorTop.toString(16).padStart(6, "0"));
      gradient.addColorStop(1, "#" + colorBottom.toString(16).padStart(6, "0"));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    return canvas.toDataURL();
  }

  animate(0);

  return {
    update(newOptions: CardOptions) {
      Object.assign(config, newOptions);

      if (newOptions.cardColor !== undefined) {
        frontMaterial.color.set(config.cardColor);
      }

      if (newOptions.edgeColor !== undefined) {
        edgeMaterial.color.set(config.edgeColor);
      }

      if (newOptions.glossiness !== undefined) {
        frontMaterial.roughness = 1 - config.glossiness;
        edgeMaterial.roughness = Math.max(0.1, 1 - config.glossiness);
      }

      if (newOptions.reflectivity !== undefined) {
        frontMaterial.reflectivity = config.reflectivity;
        edgeMaterial.reflectivity = config.reflectivity * 0.9;
      }

      if (newOptions.envMapIntensity !== undefined) {
        frontMaterial.envMapIntensity = config.envMapIntensity;
        edgeMaterial.envMapIntensity = config.envMapIntensity * 0.8;
      }
    },
    destroy() {
      // Clean up
      cancelAnimationFrame(frameId);

      // Remove event listeners
      node.removeEventListener("mousedown", startInteraction);
      node.removeEventListener("touchstart", startInteraction);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      node.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);

      if (interactionTimer) clearTimeout(interactionTimer);

      // Dispose Three.js resources
      node.removeChild(renderer.domElement);
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      gradientTexture.dispose();
      cubeRenderTarget.dispose();
      renderer.dispose();
    },
  };
}
