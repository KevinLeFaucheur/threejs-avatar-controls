import './css/style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { lightController } from './components/map/lightController';
import { avatarLoad } from './components/avatar/avatarLoader';
import { avatars, maps } from './data/paths';
import { mapController } from './components/map/mapController';
import { mapLoad } from './components/map/mapLoader';
import { load } from './utils/threejsUtils';
import { avatarController } from './components/avatar/avatarController';
import { avatarNames } from "./data/avatarConfig";

// GUI
const gui = new dat.GUI({ width: 340 });

// Scene
export const scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.7, 1);
const canvas = document.querySelector('.webgl');

// Light
const light = new THREE.AmbientLight(0x505050); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight('#FFF', 0.5);
directionalLight.position.set(25, 100, -250);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -50; // default
directionalLight.shadow.camera.right = 50; // default
directionalLight.shadow.camera.top = 50; // default
directionalLight.shadow.camera.bottom = -50; // default
directionalLight.shadow.camera.near = 0.1; // default
directionalLight.shadow.camera.far = 500 // default
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default

const characterLight = new THREE.DirectionalLight('#FFF', 0.4);
characterLight.position.set(0, 0, 2);
scene.add(characterLight);

// Light GUI
// const lightsFolder = gui.addFolder('Lights');
// lightsFolder.add(light, 'intensity', 0, 10, 0.1);

// Sun Mesh
const sun = new THREE.Mesh(
	new THREE.SphereBufferGeometry(10.0, 16, 32),
	new THREE.MeshStandardMaterial({
		color: '#FFF9DB'
})
);
sun.material.emissive = new THREE.Color('#FFDDDD');
sun.position.set(25, 100, -250);
scene.add(directionalLight);
scene.add(sun);

const sky = {
	color: scene.background,
	light: directionalLight,
	sun
}

document.querySelector('.customization--map').append(lightController(sky));

// Light Helper
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

// Maps Group and load first map
export const mapGroup = new THREE.Group();
mapGroup.name = 'Maps';
scene.add(mapGroup);

load(maps[0]).then((object) => { 
	let { scene: map } = object;

	map.name = 'Map 1';
	mapLoad(map);
	mapGroup.add(map);
	document.querySelector('.customization--map').append(mapController(map, mapGroup));
});

// Avatar Group and load first avatar
export const avatarGroup = new THREE.Group();
avatarGroup.name = 'Avatars';
scene.add(avatarGroup);

load(avatars[0]).then((object) => { 
	let { scene: avatar } = object;

	avatar.name = `${avatarNames[Math.floor(Math.random() * (avatarNames.length-1))]}`;
	avatarLoad(avatar);
	avatarGroup.add(avatar);
	document.querySelector('.selectors').append(avatarController(avatar, avatarGroup));
});

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
}, false)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.rotation.x = Math.PI / 4;
camera.position.y = 3;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 1.3, -1);
controls.update();

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
	scene.background.copy(sky.color);
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);

	// console.log(camera);
}
tick();