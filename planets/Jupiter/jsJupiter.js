const scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.z = 70;

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
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enablePan = false; 
controls.minDistance = 65; 
controls.maxDistance = 75;

// Фиксируем вертикальный угол вращения
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;

const loader = new THREE.GLTFLoader();
let obj = null;

loader.load('models/scene.gltf', function(gltf) {
  obj = gltf;
  obj.scene.scale.set(0.3, 0.15, 0.3); 
  obj.scene.position.y = -0.3; 

  scene.add(obj.scene);
}, undefined, function(error) {
  console.error('Ошибка при загрузке модели:', error);
});

function animate() {
  requestAnimationFrame(animate);

  // Автовращение вокруг оси Y
  if (obj) {
    obj.scene.rotation.y += 0.003;
  }

  controls.update(); 
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth / 2;
  const height = window.innerHeight;
  
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
