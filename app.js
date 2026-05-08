/* Qynct One | 3D Core Engine v5.0 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#super-engine'), antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// ৩ডি গ্লোবাল ম্যাট্রিক্স (The Globe)
const globeGeometry = new THREE.SphereGeometry(4, 128, 128);
const globeMaterial = new THREE.MeshPhongMaterial({
    color: 0x0071e3, wireframe: true, transparent: true, opacity: 0.1
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// হাই-স্পিড পার্টিকেল সিস্টেম (Stars)
const starCount = 15000;
const starGeo = new THREE.BufferGeometry();
const starPositions = new Float32Array(starCount * 3);
for(let i=0; i<starCount*3; i++) starPositions[i] = (Math.random() - 0.5) * 60;
starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.015, color: 0x0071e3 }));
scene.add(stars);

// লাইটিং সেটআপ
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(10, 10, 10);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
camera.position.z = 15;

// মাউস এবং স্ক্রল ইন্টারঅ্যাকশন
let targetX = 0, targetY = 0;
document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX - window.innerWidth / 2) * 0.001;
    targetY = (e.clientY - window.innerHeight / 2) * 0.001;
});

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.0015;
    stars.rotation.y += 0.0002;
    globe.rotation.x += (targetY - globe.rotation.x) * 0.05;
    globe.rotation.z += (targetX - globe.rotation.z) * 0.05;
    renderer.render(scene, camera);
}
animate();

// GSAP সিনেম্যাটিক স্ক্রল অ্যানিমেশন
gsap.to(globe.position, {
    scrollTrigger: {
        trigger: ".hero-gate", start: "top top", end: "bottom top", scrub: 2
    },
    z: 5, y: -2, opacity: 0
});
