const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe-container').appendChild(renderer.domElement);

// গ্লোয়িং ৩ডি গ্লোব
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshPhongMaterial({ color: 0x0071e3, wireframe: true });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// নক্ষত্রপুঞ্জ (Stars)
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(10000 * 3);
for(let i=0; i<30000; i++) starPos[i] = (Math.random() - 0.5) * 50;
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.02, color: 0xffffff }));
scene.add(stars);

scene.add(new THREE.AmbientLight(0xffffff, 0.8));
camera.position.z = 8;

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;
    stars.rotation.y += 0.0002;
    renderer.render(scene, camera);
}
animate();
