import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { skinColor } from "./utils/skinColor";
import { changeAvatar } from './components/changeAvatar';
import createMap from './data/map'
import { avatars } from './data/paths'
import { lightController } from './components/map/lightController';


// GUI
const gui = new dat.GUI({ width: 340 });

// Scene
const scene = new THREE.Scene();
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
directionalLight.shadow.camera.far = 50 // default
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default


// Light GUI
const lightsFolder = gui.addFolder('Lights');
lightsFolder.add(light, 'intensity', 0, 10, 0.1);

// Sun Mesh
const sun = new THREE.Mesh(
	new THREE.SphereBufferGeometry(10.0, 16, 32),
	new THREE.MeshBasicMaterial({
		color: '#FFF9DB'
})
);
sun.material.flatShading = true
sun.position.set(25, 100, -250);
scene.add(directionalLight);
scene.add(sun);
document.querySelector('.customization--map').append(lightController(directionalLight, sun));

// Light Helper
const helper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(helper);
const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

// Geometry
createMap(scene);

const avatarGroup = new THREE.Group();
avatarGroup.name = 'avatars';
scene.add(avatarGroup);

// Avatar GUI
const avatarFolder = gui.addFolder('Avatar');

const loader = new GLTFLoader();
loader.load(
	avatars[0],
	(gltf) => {

		const avatar = gltf.scene;
		avatar.name = 'JOHN';
		const bodyColor = { color: skinColor() };
		const baseEyeColor = { color: '#FFF' };
		const irisColor = { color: '#'+Math.floor(Math.random()*16777215).toString(16) };
		const browsColor = { color: '#'+Math.floor(Math.random()*16777215).toString(16) };
		
		const configMesh = (avatar) => {
			avatar.traverse(child => {
				if(child instanceof THREE.Mesh) {
					switch(child.name) {
						// case 'Body':
						case 'Belt':
						case 'Shirt':
						case 'Pants':
							child.material = new THREE.MeshStandardMaterial({ color: '#'+Math.floor(Math.random()*16777215).toString(16) });
							child.castShadow = true;
							child.receiveShadow = true;
							avatarFolder.add(child, 'visible', true).name(child.name).onChange(() => child.visible = !child.visible); 
							break;
						case 'Head':
						case 'Hands':
							child.material = new THREE.MeshStandardMaterial(bodyColor);
							child.castShadow = true;
							child.receiveShadow = true;
							avatarFolder.add(child, 'visible', true).name(child.name).onChange(() => child.visible = !child.visible); 
							break;
						case 'Base':
							child.material = new THREE.MeshStandardMaterial(baseEyeColor);
							child.castShadow = true;
							child.receiveShadow = true;
							avatarFolder.add(child, 'visible', true).name(child.name).onChange(() => child.visible = !child.visible); 
							break;
						case 'Iris':
							child.material = new THREE.MeshStandardMaterial(irisColor);
							child.castShadow = true;
							child.receiveShadow = true;
							avatarFolder.add(child, 'visible', true).name(child.name).onChange(() => child.visible = !child.visible); 
							break;
						case 'Brows':
							child.material = new THREE.MeshStandardMaterial(browsColor);
							child.castShadow = true;
							child.receiveShadow = true;
							avatarFolder.add(child, 'visible', true).name(child.name).onChange(() => child.visible = !child.visible); 
							break;
						default:
							child.material = new THREE.MeshStandardMaterial({ color: '#'+Math.floor(Math.random()*16777215).toString(16) });
							child.castShadow = true;
							child.receiveShadow = true;
							child.visible = false;
							if(['Glasses', 'Cap'].some(string => child.name.includes(string))) {
								child.material.side = THREE.DoubleSide;
							}
							// console.log(child);
							if(!child.name.includes('_') && !child.name.includes('Empty') ) {
									avatarFolder.add(child, 'visible', child.visible).name(child.name).onChange(() => child.visible = !child.visible); 
							}
					}
				}
			});
		};
		
		configMesh(avatar);

		document.querySelector('.selectors').append(changeAvatar(avatarGroup, avatar, true));
		avatarGroup.add(avatar);

		scene.add(avatar);
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
	renderer.render(scene, camera);
	window.requestAnimationFrame(tick);

	// console.log(camera);
}
tick();