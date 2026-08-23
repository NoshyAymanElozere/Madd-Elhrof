import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BrandEmblem3DProps {
  className?: string;
}

export const BrandEmblem3D: React.FC<BrandEmblem3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(2.8, 2.5, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Isometric Box Base (Brand Identity Symbol from logo)
    const boxBaseGeo = new THREE.BoxGeometry(1.6, 0.8, 1.6);
    const boxBaseMat = new THREE.MeshPhysicalMaterial({
      color: 0x2559cc,
      emissive: 0x322366,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const boxBase = new THREE.Mesh(boxBaseGeo, boxBaseMat);
    boxBase.position.y = -0.5;
    group.add(boxBase);

    // Box Open Flap Walls
    const wallGeo = new THREE.BoxGeometry(1.6, 1.4, 0.1);
    const wallMat = new THREE.MeshPhysicalMaterial({
      color: 0x3477bc,
      metalness: 0.8,
      roughness: 0.15,
      clearcoat: 0.8,
    });

    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.position.set(-0.75, 0.3, 0);
    leftWall.rotation.y = Math.PI / 2;
    group.add(leftWall);

    const backWall = new THREE.Mesh(wallGeo, wallMat);
    backWall.position.set(0, 0.3, -0.75);
    group.add(backWall);

    // 2. Central 3D Pen Nib / Calligraphy Monolith
    const penNibGeo = new THREE.ConeGeometry(0.35, 1.2, 4);
    const penNibMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      emissive: 0x2559cc,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
    });
    const penNib = new THREE.Mesh(penNibGeo, penNibMat);
    penNib.position.set(0, 0.4, 0);
    penNib.rotation.y = Math.PI / 4;
    group.add(penNib);

    // Pen Nib Shaft
    const shaftGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8);
    const shaftMat = new THREE.MeshStandardMaterial({
      color: 0x322366,
      metalness: 0.9,
      roughness: 0.2,
    });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.position.set(0, 1.2, 0);
    group.add(shaft);

    // 3. Orbiting Sparkles / Particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 60;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 1.4 + Math.random() * 0.9;
      const th = Math.random() * Math.PI * 2;
      pPos[i * 3] = Math.cos(th) * r;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
      pPos[i * 3 + 2] = Math.sin(th) * r;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.05,
      transparent: true,
      opacity: 0.9,
    });
    const pPoints = new THREE.Points(pGeo, pMat);
    group.add(pPoints);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambLight);

    const dLight1 = new THREE.DirectionalLight(0x3477bc, 3.0);
    dLight1.position.set(5, 5, 5);
    scene.add(dLight1);

    const dLight2 = new THREE.DirectionalLight(0x322366, 2.0);
    dLight2.position.set(-3, -3, -3);
    scene.add(dLight2);

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      group.rotation.y = elapsed * 0.35;
      group.position.y = Math.sin(elapsed * 1.5) * 0.08;
      pPoints.rotation.y = -elapsed * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full h-[320px] sm:h-[380px] flex items-center justify-center ${className}`}
    />
  );
};
