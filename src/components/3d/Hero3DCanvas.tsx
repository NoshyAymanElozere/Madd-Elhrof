import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  className?: string;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.z = 6.8;
    camera.position.y = 0.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group for mouse interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Refined Corporate Brand Sculpture (Polished Titanium & Royal Sapphire Core)
    const sculptureGeo = new THREE.IcosahedronGeometry(1.6, 2);
    const sculptureMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e3a8a, // Deep royal blue
      emissive: 0x172554,
      emissiveIntensity: 0.2,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
    const sculptureMesh = new THREE.Mesh(sculptureGeo, sculptureMat);
    mainGroup.add(sculptureMesh);

    // Subtle Architectural Wireframe Matrix
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireMesh = new THREE.Mesh(sculptureGeo, wireMat);
    wireMesh.scale.set(1.015, 1.015, 1.015);
    mainGroup.add(wireMesh);

    // 2. Twin Polished Precision Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.02, 16, 120);
    const ringMat1 = new THREE.MeshPhysicalMaterial({
      color: 0x3477bc,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      transparent: true,
      opacity: 0.75,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 5;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.65, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.8;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    // 3. Subtle Strategic Markers (Small polished spheres)
    const markerGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const markerMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      metalness: 0.9,
      roughness: 0.1,
    });

    const markers: THREE.Mesh[] = [];
    const markerAngles = [0, Math.PI * 0.66, Math.PI * 1.33];
    markerAngles.forEach((angle) => {
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 2.35 * 0.4, Math.sin(angle) * 0.8);
      ring1.add(marker);
      markers.push(marker);
    });

    // 4. Balanced Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const blueFillLight = new THREE.DirectionalLight(0x3477bc, 1.8);
    blueFillLight.position.set(-5, -2, 3);
    scene.add(blueFillLight);

    const purpleRimLight = new THREE.PointLight(0x818cf8, 2.5, 15);
    purpleRimLight.position.set(0, -4, -3);
    scene.add(purpleRimLight);

    // Mouse Tracking for Smooth Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 0.4;
      mouseY = -(y / rect.height) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      mainGroup.rotation.y = targetX + elapsedTime * 0.12;
      mainGroup.rotation.x = targetY + Math.sin(elapsedTime * 0.25) * 0.05;

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.y = -elapsedTime * 0.12;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sculptureGeo.dispose();
      sculptureMat.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[380px] sm:min-h-[440px] relative pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
