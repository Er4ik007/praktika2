import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Minsk3DWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15; 

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ==========================================
    // 1. ЦЕНТР (Картинка и внутреннее кольцо-рамка)
    // ==========================================
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Общий металлический материал для всех колец
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444, 
      metalness: 0.9, 
      roughness: 0.15,
    });

    // Рамка вокруг картинки (тонкая)
    const frameRingGeometry = new THREE.TorusGeometry(2.3, 0.08, 16, 100);
    const frameRing = new THREE.Mesh(frameRingGeometry, metalMaterial);
    mainGroup.add(frameRing);

    // Диск с картинкой
    const discGeometry = new THREE.CircleGeometry(2.22, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
      (tex) => { tex.colorSpace = THREE.SRGBColorSpace; }
    );
    const discMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    mainGroup.add(discMesh);


    // ==========================================
    // 2. ВНЕШНЕЕ КОЛЬЦО ГИРОСКОПА (Толстое)
    // ==========================================
    const gyroRingGeometry = new THREE.TorusGeometry(3.2, 0.15, 32, 100);
    const gyroRing = new THREE.Mesh(gyroRingGeometry, metalMaterial);
    scene.add(gyroRing);


    // ==========================================
    // 3. ЗВЕЗДА (Гладкий светящийся шар)
    // ==========================================
    const starGroup = new THREE.Group();
    scene.add(starGroup);

    const sphereGeo = new THREE.SphereGeometry(0.5, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0xffaaaa,
      emissive: 0xff0000,
      emissiveIntensity: 0.8,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 1.5,
      transparent: true,
    });
    const starSphere = new THREE.Mesh(sphereGeo, sphereMat);
    starGroup.add(starSphere);

    // Внешняя мягкая аура
    const haloGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false, 
    });
    const starHalo = new THREE.Mesh(haloGeo, haloMat);
    starGroup.add(starHalo);

    const starLight = new THREE.PointLight(0xff0000, 4, 15);
    starGroup.add(starLight);


    // ==========================================
    // 4. ОСВЕЩЕНИЕ И ИНТЕРАКТИВ
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    let targetX = 0; let targetY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) - 0.5;
      targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ==========================================
    // 5. АНИМАЦИЯ
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Анимация картинки
      mainGroup.rotation.y = elapsedTime * 0.4;
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      
      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetY * 0.8, 0.05);
      mainGroup.rotation.z = THREE.MathUtils.lerp(mainGroup.rotation.z, -targetX * 0.5, 0.05);

      // Анимация толстого кольца гироскопа
      gyroRing.rotation.x = elapsedTime * 0.5;
      gyroRing.rotation.y = elapsedTime * 0.3;
      gyroRing.position.y = Math.sin(elapsedTime) * 0.2;

      // Пульсация ауры
      const pulse = 1 + Math.sin(elapsedTime * 4) * 0.1;
      starHalo.scale.set(pulse, pulse, pulse);

      // Орбита шара
      const orbitRadius = 5;
      starGroup.position.x = Math.sin(-elapsedTime * 0.8) * orbitRadius;
      starGroup.position.z = Math.cos(-elapsedTime * 0.8) * orbitRadius;
      starGroup.position.y = Math.sin(elapsedTime * 2) * 1.5;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 550;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 6. ПРАВИЛЬНАЯ ОЧИСТКА ПАМЯТИ
    // ==========================================
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Удаляем ровно те переменные, которые мы создали выше
      frameRingGeometry.dispose();
      gyroRingGeometry.dispose();
      metalMaterial.dispose();
      discGeometry.dispose();
      discMaterial.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    // Мы убрали ограничение w-100 и добавили overflow-visible
    <div ref={containerRef} className="d-flex justify-content-center align-items-center" style={{ minHeight: '550px', width: '120%', marginLeft: '-10%', overflow: 'visible' }}>
      <canvas ref={canvasRef} style={{ outline: 'none' }} />
    </div>
  );
};