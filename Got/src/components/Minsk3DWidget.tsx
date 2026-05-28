import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Minsk3DWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 400;

    // 1. Сцена и Камера
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    // 2. Рендерер (альфа-канал true делает фон прозрачным под тему сайта)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Создаем Группу (чтобы кольцо и картинка крутились вместе)
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4. Реальное 3D КОЛЬЦО (Torus)
    // Параметры: радиус, толщина трубки, сегменты
    const ringGeometry = new THREE.TorusGeometry(2.3, 0.12, 16, 100);
    // Металлический красный материал (реагирует на свет)
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Наш красный цвет
      metalness: 0.9,  // Высокая металличность
      roughness: 0.15, // Низкая шероховатость (глянцевый блеск)
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    mainGroup.add(ringMesh);

    // 5. Диск внутри кольца с КАРТИНКОЙ
    const discGeometry = new THREE.CircleGeometry(2.22, 64);
    
    // Загрузчик текстуры
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=800&q=80',
      (tex) => {
        // Настройка правильного отображения текстуры на диске
        tex.colorSpace = THREE.SRGBColorSpace;
      }
    );

    // Двусторонний материал для картинки
    const discMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    mainGroup.add(discMesh);

    // 6. ОСВЕЩЕНИЕ (необходимо для проявления 3D-объема кольца)
    // Мягкий заполняющий свет
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Направленный источник света (создает красивый блик на металле)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 7. ИНТЕРАКТИВ: Наклоняем объект за курсором мыши (BOM)
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Вычисляем координаты мыши от -1 до 1
      targetX = (event.clientX / window.innerWidth) - 0.5;
      targetY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 8. АНИМАЦИЯ (Рендеринг каждого кадра)
    let animationFrameId: number;

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Медленное автоматическое вращение вокруг оси Y
      mainGroup.rotation.y = elapsedTime * 0.4;

      // Плавное покачивание (эффект левитации)
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Плавный наклон за мышкой (сглаживание движения)
      mainGroup.rotation.x = THREE.MathUtils.lerp(mainGroup.rotation.x, targetY * 0.8, 0.05);
      mainGroup.rotation.z = THREE.MathUtils.lerp(mainGroup.rotation.z, -targetX * 0.5, 0.05);

      // Рендерим сцену
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // 9. АДАПТИВНОСТЬ: Изменение размеров при ресайзе окна (BOM)
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 400;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 10. ОЧИСТКА ПАМЯТИ ПРИ УХОДЕ СО СТРАНИЦЫ
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      // Геометрию и материалы нужно удалять из памяти WebGL вручную
      ringGeometry.dispose();
      ringMaterial.dispose();
      discGeometry.dispose();
      discMaterial.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
      <canvas ref={canvasRef} style={{ maxWidth: '100%', maxHeight: '100%', outline: 'none' }} />
    </div>
  );
};