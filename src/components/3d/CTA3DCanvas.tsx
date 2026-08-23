import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CTA3DCanvasProps {
  className?: string;
}

export const CTA3DCanvas: React.FC<CTA3DCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

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

    // Subtle Concentric Precision Rings
    const ringCount = 3;
    const rings: THREE.Mesh[] = [];

    for (let i = 0; i < ringCount; i++) {
      const radius = 1.6 + i * 0.55;
      const ringGeo = new THREE.TorusGeometry(radius, 0.015, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x3477bc : i === 1 ? 0x2559cc : 0x6366f1,
        transparent: true,
        opacity: 0.45 - i * 0.1,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / (2.5 + i * 0.4);
      ring.rotation.y = (i * Math.PI) / 4;
      group.add(ring);
      rings.push(ring);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      rings.forEach((ring, idx) => {
        ring.rotation.z = elapsed * (0.08 + idx * 0.03) * (idx % 2 === 0 ? 1 : -1);
        ring.rotation.x = Math.sin(elapsed * 0.15 + idx) * 0.25;
      });

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
      className={`w-full h-full min-h-[300px] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};
