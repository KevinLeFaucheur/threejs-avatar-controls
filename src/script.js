import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import { changeColor } from './components/changeColor'
import { changeAvatar } from './components/changeAvatar'
import map from './data/map'

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

map(scene);

// Geometry
const avatarBody = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.8, 16, 12),
	new THREE.MeshStandardMaterial({ color: '#7CFEFE' })
);
avatarBody.name = 'Body';
avatarBody.castShadow = true;
avatarBody.receiveShadow = true;
avatarBody.material.metalness = 0.3;
avatarBody.material.roughness = 0.3;

const avatarHead = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 12),
	new THREE.MeshStandardMaterial({ color: '#FF9090' })
);
avatarHead.name = 'Head';
avatarHead.position.y = 1;
avatarHead.castShadow = true;
avatarHead.receiveShadow = true;

const avatar1 = new THREE.Group();
avatar1.add(avatarBody);
avatar1.add(avatarHead);
avatar1.name = 'avatar1';

document.querySelector('.canvas__buttons').append(changeColor(avatarBody, 'Body', '#7CFEFE'));
document.querySelector('.canvas__buttons').append(changeColor(avatarHead, 'Head', '#FF9090'));

// Avatar 2
const avatarBody2 = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.8, 16, 12),
	new THREE.MeshStandardMaterial({ color: '#0055FF' })
);
avatarBody2.name = 'Body';
avatarBody2.castShadow = true;
avatarBody2.receiveShadow = true;
avatarBody2.material.metalness = 0.3;
avatarBody2.material.roughness = 0.3;
    
const avatarHead2 = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 12),
	new THREE.MeshStandardMaterial({ color: '#FF5555' })
);
avatarHead2.name = 'Head';
avatarHead2.castShadow = true;
avatarHead2.receiveShadow = true;
avatarHead2.position.y = 1;

const avatar2 = new THREE.Group();
avatar2.add(avatarBody2);
avatar2.add(avatarHead2);
avatar2.name = 'avatar2';

const avatars = new THREE.Group();
avatars.add(avatar1);
avatars.name = 'avatars';
scene.add(avatars);
		
document.querySelector('.canvas__swap').append(changeAvatar(avatars, [avatar1, avatar2]));
document.querySelector('.avatar--name').textContent = avatar1.name;

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