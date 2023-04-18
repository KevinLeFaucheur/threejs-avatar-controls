import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import { changeColor } from './components/changeColor'
import { changeAvatar } from './components/changeAvatar'
import createMap from './data/map'
import createAvatars from './data/avatars'

// GUI
const gui = new dat.GUI({ width: 340 });

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.7, 1);
const canvas = document.querySelector('.webgl');

// Light
const light = new THREE.AmbientLight(0x505050); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 5, 2);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Light GUI
const lightsFolder = gui.addFolder('Lights');
lightsFolder.add(light, 'intensity', 0, 10, 0.1);

// Light Helper
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);

createMap(scene);

// Geometry
const avatarGroup = new THREE.Group();
const avatars = createAvatars();
avatarGroup.add(avatars[0]);
avatarGroup.name = 'avatars';
scene.add(avatarGroup);

document.querySelector('.canvas__buttons').append(changeColor(avatarGroup.children[0].children[0]));
document.querySelector('.canvas__buttons').append(changeColor(avatarGroup.children[0].children[1]));
		
document.querySelector('.canvas__swap').append(changeAvatar(avatarGroup, avatars));
document.querySelector('.avatar--name').textContent = avatarGroup.children[0].name;

// Camera
// const sizes = {
//     width: window.innerWidth / 1.5,
//     height: window.innerHeight / 1.5,
// }
const sizes = {
	width: 500,
	height: 700,
}

window.addEventListener('resize', () =>{
	sizes.width = 500;
	sizes.height = 700;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width / sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 5;
camera.position.y = 1.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Tick
const clock = new THREE.Clock();
const tick = () => {
    
	const elapsedTime = clock.getElapsedTime();
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);
}
tick();