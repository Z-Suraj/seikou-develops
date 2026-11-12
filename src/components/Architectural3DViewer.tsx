import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  RotateCw,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Layers,
  Eye,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';

// Safely probe WebGL support without calling Three.js
const isWebGLAvailable = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
};

export type ViewMode = 'realistic' | 'blueprint';

export type ComponentCategory =
  | 'All'
  | 'Foundation'
  | 'Structural Columns'
  | 'Floor Slabs'
  | 'Roof Structure'
  | 'Glass Facade'
  | 'Entrance';

interface ComponentMetadata {
  name: string;
  tag: string;
  description: string;
  elevation: string;
}

const COMPONENT_DATA: Record<ComponentCategory, ComponentMetadata> = {
  All: {
    name: 'Seikou Apex Landmark Pavilion',
    tag: 'Complete Architectural Assembly',
    description:
      'Integrated commercial landmark showcasing modular floor plates, high-efficiency vision glass curtain envelope, and expressive structural framing.',
    elevation: '±0.0m to +9.9m (Conceptual)',
  },
  Foundation: {
    name: 'Foundation & Plinth Substructure',
    tag: 'Structural Base',
    description:
      'Monolithic reinforced plinth pad with dual perimeter grade step trim for baseline grounding, weight dispersal, and site tieback.',
    elevation: '0.00m to +0.30m (Illustrative)',
  },
  'Structural Columns': {
    name: 'Structural Column Grid',
    tag: 'Vertical Framing',
    description:
      'Perimeter axial load-bearing columns and arrival portico pillars providing balanced vertical weight distribution to the foundation plinth.',
    elevation: '+0.30m to +2.50m (Illustrative)',
  },
  'Floor Slabs': {
    name: 'Floor Slabs & Horizontal Plates',
    tag: 'Horizontal Diaphragms',
    description:
      'Multi-level floor slabs with gold fascia edge trims defining floor-to-floor heights, cantilevered spans, and flexible office layouts.',
    elevation: '+2.6m to +7.0m (Illustrative)',
  },
  'Roof Structure': {
    name: 'Roof Crown & Pergola Assembly',
    tag: 'Capping Architecture',
    description:
      'Executive penthouse roof plate, architectural louvre pergolas for solar shading, and the apex landmark pavilion finial spire.',
    elevation: '+7.0m to +9.9m (Illustrative)',
  },
  'Glass Facade': {
    name: 'Glass Curtain Wall & Solar Mullions',
    tag: 'Envelope System',
    description:
      'High-performance vision glass envelope flanked by modular vertical solar fins providing glare reduction and contemporary aesthetic line.',
    elevation: '+1.4m to +8.4m (Illustrative)',
  },
  Entrance: {
    name: 'Entrance Lobby & Portico Canopy',
    tag: 'Arrival Gateway',
    description:
      'Double-height reception lobby enclosure with cantilevered canopy and twin support columns framing the building access portal.',
    elevation: '+0.30m to +2.6m (Illustrative)',
  },
};

interface BuildingPart {
  mesh: THREE.Mesh;
  edges: THREE.LineSegments;
  category: ComponentCategory;
  realisticMaterial: THREE.Material | THREE.Material[];
}

export const Architectural3DViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState<boolean>(() => !isWebGLAvailable());
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<ViewMode>('realistic');
  const [selectedComponent, setSelectedComponent] = useState<ComponentCategory>('All');

  // Three.js instances
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const buildingPartsRef = useRef<BuildingPart[]>([]);

  // Lighting & Grid references for mode swapping
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight | null>(null);
  const keyLightRef = useRef<THREE.DirectionalLight | null>(null);
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const realisticGridRef = useRef<THREE.GridHelper | null>(null);
  const blueprintGridRef = useRef<THREE.GridHelper | null>(null);

  // Shared Blueprint Materials
  const bpMaterialsRef = useRef<{
    body: THREE.MeshBasicMaterial;
    highlightBody: THREE.MeshBasicMaterial;
    dimmedBody: THREE.MeshBasicMaterial;
    edge: THREE.LineBasicMaterial;
    highlightEdge: THREE.LineBasicMaterial;
    dimmedEdge: THREE.LineBasicMaterial;
  } | null>(null);

  // Initialize Scene
  useEffect(() => {
    if (hasError) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Verify canvas context can be acquired natively before invoking Three.js
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) {
        setHasError(true);
        return;
      }
    } catch {
      setHasError(true);
      return;
    }

    // Intercept console errors for headless GPU driver safety
    const originalError = console.error;
    const originalWarn = console.warn;
    console.error = (...args: any[]) => {
      if (args.some((a) => typeof a === 'string' && a.includes('THREE.WebGLRenderer'))) {
        return;
      }
      originalError.apply(console, args);
    };
    console.warn = (...args: any[]) => {
      if (args.some((a) => typeof a === 'string' && a.includes('THREE.WebGLRenderer'))) {
        return;
      }
      originalWarn.apply(console, args);
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      });
    } catch {
      setHasError(true);
      return;
    } finally {
      console.error = originalError;
      console.warn = originalWarn;
    }

    rendererRef.current = renderer;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0c);
    scene.fog = new THREE.FogExp2(0x0a0a0c, 0.02);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(14, 10, 14);
    camera.lookAt(0, 4.0, 0);
    cameraRef.current = camera;

    // 3. OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 4.0, 0);
    controls.minDistance = 6;
    controls.maxDistance = 35;
    controls.minPolarAngle = Math.PI / 16;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.0;
    controls.update();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.8);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const hemiLight = new THREE.HemisphereLight(0xe8f0ff, 0x141418, 0.7);
    scene.add(hemiLight);
    hemiLightRef.current = hemiLight;

    const keyLight = new THREE.DirectionalLight(0xfffaea, 2.2);
    keyLight.position.set(14, 20, 12);
    keyLight.target.position.set(0, 4.0, 0);
    scene.add(keyLight);
    scene.add(keyLight.target);
    keyLightRef.current = keyLight;

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.5);
    rimLight.position.set(-12, 12, -10);
    rimLight.target.position.set(0, 4.0, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);
    rimLightRef.current = rimLight;

    // 5. Dual Ground Grids (Realistic black-gold + Blueprint technical cyan)
    const realisticGrid = new THREE.GridHelper(24, 24, 0xd4af37, 0x262628);
    realisticGrid.position.y = -0.01;
    scene.add(realisticGrid);
    realisticGridRef.current = realisticGrid;

    const blueprintGrid = new THREE.GridHelper(24, 24, 0x00d2ff, 0x0a2644);
    blueprintGrid.position.y = -0.01;
    blueprintGrid.visible = false;
    scene.add(blueprintGrid);
    blueprintGridRef.current = blueprintGrid;

    // 6. Shared Blueprint Materials
    bpMaterialsRef.current = {
      body: new THREE.MeshBasicMaterial({
        color: 0x081e36,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
      }),
      highlightBody: new THREE.MeshBasicMaterial({
        color: 0x0284c7,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      }),
      dimmedBody: new THREE.MeshBasicMaterial({
        color: 0x040e1c,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
      }),
      edge: new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
      }),
      highlightEdge: new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1.0,
      }),
      dimmedEdge: new THREE.LineBasicMaterial({
        color: 0x164e63,
        transparent: true,
        opacity: 0.25,
      }),
    };

    // 7. 3D Model: Existing Architectural Pavilion Geometry
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // Realistic Materials
    const darkStoneMat = new THREE.MeshStandardMaterial({
      color: 0x18181c,
      roughness: 0.35,
      metalness: 0.25,
    });

    const goldAccentMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.25,
      metalness: 0.85,
    });

    const windowGlassMat = new THREE.MeshStandardMaterial({
      color: 0x5a9bc0,
      roughness: 0.08,
      metalness: 0.3,
      transparent: true,
      opacity: 0.7,
    });

    const warmLobbyGlassMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.1,
      metalness: 0.2,
      transparent: true,
      opacity: 0.8,
      emissive: 0x443010,
      emissiveIntensity: 0.35,
    });

    const coreMassMat = new THREE.MeshStandardMaterial({
      color: 0x222226,
      roughness: 0.5,
    });

    // Helper to register parts with structural categorization & edge geometry
    const buildingParts: BuildingPart[] = [];
    const registerPart = (
      mesh: THREE.Mesh,
      category: ComponentCategory,
      realisticMaterial: THREE.Material
    ) => {
      mesh.userData.category = category;
      mesh.userData.realisticMaterial = realisticMaterial;

      const edgesGeom = new THREE.EdgesGeometry(mesh.geometry, 25);
      const edges = new THREE.LineSegments(
        edgesGeom,
        bpMaterialsRef.current?.edge || new THREE.LineBasicMaterial({ color: 0x38bdf8 })
      );
      edges.visible = false;
      mesh.add(edges);

      modelGroup.add(mesh);
      buildingParts.push({ mesh, edges, category, realisticMaterial });
    };

    // A. Foundation Plinth & Site
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.3, 12.5), darkStoneMat);
    plinth.position.y = 0.15;
    registerPart(plinth, 'Foundation', darkStoneMat);

    const plinthRim = new THREE.Mesh(new THREE.BoxGeometry(12.7, 0.06, 12.7), goldAccentMat);
    plinthRim.position.y = 0.3;
    registerPart(plinthRim, 'Foundation', goldAccentMat);

    // B. Ground Floor: Double-Height Entrance Lobby
    const groundCore = new THREE.Mesh(new THREE.BoxGeometry(7.2, 2.2, 7.2), coreMassMat);
    groundCore.position.y = 1.4;
    registerPart(groundCore, 'Entrance', coreMassMat);

    const groundGlass = new THREE.Mesh(new THREE.BoxGeometry(7.6, 2.2, 7.6), warmLobbyGlassMat);
    groundGlass.position.y = 1.4;
    registerPart(groundGlass, 'Entrance', warmLobbyGlassMat);

    // Ground Floor Columns
    const colCoords = [
      [-3.6, 1.4, -3.6],
      [3.6, 1.4, -3.6],
      [-3.6, 1.4, 3.6],
      [3.6, 1.4, 3.6],
      [-3.6, 1.4, 0],
      [3.6, 1.4, 0],
      [0, 1.4, -3.6],
    ];
    colCoords.forEach(([x, y, z]) => {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 2.2, 16), goldAccentMat);
      col.position.set(x, y, z);
      registerPart(col, 'Structural Columns', goldAccentMat);
    });

    // Entrance Canopy
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 2.4), goldAccentMat);
    canopy.position.set(0, 2.45, 4.8);
    registerPart(canopy, 'Entrance', goldAccentMat);

    // Canopy Pillars
    [-1.8, 1.8].forEach((xPos) => {
      const pCol = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 16), goldAccentMat);
      pCol.position.set(xPos, 1.35, 5.8);
      registerPart(pCol, 'Structural Columns', goldAccentMat);
    });

    // C. Mid Tower (Floors 2 to 5)
    // Floor Slabs with Gold Pinstripe Trims
    const slabLevels = [2.6, 4.0, 5.4, 6.8];
    slabLevels.forEach((y) => {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.22, 8.2), darkStoneMat);
      slab.position.y = y;
      registerPart(slab, 'Floor Slabs', darkStoneMat);

      const trim = new THREE.Mesh(new THREE.BoxGeometry(8.26, 0.05, 8.26), goldAccentMat);
      trim.position.y = y;
      registerPart(trim, 'Floor Slabs', goldAccentMat);
    });

    // Mid Tower Glass Curtain Wall
    const towerGlass = new THREE.Mesh(new THREE.BoxGeometry(7.6, 4.2, 7.6), windowGlassMat);
    towerGlass.position.y = 4.7;
    registerPart(towerGlass, 'Glass Facade', windowGlassMat);

    // Mid Tower Internal Core
    const towerCore = new THREE.Mesh(new THREE.BoxGeometry(5.2, 4.1, 5.2), coreMassMat);
    towerCore.position.y = 4.7;
    registerPart(towerCore, 'Floor Slabs', coreMassMat);

    // Vertical Gold Louvers / Architectural Mullions
    for (let x = -3.0; x <= 3.0; x += 1.0) {
      const louverN = new THREE.Mesh(new THREE.BoxGeometry(0.07, 4.2, 0.35), goldAccentMat);
      louverN.position.set(x, 4.7, 3.85);
      registerPart(louverN, 'Glass Facade', goldAccentMat);

      const louverS = new THREE.Mesh(new THREE.BoxGeometry(0.07, 4.2, 0.35), goldAccentMat);
      louverS.position.set(x, 4.7, -3.85);
      registerPart(louverS, 'Glass Facade', goldAccentMat);
    }

    // D. Executive Penthouse Level & Rooftop Crown
    const penthouseSlab = new THREE.Mesh(new THREE.BoxGeometry(6.6, 0.2, 6.6), darkStoneMat);
    penthouseSlab.position.y = 7.0;
    registerPart(penthouseSlab, 'Floor Slabs', darkStoneMat);

    const penthouseGlass = new THREE.Mesh(new THREE.BoxGeometry(5.4, 1.6, 5.4), warmLobbyGlassMat);
    penthouseGlass.position.y = 7.8;
    registerPart(penthouseGlass, 'Glass Facade', warmLobbyGlassMat);

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.16, 5.8), goldAccentMat);
    roofSlab.position.y = 8.68;
    registerPart(roofSlab, 'Roof Structure', goldAccentMat);

    // Rooftop Architectural Pergola Canopy
    for (let z = -2.0; z <= 2.0; z += 0.7) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.1, 0.1), goldAccentMat);
      beam.position.set(0, 9.0, z);
      registerPart(beam, 'Roof Structure', goldAccentMat);
    }

    // Apex Architectural Spire
    const spire = new THREE.Mesh(new THREE.ConeGeometry(0.14, 2.2, 8), goldAccentMat);
    spire.position.y = 9.9;
    registerPart(spire, 'Roof Structure', goldAccentMat);

    buildingPartsRef.current = buildingParts;

    // 8. Render Loop
    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
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

      if (bpMaterialsRef.current) {
        Object.values(bpMaterialsRef.current).forEach((mat) => mat.dispose());
      }

      renderer.dispose();
    };
  }, [hasError]);

  // Sync auto-rotation state with controls
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  // Update Materials, Lighting & Grids on ViewMode / SelectedComponent Change
  useEffect(() => {
    const scene = sceneRef.current;
    const parts = buildingPartsRef.current;
    const bpMats = bpMaterialsRef.current;
    if (!scene || parts.length === 0 || !bpMats) return;

    if (viewMode === 'realistic') {
      // 1. Realistic Environment
      scene.background = new THREE.Color(0x0a0a0c);
      if (scene.fog) scene.fog.color.setHex(0x0a0a0c);

      if (realisticGridRef.current) realisticGridRef.current.visible = true;
      if (blueprintGridRef.current) blueprintGridRef.current.visible = false;

      // Realistic Lighting
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0xfff5e6);
        ambientLightRef.current.intensity = 0.8;
      }
      if (hemiLightRef.current) {
        hemiLightRef.current.color.setHex(0xe8f0ff);
        hemiLightRef.current.groundColor.setHex(0x141418);
        hemiLightRef.current.intensity = 0.7;
      }
      if (keyLightRef.current) {
        keyLightRef.current.color.setHex(0xfffaea);
        keyLightRef.current.intensity = 2.2;
      }
      if (rimLightRef.current) {
        rimLightRef.current.color.setHex(0xd4af37);
        rimLightRef.current.intensity = 1.5;
      }

      // Restore realistic materials and hide blueprint outlines
      parts.forEach((p) => {
        p.mesh.material = p.realisticMaterial;
        p.edges.visible = false;
      });
    } else {
      // 2. Technical Blueprint Environment
      scene.background = new THREE.Color(0x061122); // Deep architectural blue
      if (scene.fog) scene.fog.color.setHex(0x061122);

      if (realisticGridRef.current) realisticGridRef.current.visible = false;
      if (blueprintGridRef.current) blueprintGridRef.current.visible = true;

      // Technical Drafting Lighting
      if (ambientLightRef.current) {
        ambientLightRef.current.color.setHex(0x38bdf8);
        ambientLightRef.current.intensity = 0.9;
      }
      if (hemiLightRef.current) {
        hemiLightRef.current.color.setHex(0x7dd3fc);
        hemiLightRef.current.groundColor.setHex(0x082f49);
        hemiLightRef.current.intensity = 0.6;
      }
      if (keyLightRef.current) {
        keyLightRef.current.color.setHex(0xbae6fd);
        keyLightRef.current.intensity = 1.4;
      }
      if (rimLightRef.current) {
        rimLightRef.current.color.setHex(0x0284c7);
        rimLightRef.current.intensity = 1.1;
      }

      // Apply Blueprint Materials & Structural Highlighting
      parts.forEach((p) => {
        p.edges.visible = true;

        if (selectedComponent === 'All') {
          p.mesh.material = bpMats.body;
          p.edges.material = bpMats.edge;
        } else if (p.category === selectedComponent) {
          p.mesh.material = bpMats.highlightBody;
          p.edges.material = bpMats.highlightEdge;
        } else {
          p.mesh.material = bpMats.dimmedBody;
          p.edges.material = bpMats.dimmedEdge;
        }
      });
    }
  }, [viewMode, selectedComponent]);

  // Reset Camera View
  const handleReset = useCallback(() => {
    if (cameraRef.current && controlsRef.current && modelGroupRef.current) {
      cameraRef.current.position.set(14, 10, 14);
      controlsRef.current.target.set(0, 4.0, 0);
      controlsRef.current.update();
      modelGroupRef.current.rotation.set(0, 0, 0);
    }
  }, []);

  // Zoom Controls
  const handleZoom = useCallback((delta: number) => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const target = controlsRef.current.target;
      const dir = new THREE.Vector3().subVectors(camera.position, target);
      const newLen = THREE.MathUtils.clamp(dir.length() + delta, 6, 32);
      dir.setLength(newLen);
      camera.position.copy(target).add(dir);
      controlsRef.current.update();
    }
  }, []);

  const activeMeta = COMPONENT_DATA[selectedComponent];

  const componentCategories: ComponentCategory[] = [
    'All',
    'Foundation',
    'Structural Columns',
    'Floor Slabs',
    'Roof Structure',
    'Glass Facade',
    'Entrance',
  ];

  return (
    <section
      id="visualization"
      className="py-24 sm:py-32 bg-[#080808] relative overflow-hidden border-y border-[#D4AF37]/25"
    >
      {/* Background radial gold/cyan glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 ${
          viewMode === 'blueprint' ? 'bg-[#0284c7]/10' : 'bg-[#D4AF37]/5'
        }`}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
            <span className="font-space text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              INTERACTIVE 3D ARCHITECTURAL VISUALIZATION
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-wide mb-3">
            Bespoke Engineering & Structural Precision
          </h2>
          <p className="font-manrope text-[#B8B8B8] text-sm sm:text-base leading-relaxed">
            Rotate, zoom, and inspect our signature commercial landmark pavilion in both realistic architectural render and technical blueprint mode.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setViewMode('realistic')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-space text-xs uppercase font-bold tracking-[0.16em] transition-all cursor-pointer border ${
              viewMode === 'realistic'
                ? 'bg-[#D4AF37] text-[#080808] border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.35)]'
                : 'bg-[#111113] text-[#B8B8B8] border-neutral-800 hover:text-white hover:border-[#D4AF37]/50'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Realistic Architectural View</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('blueprint')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-sm font-space text-xs uppercase font-bold tracking-[0.16em] transition-all cursor-pointer border ${
              viewMode === 'blueprint'
                ? 'bg-[#0284c7] text-white border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.45)]'
                : 'bg-[#111113] text-[#B8B8B8] border-neutral-800 hover:text-cyan-300 hover:border-[#38bdf8]/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Technical Blueprint View</span>
          </button>
        </div>

        {/* 3D Viewport Presentation Container */}
        <div
          ref={containerRef}
          className={`relative w-full h-[470px] sm:h-[550px] md:h-[630px] rounded-lg overflow-hidden border transition-colors duration-500 shadow-2xl ${
            viewMode === 'blueprint'
              ? 'border-[#0284c7]/50 bg-[#061122]'
              : 'border-[#D4AF37]/35 bg-[#0a0a0c]'
          }`}
        >
          {/* Subtle Corner Reticles */}
          <div
            className={`absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 pointer-events-none z-10 transition-colors ${
              viewMode === 'blueprint' ? 'border-[#38bdf8]' : 'border-[#D4AF37]'
            }`}
          />
          <div
            className={`absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 pointer-events-none z-10 transition-colors ${
              viewMode === 'blueprint' ? 'border-[#38bdf8]' : 'border-[#D4AF37]'
            }`}
          />
          <div
            className={`absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 pointer-events-none z-10 transition-colors ${
              viewMode === 'blueprint' ? 'border-[#38bdf8]' : 'border-[#D4AF37]'
            }`}
          />
          <div
            className={`absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 pointer-events-none z-10 transition-colors ${
              viewMode === 'blueprint' ? 'border-[#38bdf8]' : 'border-[#D4AF37]'
            }`}
          />

          {/* Model Title Badge (Top-Left) */}
          <div className="absolute top-5 left-5 z-20 pointer-events-none">
            <div
              className={`px-3.5 py-2 rounded-sm border backdrop-blur-md shadow-lg transition-colors ${
                viewMode === 'blueprint'
                  ? 'bg-[#08182d]/90 border-[#38bdf8]/40'
                  : 'bg-[#101010]/90 border-[#D4AF37]/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`font-space text-[10px] uppercase font-bold tracking-[0.2em] block ${
                    viewMode === 'blueprint' ? 'text-[#38bdf8]' : 'text-[#D4AF37]'
                  }`}
                >
                  {viewMode === 'blueprint' ? 'TECHNICAL CAD BLUEPRINT' : '3D ARCHITECTURAL MODEL'}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-mono tracking-wider ${
                    viewMode === 'blueprint'
                      ? 'bg-[#0284c7]/20 text-[#7dd3fc]'
                      : 'bg-[#D4AF37]/15 text-[#D4AF37]'
                  }`}
                >
                  {viewMode === 'blueprint' ? 'WIRE-OUTLINE' : 'PBR-LIT'}
                </span>
              </div>
              <span className="font-cinzel text-xs sm:text-sm text-white font-semibold block mt-1">
                Seikou Apex Landmark Pavilion
              </span>
              <span className="font-manrope text-[11px] text-[#8e9bb0] block">
                Bespoke Engineering & Structural Precision
              </span>
            </div>
          </div>

          {/* Blueprint Technical Annotation Scale (Left Overlay in Blueprint Mode) */}
          {viewMode === 'blueprint' && !hasError && (
            <div className="hidden sm:flex absolute left-5 top-28 z-20 flex-col gap-2 p-2.5 rounded-sm bg-[#08182d]/85 border border-[#38bdf8]/25 backdrop-blur-md pointer-events-none font-mono text-[10px] text-[#7dd3fc]">
              <span className="font-space text-[9px] font-bold text-[#38bdf8] uppercase tracking-wider mb-0.5 border-b border-[#38bdf8]/20 pb-1">
                ELEVATION LEVELS (ILLUSTRATIVE)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-white">+9.9m</span>
                <span className="text-[#94a3b8]">Apex Crown Spire</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">+7.0m</span>
                <span className="text-[#94a3b8]">Penthouse Terrace</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">+4.0m</span>
                <span className="text-[#94a3b8]">Mid-Tower Plate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">+1.4m</span>
                <span className="text-[#94a3b8]">Entrance Lobby</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">±0.0m</span>
                <span className="text-[#94a3b8]">Plinth Substructure</span>
              </div>
            </div>
          )}

          {/* Quick Camera & Zoom Controls (Top-Right) */}
          {!hasError && (
            <div
              className={`absolute top-5 right-5 z-20 flex flex-col gap-1.5 p-1.5 rounded-sm border backdrop-blur-md shadow-md ${
                viewMode === 'blueprint'
                  ? 'bg-[#08182d]/90 border-[#38bdf8]/35'
                  : 'bg-[#101010]/90 border-[#D4AF37]/30'
              }`}
            >
              <button
                onClick={() => handleZoom(-2.5)}
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'text-[#94a3b8] hover:text-[#38bdf8] hover:bg-[#0c2444]'
                    : 'text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a]'
                }`}
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleZoom(2.5)}
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'text-[#94a3b8] hover:text-[#38bdf8] hover:bg-[#0c2444]'
                    : 'text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a]'
                }`}
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleReset}
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'text-[#94a3b8] hover:text-[#38bdf8] hover:bg-[#0c2444]'
                    : 'text-[#B8B8B8] hover:text-[#D4AF37] hover:bg-[#1a1a1a]'
                }`}
                title="Reset View"
                aria-label="Reset View"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Real Interactive Three.js Canvas or Graceful Fallback */}
          {!hasError ? (
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-grab active:cursor-grabbing outline-none"
              title="Click and drag to rotate, scroll to zoom"
            />
          ) : (
            /* Clean architectural presentation image fallback if WebGL is disabled */
            <div className="w-full h-full relative overflow-hidden bg-[#0c0c0e]">
              <img
                src="/assets/images/project_commercial_complex_1794335447966.jpg"
                alt="Modern Commercial Landmark Pavilion"
                className="w-full h-full object-cover filter brightness-[0.8] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-[#0a0a0c]/40" />
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center pointer-events-none">
                <div className="px-6 py-4 rounded-sm bg-[#101010]/90 border border-[#D4AF37]/40 backdrop-blur-md shadow-2xl">
                  <span className="font-space text-[10px] uppercase font-bold tracking-[0.25em] text-[#D4AF37] block mb-1">
                    ARCHITECTURAL PRESENTATION
                  </span>
                  <span className="font-cinzel text-sm sm:text-base text-white font-semibold">
                    Seikou Apex Landmark Pavilion
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Floating Bar: Auto-Rotate & Reset */}
          {!hasError && (
            <div
              className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-sm border backdrop-blur-md shadow-xl font-space text-xs ${
                viewMode === 'blueprint'
                  ? 'bg-[#08182d]/90 border-[#38bdf8]/40'
                  : 'bg-[#101010]/90 border-[#D4AF37]/35'
              }`}
            >
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm uppercase text-[11px] font-semibold tracking-wider transition-all cursor-pointer ${
                  isAutoRotate
                    ? viewMode === 'blueprint'
                      ? 'bg-[#0c2e56] text-[#38bdf8] border border-[#38bdf8]/60 shadow-[0_0_10px_rgba(56,189,248,0.25)]'
                      : 'bg-[#1c1c20] text-[#D4AF37] border border-[#D4AF37]/50'
                    : 'bg-[#141418] text-[#888888] hover:text-white border border-neutral-800'
                }`}
              >
                {isAutoRotate ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isAutoRotate ? 'Auto Rotate' : 'Paused'}</span>
              </button>

              <button
                onClick={handleReset}
                className={`px-3.5 py-1.5 rounded-sm uppercase text-[11px] font-semibold tracking-wider border transition-colors cursor-pointer ${
                  viewMode === 'blueprint'
                    ? 'bg-[#0c223c] hover:bg-[#123055] text-[#bae6fd] border-[#38bdf8]/30 hover:border-[#38bdf8]/60'
                    : 'bg-[#18181c] hover:bg-neutral-800 text-[#B8B8B8] hover:text-white border-neutral-800'
                }`}
              >
                Reset View
              </button>
            </div>
          )}
        </div>

        {/* Structural Highlighting Controls & Technical Inspector (Available in Blueprint Mode) */}
        {viewMode === 'blueprint' && (
          <div className="mt-6 p-5 sm:p-6 rounded-lg bg-[#071322] border border-[#38bdf8]/30 shadow-2xl animate-in fade-in duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#38bdf8]/20">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded bg-[#0284c7]/20 text-[#38bdf8] border border-[#38bdf8]/30">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-space text-xs font-bold uppercase tracking-[0.18em] text-[#38bdf8]">
                    STRUCTURAL COMPONENT INSPECTOR
                  </h4>
                  <p className="font-manrope text-xs text-[#94a3b8]">
                    Select any component below to isolate and illuminate its 3D wireframe geometry.
                  </p>
                </div>
              </div>
              <span className="font-mono text-[11px] text-[#7dd3fc] bg-[#0c2444] px-2.5 py-1 rounded border border-[#38bdf8]/25 self-start md:self-auto">
                GRID: 1.0M MODULE (ILLUSTRATIVE)
              </span>
            </div>

            {/* Component Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-5">
              {componentCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedComponent(cat)}
                  className={`px-3.5 py-2 rounded-sm font-space text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedComponent === cat
                      ? 'bg-[#0284c7] text-white border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                      : 'bg-[#0a1a2e] text-[#94a3b8] border-[#1e3a5f] hover:text-cyan-200 hover:border-[#38bdf8]/40'
                  }`}
                >
                  {cat === 'All' ? 'All Components' : cat}
                </button>
              ))}
            </div>

            {/* Active Component Technical Detail Panel */}
            <div className="p-4 rounded bg-[#050e1a] border border-[#38bdf8]/25 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="font-cinzel text-base sm:text-lg font-bold text-white">
                    {activeMeta.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-space font-semibold uppercase tracking-wider bg-[#0284c7]/25 text-[#38bdf8] border border-[#38bdf8]/30">
                    {activeMeta.tag}
                  </span>
                </div>
                <p className="font-manrope text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
                  {activeMeta.description}
                </p>
              </div>

              <div className="shrink-0 p-3 rounded bg-[#091b30] border border-[#38bdf8]/20 text-right">
                <span className="font-space text-[10px] uppercase tracking-wider text-[#94a3b8] block">
                  Reference Level
                </span>
                <span className="font-mono text-xs font-bold text-[#38bdf8] block mt-0.5">
                  {activeMeta.elevation}
                </span>
              </div>
            </div>

            {/* Architectural Disclaimer */}
            <div className="mt-3 flex items-center gap-1.5 text-[11px] font-manrope text-[#64748b]">
              <Info className="w-3.5 h-3.5 shrink-0 text-[#38bdf8]" />
              <span>
                Conceptual architectural design representation for visualization purposes only. Dimensions and notations are illustrative and not for engineering execution.
              </span>
            </div>
          </div>
        )}

        {/* Interaction Hint */}
        <div className="mt-4 text-center text-xs font-space text-[#777777]">
          <span>
            {!hasError
              ? 'Mouse drag to rotate · Scroll wheel to zoom · Explore Realistic and Technical Blueprint views'
              : 'Architectural concept presentation of Seikou Develops commercial developments.'}
          </span>
        </div>
      </div>
    </section>
  );
};
