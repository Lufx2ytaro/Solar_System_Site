const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.z = 1;


const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth / 2, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('3d-container').appendChild(renderer.domElement);

// Добавляем AmbientLight для равномерного освещения
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.2); // Равномерное освещение со всех сторон
scene.add(ambientLight);

// Добавляем HemisphereLight для мягкого перехода освещения сверху вниз
const hemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0x444444, 1.2); // Верхний свет - белый, нижний - слабый серый
hemisphereLight.position.set(0, 100, 0); // Свет сверху
scene.add(hemisphereLight);

// Подключаем OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement); // Инициализация OrbitControls

const loader = new THREE.GLTFLoader();
let obj = null;

loader.load('models/scene.gltf', function(gltf) {
  obj = gltf;
  obj.scene.scale.set(0.5, 0.25, 0.5); // Измените масштаб, чтобы объект стал больше
  
  // Перемещаем объект вниз по оси Y
  obj.scene.position.y = -0.3;

  obj.scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(obj.scene);
}, undefined, function(error) {
  console.error('Ошибка при загрузке модели:', error);
});

// Ограничиваем зум
controls.minDistance = 0.95; // Минимальное приближение
controls.maxDistance = 1.5;   // Максимальное отдаление


// Ограничиваем вращение вокруг вертикальной оси (по умолчанию это ось Y)
controls.enablePan = false;       // отключаем возможность смещения по оси X и Y
controls.maxPolarAngle = Math.PI / 2;  // ограничение на наклон вверх
controls.minPolarAngle = Math.PI / 2;  // ограничение на наклон вниз

// анимация 
function animate() {
  requestAnimationFrame(animate);

  // Автоматическое вращение модели
  if (obj) {
    obj.scene.rotation.y += 0.005; // Вращение вокруг оси Y
    //obj.scene.rotation.x += 0.002; // Небольшое вращение вокруг оси X для объемности
  }

  controls.update(); // Обновляем контролы
  renderer.render(scene, camera);
}

animate();
