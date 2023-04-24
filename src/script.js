import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { skinColor } from "./utils/skinColor";
import { changeAvatar } from './components/changeAvatar';
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
directionalLight.position.set(0, 10, 2);
directionalLight.castShadow = true;
directionalLight.shadow.camera.left = -50; // default
directionalLight.shadow.camera.right = 50; // default
directionalLight.shadow.camera.top = 50; // default
directionalLight.shadow.camera.bottom = -50; // default
directionalLight.shadow.camera.near = 0.1; // default
directionalLight.shadow.camera.far = 50 // default
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
scene.add(directionalLight);

// Light GUI
const lightsFolder = gui.addFolder('Lights');
lightsFolder.add(light, 'intensity', 0, 10, 0.1);

// Light Helper
// const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(helper);
// const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(cameraHelper);

// Geometry
createMap(scene);

const avatarGroup = new THREE.Group();
avatarGroup.name = 'avatars';
scene.add(avatarGroup);

const avatars = createAvatars();

const fbxLoader = new FBXLoader();
fbxLoader.load(
	'./models/avatar_01.fbx',
	(object) => {

		const avatar = object;
		avatar.name = 'JOHN';
		
		const configMesh = (avatar) => {
			avatar.children.forEach(group => {
				const bodyColor = { color: '#'+Math.floor(Math.random()*16777215).toString(16) };
				const headColor = { color: skinColor() };
				group.children.forEach(mesh => {
					if(mesh.name === 'Body') mesh.material = new THREE.MeshStandardMaterial(bodyColor);
					else mesh.material = new THREE.MeshStandardMaterial(headColor);
					mesh.castShadow = true;
					mesh.receiveShadow = true;

					if(group.name === 'FEATURES') {
						group.traverse((mesh) => {
							mesh.material = new THREE.MeshStandardMaterial({ color: '#'+Math.floor(Math.random()*16777215).toString(16) });
							mesh.castShadow = true;
							mesh.receiveShadow = true;
							mesh.visible = false;
						})
					}
				});
			});
		};
		
		configMesh(avatar);

		document.querySelector('.canvas__swap').append(changeAvatar(avatarGroup, avatar, true));

		scene.add(avatar);
	},
	(xhr) => {
			console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
	},
	(error) => {
			console.log(error);
	}
);

// const loader = new FBXLoader();
// const returnFBX = async () => {
// 	return loader.load(
// 		'./models/avatar_01.fbx',
// 	 	(object) => {
// 			return object;
// 		}
// 	);
// }

// let afterloadObject = returnFBX().then(data => data);
// console.log(afterloadObject);

// console.log(test);

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
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);

	// console.log(camera);
}
tick();