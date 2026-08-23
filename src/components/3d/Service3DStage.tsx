import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Service3DStageProps {
  type: 'megaphone' | 'cube' | 'social' | 'browser' | 'billboard' | 'charts' | 'layers' | 'strategy';
  serviceTitle: string;
  className?: string;
}

export const Service3DStage: React.FC<Service3DStageProps> = ({ type, serviceTitle, className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isWireframe, setIsWireframe] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const materialsRef = useRef<THREE.Material[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // Main Interactive Object Group
    const serviceGroup = new THREE.Group();
    scene.add(serviceGroup);

    materialsRef.current = [];

    // Brand Materials
    const brandBlueMat = new THREE.MeshPhysicalMaterial({
      color: 0x3477bc,
      emissive: 0x2559cc,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2,
      clearcoat: 0.8,
      wireframe: isWireframe,
    });
    materialsRef.current.push(brandBlueMat);

    const brandPurpleMat = new THREE.MeshPhysicalMaterial({
      color: 0x322366,
      emissive: 0x2559cc,
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: isWireframe,
    });
    materialsRef.current.push(brandPurpleMat);

    const glowAccentMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      wireframe: isWireframe,
    });
    materialsRef.current.push(glowAccentMat);

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
      wireframe: isWireframe,
    });
    materialsRef.current.push(glassMat);

    // Build specific 3D Model based on type
    if (type === 'megaphone') {
      // 3D Megaphone
      const coneGeo = new THREE.ConeGeometry(1.2, 2.2, 32, 1, true);
      const coneMesh = new THREE.Mesh(coneGeo, brandBlueMat);
      coneMesh.rotation.z = -Math.PI / 3;
      coneMesh.position.set(-0.2, 0, 0);
      serviceGroup.add(coneMesh);

      const handleGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16);
      const handleMesh = new THREE.Mesh(handleGeo, brandPurpleMat);
      handleMesh.position.set(-0.6, -1.0, 0);
      handleMesh.rotation.z = 0.2;
      serviceGroup.add(handleMesh);

      // Sound Wave Rings
      for (let i = 1; i <= 3; i++) {
        const soundRingGeo = new THREE.TorusGeometry(0.5 + i * 0.4, 0.03, 16, 40, Math.PI * 0.8);
        const soundRing = new THREE.Mesh(soundRingGeo, glowAccentMat);
        soundRing.rotation.y = Math.PI / 2;
        soundRing.position.set(0.8 + i * 0.45, 0.4, 0);
        serviceGroup.add(soundRing);
      }
    } else if (type === 'cube') {
      // 3D Brand Cube / Faceted Prism
      const boxGeo = new THREE.BoxGeometry(1.8, 1.8, 1.8);
      const boxMesh = new THREE.Mesh(boxGeo, brandBlueMat);
      serviceGroup.add(boxMesh);

      const innerCoreGeo = new THREE.OctahedronGeometry(1.0, 0);
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, glowAccentMat);
      serviceGroup.add(innerCoreMesh);

      const frameGeo = new THREE.BoxGeometry(1.9, 1.9, 1.9);
      const frameMat = new THREE.MeshBasicMaterial({ color: 0x60a5fa, wireframe: true });
      const frameMesh = new THREE.Mesh(frameGeo, frameMat);
      serviceGroup.add(frameMesh);
    } else if (type === 'browser') {
      // 3D Browser Window
      const windowGeo = new THREE.BoxGeometry(2.4, 1.6, 0.08);
      const windowMesh = new THREE.Mesh(windowGeo, brandPurpleMat);
      serviceGroup.add(windowMesh);

      const screenGeo = new THREE.PlaneGeometry(2.2, 1.3);
      const screenMesh = new THREE.Mesh(screenGeo, brandBlueMat);
      screenMesh.position.z = 0.05;
      serviceGroup.add(screenMesh);

      // Browser top bar buttons
      for (let i = 0; i < 3; i++) {
        const dotGeo = new THREE.CircleGeometry(0.05, 16);
        const dotColor = i === 0 ? 0xef4444 : i === 1 ? 0xf59e0b : 0x10b981;
        const dotMat = new THREE.MeshBasicMaterial({ color: dotColor });
        const dotMesh = new THREE.Mesh(dotGeo, dotMat);
        dotMesh.position.set(-0.9 + i * 0.16, 0.62, 0.06);
        serviceGroup.add(dotMesh);
      }

      // Floating code block planes
      const codeBarGeo = new THREE.BoxGeometry(1.8, 0.1, 0.02);
      for (let j = 0; j < 4; j++) {
        const bar = new THREE.Mesh(codeBarGeo, glowAccentMat);
        bar.scale.x = 0.4 + Math.random() * 0.5;
        bar.position.set(-0.2 + (j % 2) * 0.2, 0.3 - j * 0.22, 0.06);
        serviceGroup.add(bar);
      }
    } else if (type === 'charts') {
      // 3D Growth Analytics Bars
      const barHeights = [0.8, 1.3, 1.8, 2.4, 2.9];
      barHeights.forEach((h, idx) => {
        const barGeo = new THREE.BoxGeometry(0.35, h, 0.35);
        const mat = idx === barHeights.length - 1 ? glowAccentMat : brandBlueMat;
        const barMesh = new THREE.Mesh(barGeo, mat);
        barMesh.position.set(-1.0 + idx * 0.5, h / 2 - 1.2, 0);
        serviceGroup.add(barMesh);
      });

      // Connecting Growth Trend Line
      const curvePoints = barHeights.map((h, idx) => new THREE.Vector3(-1.0 + idx * 0.5, h - 1.15, 0.25));
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 30, 0.04, 8, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, glowAccentMat);
      serviceGroup.add(tubeMesh);
    } else if (type === 'billboard') {
      // 3D Digital LED Billboard
      const boardGeo = new THREE.BoxGeometry(2.6, 1.6, 0.12);
      const boardMesh = new THREE.Mesh(boardGeo, brandPurpleMat);
      serviceGroup.add(boardMesh);

      const displayGeo = new THREE.PlaneGeometry(2.4, 1.4);
      const displayMesh = new THREE.Mesh(displayGeo, brandBlueMat);
      displayMesh.position.z = 0.07;
      serviceGroup.add(displayMesh);

      // Support Poles
      const poleGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.8, 16);
      const pole1 = new THREE.Mesh(poleGeo, brandPurpleMat);
      pole1.position.set(-0.7, -1.2, 0);
      const pole2 = new THREE.Mesh(poleGeo, brandPurpleMat);
      pole2.position.set(0.7, -1.2, 0);
      serviceGroup.add(pole1);
      serviceGroup.add(pole2);
    } else if (type === 'social') {
      // Floating 3D Social Media Nodes
      const centerSphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
      const centerSphere = new THREE.Mesh(centerSphereGeo, brandBlueMat);
      serviceGroup.add(centerSphere);

      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2;
        const cardGeo = new THREE.BoxGeometry(0.7, 0.7, 0.06);
        const cardMesh = new THREE.Mesh(cardGeo, i % 2 === 0 ? brandPurpleMat : glowAccentMat);
        cardMesh.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.3, Math.sin(angle * 2) * 0.5);
        cardMesh.rotation.y = angle + 0.3;
        serviceGroup.add(cardMesh);
      }
    } else if (type === 'layers') {
      // 3D Layered Glass UI
      for (let i = 0; i < 3; i++) {
        const layerGeo = new THREE.BoxGeometry(2.0, 1.4, 0.04);
        const layerMesh = new THREE.Mesh(layerGeo, i === 0 ? glassMat : i === 1 ? brandBlueMat : brandPurpleMat);
        layerMesh.position.set(i * 0.2 - 0.2, i * 0.2 - 0.2, -i * 0.4);
        layerMesh.rotation.set(-0.2, 0.35, 0.1);
        serviceGroup.add(layerMesh);
      }
    } else {
      // Strategy Compass & Target Nodes
      const ringOuterGeo = new THREE.TorusGeometry(1.4, 0.06, 16, 64);
      const ringOuter = new THREE.Mesh(ringOuterGeo, brandBlueMat);
      serviceGroup.add(ringOuter);

      const pointerGeo = new THREE.ConeGeometry(0.2, 1.5, 4);
      const pointerMesh = new THREE.Mesh(pointerGeo, glowAccentMat);
      pointerMesh.rotation.z = Math.PI / 4;
      serviceGroup.add(pointerMesh);

      const targetGeo = new THREE.SphereGeometry(0.25, 16, 16);
      const targetMesh = new THREE.Mesh(targetGeo, brandPurpleMat);
      targetMesh.position.set(0.9, 0.9, 0);
      serviceGroup.add(targetMesh);
    }

    // Dynamic Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x322366, 3.0);
    dirLight2.position.set(-4, -3, -2);
    scene.add(dirLight2);

    // Mouse Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      serviceGroup.rotation.y += deltaX * 0.01;
      serviceGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (autoRotate && !isDragging) {
        serviceGroup.rotation.y += delta * 0.4;
        serviceGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [type, isWireframe, autoRotate]);

  return (
    <div className={`relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden glass-panel border border-[#3477bc]/30 flex flex-col items-center justify-center ${className}`}>
      {/* Top 3D Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-auto">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#0f1526]/80 px-2.5 py-1 rounded-md border border-slate-700/50 backdrop-blur-md">
          3D Interactive Model: {serviceTitle}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
              autoRotate
                ? 'bg-[#2559cc]/30 border-[#3477bc] text-sky-200'
                : 'bg-slate-800/80 border-slate-700 text-slate-400'
            }`}
          >
            {autoRotate ? 'Rotate: ON' : 'Rotate: PAUSED'}
          </button>
          <button
            type="button"
            onClick={() => setIsWireframe(!isWireframe)}
            className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
              isWireframe
                ? 'bg-[#3477bc] text-white border-[#60a5fa]'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            Wireframe
          </button>
        </div>
      </div>

      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 pointer-events-none text-[11px] text-slate-400 bg-[#080b14]/70 px-3 py-0.5 rounded-full border border-slate-800 backdrop-blur-sm flex items-center gap-1">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        Click & Drag to rotate in 3D
      </div>
    </div>
  );
};
