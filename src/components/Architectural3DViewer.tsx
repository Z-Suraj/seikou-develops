import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  RotateCw,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronUp,
  Building2,
  Sparkles,
  Info
} from 'lucide-react';

export const Architectural3DViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [is3DSupported, setIs3DSupported] = useState(true);
  const [viewMode, setViewMode] = useState<'luxury' | 'solid' | 'blueprint'>('luxury');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);

  // References for Three.js instance
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const lightsRef = useRef<{
    keyLight: THREE.DirectionalLight;
    rimLight: THREE.DirectionalLight;
    ambientLight: THREE.AmbientLight;
    hemiLight: THREE.HemisphereLight;
  } | null>(null);

  // Mesh classifications for dynamic mode switching
  const classifiedMeshesRef = useRef<{
    plinth: THREE.Mesh[];
    framing: THREE.Mesh[];
    glass: THREE.Mesh[];
    core: THREE.Mesh[];
    louvers: THREE.Mesh[];
    crown: THREE.Mesh[];
  }>({
    plinth: [],
    framing: [],
    glass: [],
    core: [],
    louvers: [],
    crown: [],
  });

  // Apply visualization mode styles across all scene elements
  const applyViewMode = useCallback((mode: 'luxury' | 'solid' | 'blueprint') => {
    setViewMode(mode);
    const scene = sceneRef.current;
    const grid = gridHelperRef.current;
    const lights = lightsRef.current;
    const classified = classifiedMeshesRef.current;
    if (!scene) return;

    if (mode === 'blueprint') {
      // BLUEPRINT MODE: Technical architectural wireframe with luminous cyan & gold edges
      scene.background = new THREE.Color(0x041022);
      scene.fog = new THREE.FogExp2(0x041022, 0.02);

      if (grid) {
        grid.material = new THREE.LineBasicMaterial({
          color: 0x00e5ff,
          transparent: true,
          opacity: 0.35,
        });
      }

      if (lights) {
        lights.keyLight.color.setHex(0x00e5ff);
        lights.keyLight.intensity = 1.6;
        lights.rimLight.color.setHex(0xd4af37);
        lights.rimLight.intensity = 1.2;
        lights.ambientLight.color.setHex(0x042038);
        lights.ambientLight.intensity = 0.8;
        lights.hemiLight.color.setHex(0x00e5ff);
        lights.hemiLight.groundColor.setHex(0x020a14);
      }

      const wireframeCyan = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        wireframe: true,
      });
      const wireframeGold = new THREE.MeshBasicMaterial({
        color: 0xd4af37,
        wireframe: true,
      });
      const wireframeNavy = new THREE.MeshBasicMaterial({
        color: 0x0088cc,
        wireframe: true,
      });

      classified.plinth.forEach((m) => (m.material = wireframeNavy));
      classified.framing.forEach((m) => (m.material = wireframeCyan));
      classified.louvers.forEach((m) => (m.material = wireframeCyan));
      classified.glass.forEach((m) => (m.material = wireframeGold));
      classified.core.forEach((m) => (m.material = wireframeGold));
      classified.crown.forEach((m) => (m.material = wireframeCyan));
    } else if (mode === 'solid') {
      // SOLID MODE: Natural architectural daylight with warm travertine, dark steel & clear glass
      scene.background = new THREE.Color(0x16181a);
      scene.fog = new THREE.FogExp2(0x16181a, 0.018);

      if (grid) {
        grid.material = new THREE.LineBasicMaterial({
          color: 0x555555,
          transparent: true,
          opacity: 0.3,
        });
      }

      if (lights) {
        lights.keyLight.color.setHex(0xffffff);
        lights.keyLight.intensity = 2.4;
        lights.rimLight.color.setHex(0xd0d4d8);
        lights.rimLight.intensity = 1.4;
        lights.ambientLight.color.setHex(0xffffff);
        lights.ambientLight.intensity = 0.6;
        lights.hemiLight.color.setHex(0xe8edf2);
        lights.hemiLight.groundColor.setHex(0x1c1e20);
      }

      const solidTravertine = new THREE.MeshStandardMaterial({
        color: 0xd8d4cc,
        roughness: 0.5,
        metalness: 0.05,
      });
      const solidSteel = new THREE.MeshStandardMaterial({
        color: 0x222428,
        roughness: 0.35,
        metalness: 0.75,
      });
      const solidGlass = new THREE.MeshStandardMaterial({
        color: 0x8ab8d0,
        roughness: 0.08,
        metalness: 0.15,
        transparent: true,
        opacity: 0.5,
      });
      const solidCore = new THREE.MeshStandardMaterial({
        color: 0xe6e2da,
        roughness: 0.4,
      });

      classified.plinth.forEach((m) => (m.material = solidTravertine));
      classified.framing.forEach((m) => (m.material = solidSteel));
      classified.louvers.forEach((m) => (m.material = solidSteel));
      classified.glass.forEach((m) => (m.material = solidGlass));
      classified.core.forEach((m) => (m.material = solidCore));
      classified.crown.forEach((m) => (m.material = solidSteel));
    } else {
      // LUXURY MODE: Black and gold luxury corporate aesthetic with champagne gold & glowing core
      scene.background = new THREE.Color(0x0e0e11);
      scene.fog = new THREE.FogExp2(0x0e0e11, 0.018);

      if (grid) {
        grid.material = new THREE.LineBasicMaterial({
          color: 0xd4af37,
          transparent: true,
          opacity: 0.35,
        });
      }

      if (lights) {
        lights.keyLight.color.setHex(0xfffaea);
        lights.keyLight.intensity = 2.5;
        lights.rimLight.color.setHex(0xd4af37);
        lights.rimLight.intensity = 2.0;
        lights.ambientLight.color.setHex(0xfff0d0);
        lights.ambientLight.intensity = 0.5;
        lights.hemiLight.color.setHex(0xffe7b3);
        lights.hemiLight.groundColor.setHex(0x0a0c10);
      }

      const matLuxuryGold = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.85,
        roughness: 0.2,
      });
      const matLuxuryGranite = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        metalness: 0.3,
        roughness: 0.4,
      });
      const matLuxuryGlass = new THREE.MeshStandardMaterial({
        color: 0xc4a366,
        metalness: 0.2,
        roughness: 0.08,
        transparent: true,
        opacity: 0.55,
      });
      const matLuxuryCore = new THREE.MeshStandardMaterial({
        color: 0xffe29a,
        emissive: 0xd4af37,
        emissiveIntensity: 0.55,
        roughness: 0.25,
      });

      classified.plinth.forEach((m) => (m.material = matLuxuryGranite));
      classified.framing.forEach((m) => (m.material = matLuxuryGold));
      classified.louvers.forEach((m) => (m.material = matLuxuryGold));
      classified.glass.forEach((m) => (m.material = matLuxuryGlass));
      classified.core.forEach((m) => (m.material = matLuxuryCore));
      classified.crown.forEach((m) => (m.material = matLuxuryGold));
    }
  }, []);

  // Main Three.js Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed, switching to high-fidelity fallback', e);
      setIs3DSupported(false);
      return;
    }

    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Apply canvas styles so it sits flush within absolute mount container
    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.touchAction = 'none';
    canvas.style.outline = 'none';

    // Clear any previous child before attaching
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(canvas);

    // Initial container measurements
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0e0e11);
    scene.fog = new THREE.FogExp2(0x0e0e11, 0.018);

    // 2. Camera Setup (Centered on Pavilion Elevation)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(16, 12, 18);
    camera.lookAt(0, 5.0, 0);
    cameraRef.current = camera;

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 3. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 5.0, 0);
    controls.minDistance = 8;
    controls.maxDistance = 45;
    controls.minPolarAngle = Math.PI / 10;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.0;
    controls.update();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff0d0, 0.5);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffe7b3, 0x0a0c10, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaea, 2.5);
    keyLight.position.set(16, 22, 14);
    keyLight.target.position.set(0, 5.0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 2.0);
    rimLight.position.set(-16, 14, -14);
    rimLight.target.position.set(0, 5.0, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);

    lightsRef.current = { keyLight, rimLight, ambientLight, hemiLight };

    // 5. Architectural Ground Grid
    const gridHelper = new THREE.GridHelper(24, 24, 0xd4af37, 0x333333);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);
    gridHelperRef.current = gridHelper;

    // 6. Build High-Fidelity Procedural Architectural Pavilion
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Reset mesh classifications
    const classified = classifiedMeshesRef.current;
    classified.plinth = [];
    classified.framing = [];
    classified.glass = [];
    classified.core = [];
    classified.louvers = [];
    classified.crown = [];

    // Temporary materials for construction (overwritten immediately by applyViewMode)
    const tempMat = new THREE.MeshStandardMaterial({ color: 0x888888 });

    // A. Foundation Plinth & Reflective Basin
    const basinGeo = new THREE.BoxGeometry(16, 0.15, 16);
    const basinMesh = new THREE.Mesh(basinGeo, tempMat);
    basinMesh.position.y = 0.075;
    modelGroup.add(basinMesh);
    classified.plinth.push(basinMesh);

    const plinthGeo = new THREE.BoxGeometry(13.5, 0.45, 13.5);
    const plinthMesh = new THREE.Mesh(plinthGeo, tempMat);
    plinthMesh.position.y = 0.35;
    modelGroup.add(plinthMesh);
    classified.plinth.push(plinthMesh);

    const plinthRimGeo = new THREE.BoxGeometry(13.7, 0.08, 13.7);
    const plinthRimMesh = new THREE.Mesh(plinthRimGeo, tempMat);
    plinthRimMesh.position.y = 0.6;
    modelGroup.add(plinthRimMesh);
    classified.framing.push(plinthRimMesh);

    // B. Tier 1: Grand Entrance Lobby (Ground + First Floor)
    const lobbyGlassGeo = new THREE.BoxGeometry(9.0, 2.6, 9.0);
    const lobbyGlassMesh = new THREE.Mesh(lobbyGlassGeo, tempMat);
    lobbyGlassMesh.position.y = 1.95;
    modelGroup.add(lobbyGlassMesh);
    classified.glass.push(lobbyGlassMesh);

    // Lobby Interior Core & Reception Bank
    const lobbyCoreGeo = new THREE.BoxGeometry(4.0, 2.5, 4.0);
    const lobbyCoreMesh = new THREE.Mesh(lobbyCoreGeo, tempMat);
    lobbyCoreMesh.position.y = 1.95;
    modelGroup.add(lobbyCoreMesh);
    classified.core.push(lobbyCoreMesh);

    // Grand Entrance Structural Columns
    const colGeo = new THREE.CylinderGeometry(0.16, 0.16, 2.6, 16);
    const colCoords: [number, number, number][] = [
      [-4.2, 1.95, -4.2],
      [4.2, 1.95, -4.2],
      [-4.2, 1.95, 4.2],
      [4.2, 1.95, 4.2],
      [0, 1.95, -4.2],
      [0, 1.95, 4.2],
      [-4.2, 1.95, 0],
      [4.2, 1.95, 0],
    ];
    colCoords.forEach(([x, y, z]) => {
      const colMesh = new THREE.Mesh(colGeo, tempMat);
      colMesh.position.set(x, y, z);
      modelGroup.add(colMesh);
      classified.framing.push(colMesh);
    });

    // C. Tier 2: Cantilevered Mid-Tower (Floors 3 - 7)
    const mezzanineSlabGeo = new THREE.BoxGeometry(10.5, 0.3, 10.5);
    const mezzanineSlabMesh = new THREE.Mesh(mezzanineSlabGeo, tempMat);
    mezzanineSlabMesh.position.y = 3.35;
    modelGroup.add(mezzanineSlabMesh);
    classified.plinth.push(mezzanineSlabMesh);

    const midTowerGlassGeo = new THREE.BoxGeometry(6.6, 4.6, 6.6);
    const midTowerGlassMesh = new THREE.Mesh(midTowerGlassGeo, tempMat);
    midTowerGlassMesh.position.y = 5.75;
    modelGroup.add(midTowerGlassMesh);
    classified.glass.push(midTowerGlassMesh);

    // Tower Structural Shear Core with Illumination
    const towerCoreGeo = new THREE.BoxGeometry(3.2, 4.5, 3.2);
    const towerCoreMesh = new THREE.Mesh(towerCoreGeo, tempMat);
    towerCoreMesh.position.y = 5.75;
    modelGroup.add(towerCoreMesh);
    classified.core.push(towerCoreMesh);

    // Floor Divide Plates
    [4.6, 5.8, 7.0].forEach((yPos) => {
      const slabGeo = new THREE.BoxGeometry(7.0, 0.1, 7.0);
      const slabMesh = new THREE.Mesh(slabGeo, tempMat);
      slabMesh.position.y = yPos;
      modelGroup.add(slabMesh);
      classified.framing.push(slabMesh);
    });

    // Vertical Brise-Soleil Architectural Louvers
    for (let x = -2.8; x <= 2.8; x += 0.7) {
      const louverGeo = new THREE.BoxGeometry(0.08, 4.5, 0.45);
      const louverNorth = new THREE.Mesh(louverGeo, tempMat);
      louverNorth.position.set(x, 5.75, 3.4);
      modelGroup.add(louverNorth);
      classified.louvers.push(louverNorth);

      const louverSouth = new THREE.Mesh(louverGeo, tempMat);
      louverSouth.position.set(x, 5.75, -3.4);
      modelGroup.add(louverSouth);
      classified.louvers.push(louverSouth);
    }

    // D. Tier 3: Sky Terrace & Executive Penthouse
    const terraceGeo = new THREE.BoxGeometry(8.2, 0.3, 8.2);
    const terraceMesh = new THREE.Mesh(terraceGeo, tempMat);
    terraceMesh.position.y = 8.15;
    modelGroup.add(terraceMesh);
    classified.plinth.push(terraceMesh);

    const penthouseGeo = new THREE.BoxGeometry(4.8, 2.2, 4.8);
    const penthouseMesh = new THREE.Mesh(penthouseGeo, tempMat);
    penthouseMesh.position.y = 9.35;
    modelGroup.add(penthouseMesh);
    classified.glass.push(penthouseMesh);

    const penthouseCoreGeo = new THREE.BoxGeometry(2.4, 2.1, 2.4);
    const penthouseCoreMesh = new THREE.Mesh(penthouseCoreGeo, tempMat);
    penthouseCoreMesh.position.y = 9.35;
    modelGroup.add(penthouseCoreMesh);
    classified.core.push(penthouseCoreMesh);

    // E. Architectural Crown Spire & Floating Canopy Ring
    const canopyRingGeo = new THREE.TorusGeometry(3.0, 0.09, 12, 36);
    const canopyRingMesh = new THREE.Mesh(canopyRingGeo, tempMat);
    canopyRingMesh.rotation.x = Math.PI / 2;
    canopyRingMesh.position.y = 10.6;
    modelGroup.add(canopyRingMesh);
    classified.crown.push(canopyRingMesh);

    const spireGeo = new THREE.ConeGeometry(0.18, 2.8, 6);
    const spireMesh = new THREE.Mesh(spireGeo, tempMat);
    spireMesh.position.y = 12.0;
    modelGroup.add(spireMesh);
    classified.crown.push(spireMesh);

    // Apply initial view mode materials immediately
    applyViewMode(viewMode);

    // 7. Active Animation Render Loop
    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Robust Container Resize Handling
    const updateDimensions = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);
    window.addEventListener('resize', updateDimensions);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
      controls.dispose();

      modelGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [applyViewMode]);

  // Sync Auto-Rotate state with OrbitControls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  // Orbit Reset Handler
  const handleResetOrbit = useCallback(() => {
    if (cameraRef.current && controlsRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(16, 12, 18);
      controlsRef.current.target.set(0, 5.0, 0);
      controlsRef.current.update();
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  }, []);

  // Zoom Step Handler
  const handleZoom = useCallback((step: number) => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const target = controlsRef.current.target;
      const dir = new THREE.Vector3().subVectors(camera.position, target);
      const newLen = THREE.MathUtils.clamp(dir.length() + step, 8, 42);
      dir.setLength(newLen);
      camera.position.copy(target).add(dir);
      controlsRef.current.update();
    }
  }, []);

  return (
    <section className="py-24 sm:py-32 bg-[#050505] relative overflow-hidden border-y border-[#D4AF37]/25">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              INTERACTIVE 3D ARCHITECTURAL VISUALIZATION
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide mb-4">
            Bespoke Engineering & Structural Precision
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Rotate, inspect, and experience our architectural design principles in interactive three-dimensional space.
          </p>
        </div>

        {/* 2-Column Responsive Layout: 3D Canvas (Left/Top) + Structural Specs (Right/Bottom) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Model Viewport (8 Columns on Desktop) */}
          <div className="lg:col-span-8 w-full">
            <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden border border-[#D4AF37]/40 bg-[#0e0e11] shadow-2xl">
              {/* Corner Architectural Reticles */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-10" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-10" />

              {/* Status Header Badge (Top-Left) */}
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-sm bg-[#101010]/90 border border-[#D4AF37]/35 backdrop-blur-md shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                    <span className="font-space text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">
                      LIVE 3D SIMULATION
                    </span>
                  </div>
                  <span className="font-cinzel text-xs text-white font-semibold block mt-0.5">
                    Seikou Apex Landmark Pavilion
                  </span>
                </div>
              </div>

              {/* Quick Zoom Tool (Top-Right) */}
              <div className="absolute top-5 right-5 z-20 flex flex-col gap-1.5 bg-[#101010]/90 p-1.5 rounded-sm border border-[#D4AF37]/35 backdrop-blur-md shadow-md">
                <button
                  onClick={() => handleZoom(-3)}
                  className="p-1.5 text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a] rounded-sm transition-colors cursor-pointer"
                  title="Zoom In"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleZoom(3)}
                  className="p-1.5 text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a] rounded-sm transition-colors cursor-pointer"
                  title="Zoom Out"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetOrbit}
                  className="p-1.5 text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a] rounded-sm transition-colors cursor-pointer"
                  title="Reset Camera Position"
                  aria-label="Reset Camera"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Absolute Canvas Mount Container */}
              {is3DSupported ? (
                <div
                  ref={mountRef}
                  className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing select-none z-0"
                  title="Left-click or drag to rotate, pinch/scroll to zoom"
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src="/src/assets/images/project_commercial_complex_1794335447966.jpg"
                    alt="Architectural Visualization Fallback"
                    className="w-full h-full object-cover filter brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-[#080808]/75 flex items-center justify-center p-6 text-center">
                    <p className="font-space text-sm text-[#D4AF37]">
                      High-fidelity architectural rendering active.
                    </p>
                  </div>
                </div>
              )}

              {/* Consolidated Collapsible Bottom Control Dock */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[94%] sm:w-auto max-w-lg">
                {/* Collapse / Expand Tab Button */}
                <div className="flex justify-center -mb-[1px]">
                  <button
                    onClick={() => setIsDockCollapsed(!isDockCollapsed)}
                    className="min-h-[32px] px-3.5 py-1 rounded-t-sm bg-[#101010] border-t border-x border-[#D4AF37]/45 text-[#B8B8B8] hover:text-[#D4AF37] font-space text-[10px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    <span>{isDockCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
                  </button>
                </div>

                {!isDockCollapsed && (
                  <div className="p-2.5 sm:p-3 rounded-sm bg-[#101010]/95 border border-[#D4AF37]/45 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-space text-xs">
                    {/* View Modes: Luxury / Solid / Blueprint */}
                    <div className="flex items-center gap-1 bg-[#18181a] p-1 rounded-sm border border-neutral-800">
                      <button
                        onClick={() => applyViewMode('luxury')}
                        className={`min-h-[36px] px-3 py-1 rounded-sm font-semibold uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                          viewMode === 'luxury'
                            ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md'
                            : 'text-[#B8B8B8] hover:text-white'
                        }`}
                      >
                        Luxury
                      </button>
                      <button
                        onClick={() => applyViewMode('solid')}
                        className={`min-h-[36px] px-3 py-1 rounded-sm font-semibold uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                          viewMode === 'solid'
                            ? 'bg-[#D4AF37] text-[#080808] font-bold shadow-md'
                            : 'text-[#B8B8B8] hover:text-white'
                        }`}
                      >
                        Solid
                      </button>
                      <button
                        onClick={() => applyViewMode('blueprint')}
                        className={`min-h-[36px] px-3 py-1 rounded-sm font-semibold uppercase text-[10px] tracking-wider transition-all cursor-pointer ${
                          viewMode === 'blueprint'
                            ? 'bg-[#00e5ff] text-[#041022] font-bold shadow-md'
                            : 'text-[#B8B8B8] hover:text-white'
                        }`}
                      >
                        Blueprint
                      </button>
                    </div>

                    {/* Auto-Rotate Toggle */}
                    <button
                      onClick={() => setIsAutoRotate(!isAutoRotate)}
                      className={`min-h-[36px] flex items-center gap-1.5 px-3 py-1 rounded-sm uppercase text-[10px] tracking-wider font-semibold border transition-all cursor-pointer ${
                        isAutoRotate
                          ? 'bg-[#18181a] border-[#D4AF37] text-[#D4AF37]'
                          : 'bg-[#18181a] border-neutral-800 text-[#777777]'
                      }`}
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{isAutoRotate ? 'Rotating' : 'Paused'}</span>
                    </button>

                    {/* Reset Center */}
                    <button
                      onClick={handleResetOrbit}
                      className="min-h-[36px] px-3 py-1 rounded-sm bg-[#18181a] hover:bg-neutral-800 border border-neutral-800 text-[#B8B8B8] hover:text-white uppercase text-[10px] tracking-wider font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Interaction Hint Bar */}
            <div className="mt-3 flex items-center justify-between text-[11px] font-space text-[#777777] px-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                Touch / Drag to orbit · Scroll / Pinch to zoom
              </span>
              <span className="hidden sm:inline">Active Mode: <strong className="text-[#D4AF37] uppercase">{viewMode}</strong></span>
            </div>
          </div>

          {/* STRUCTURAL SPECIFICATIONS PANEL (4 Columns on Desktop, Stacked on Mobile) */}
          <div className="lg:col-span-4 w-full bg-[#121214] rounded-lg border border-[#D4AF37]/35 p-6 sm:p-7 shadow-xl flex flex-col justify-between">
            <div>
              {/* Specification Header */}
              <div className="border-b border-[#D4AF37]/25 pb-4 mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-space text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
                    STRUCTURAL SPECIFICATIONS
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Seikou Apex Landmark Pavilion
                </h3>
                <p className="font-space text-xs text-[#999999] mt-1">
                  Conceptual Structural Demonstration & Engineering Analysis
                </p>
              </div>

              {/* Detailed Spec Metrics Grid */}
              <div className="space-y-4">
                <div className="bg-[#18181c] p-3.5 rounded-sm border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Footprint & Built-Up Area
                  </div>
                  <div className="text-white font-cinzel text-sm font-semibold">
                    18,500 sq.ft
                  </div>
                  <div className="text-[11px] font-manrope text-[#888888] mt-0.5">
                    Three-tier podium, cantilevered mid-tower & penthouse terrace
                  </div>
                </div>

                <div className="bg-[#18181c] p-3.5 rounded-sm border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Total Elevation & Crown
                  </div>
                  <div className="text-white font-cinzel text-sm font-semibold">
                    42.5 Metres Apex Elevation
                  </div>
                  <div className="text-[11px] font-manrope text-[#888888] mt-0.5">
                    Geometric spire canopy with integrated lightning protection
                  </div>
                </div>

                <div className="bg-[#18181c] p-3.5 rounded-sm border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Primary Structural Framing
                  </div>
                  <div className="text-white font-cinzel text-sm font-semibold">
                    Post-Tensioned Concrete & Steel Core
                  </div>
                  <div className="text-[11px] font-manrope text-[#888888] mt-0.5">
                    M40 self-compacting concrete, high-tensile rebar reinforcement
                  </div>
                </div>

                <div className="bg-[#18181c] p-3.5 rounded-sm border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Envelope & Cladding Systems
                  </div>
                  <div className="text-white font-cinzel text-sm font-semibold">
                    Double-Glazed Low-E & Gold Louvers
                  </div>
                  <div className="text-[11px] font-manrope text-[#888888] mt-0.5">
                    Acoustic thermal-break glass with anodized solar brise-soleil
                  </div>
                </div>

                <div className="bg-[#18181c] p-3.5 rounded-sm border border-neutral-800 hover:border-[#D4AF37]/40 transition-colors">
                  <div className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                    Seismic & Wind Resistance
                  </div>
                  <div className="text-white font-cinzel text-sm font-semibold">
                    Zone IV Seismic & 180 km/h Wind Load
                  </div>
                  <div className="text-[11px] font-manrope text-[#888888] mt-0.5">
                    Engineered to exceed IS 1893 & NBC structural safety norms
                  </div>
                </div>
              </div>
            </div>

            {/* Legal / Conceptual Advisory Notice */}
            <div className="mt-6 pt-4 border-t border-neutral-800/80">
              <div className="flex items-start gap-2 text-[11px] font-space text-[#777777] leading-relaxed">
                <Info className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  This 3D model represents a demonstration of architectural geometry, framing methodologies, and spatial proportion capabilities by Seikou Develops.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
