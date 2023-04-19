import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as dat from 'dat.gui'

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


// Geometry
createMap(scene);

const avatarGroup = new THREE.Group();
const fbxAvatar = new THREE.Group();
const avatars = createAvatars();
// avatarGroup.add(avatars[0]);
avatarGroup.add(fbxAvatar);
avatarGroup.name = 'avatars';
scene.add(avatarGroup);

const fbxLoader = new FBXLoader();
fbxLoader.load(
	'./models/avatar_01.fbx',
	(object) => {
			const children = [...object.children];
			children.forEach(child => fbxAvatar.add(child));

			console.log(fbxAvatar.children.length);
			fbxAvatar.children.forEach(mesh => {
				mesh.material = new THREE.MeshStandardMaterial({ color: '#'+Math.floor(Math.random()*16777215).toString(16) });
				mesh.material.castShadow = true;
				mesh.material.receiveShadow = true;
			});
			fbxAvatar.name = 'FBX AVATAR';
			document.querySelector('.canvas__swap').append(changeAvatar(avatarGroup, [fbxAvatar]/*avatars*/, true));
			scene.add(fbxAvatar);
	},
	(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	},
	(error) => {
			console.log(error);
	}
);

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
camera.rotation.x = Math.PI / 4;
camera.position.y = 5;
camera.position.z = 5;
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

	// console.log(camera);
}
tick();