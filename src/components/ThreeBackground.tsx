'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check prefers-reduced-motion
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    const container = containerRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 30;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Objects
    // 1. Floating particles
    const particlesCount = 350;
    const positionArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      positionArray[i] = (Math.random() - 0.5) * 60; // Spread x, y, z
    }
    
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    );

    // Creating glowing circular texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x818cf8, // Indigo
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // 2. Floating wireframe ring and glass spheres
    const ringGeometry = new THREE.TorusGeometry(10, 0.15, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7, // Purple
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Glass spheres
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      roughness: 0.1,
      metalness: 0.1,
      transparent: true,
      opacity: 0.25,
      transmission: 0.6,
      ior: 1.2,
      thickness: 1.5,
    });
    const mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(mainSphere);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Directional lighting reacting to cursor
    const directionalLight1 = new THREE.DirectionalLight(0x818cf8, 2);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xec4899, 1.5);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    // Mouse responsiveness
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) / 100;
      mouseY = (e.clientY - window.innerHeight / 2) / 100;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();

    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow movements
      mainSphere.position.y = Math.sin(elapsedTime * 0.5) * 1.5;
      mainSphere.position.x = Math.cos(elapsedTime * 0.3) * 1.5;
      mainSphere.rotation.y = elapsedTime * 0.1;
      mainSphere.rotation.x = elapsedTime * 0.05;

      ring.rotation.z = -elapsedTime * 0.05;
      
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      // Mouse interactive camera movement with easing
      targetX = mouseX * 0.5;
      targetY = -mouseY * 0.5;

      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (targetY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Render
      renderer.render(scene, camera);

      // Repeat
      animationFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-50"
    />
  );
}
