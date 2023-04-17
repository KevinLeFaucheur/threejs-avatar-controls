import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import { changeColor } from './components/changeColor'

// GUI
const gui = new dat.GUI({ width: 340 });

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.7, 1);
const canvas = document.querySelector('.webgl');

// Grass
const grass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#689780' })
);
grass.rotation.x = -Math.PI / 2;
grass.position.y = -1;
scene.add(grass);

// Geometry
const avatarBody = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.8),
    new THREE.MeshBasicMaterial({ color: '#005555' })
);

const avatarHead = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5),
    new THREE.MeshBasicMaterial({ color: '#FE9090' })
);
avatarHead.position.y = 1;

const avatar = new THREE.Group();
avatar.add( avatarBody );
avatar.add( avatarHead );
scene.add(avatar);

document.querySelector('.canvas__buttons').append(changeColor(avatarBody, 'Body', '#005555'));
document.querySelector('.canvas__buttons').append(changeColor(avatarHead, 'Head', '#FE9090'));

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
    sizes.height = 700;;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width / sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Tick
const clock = new THREE.Clock();
const tick = () => {
    
    const elapsedTime = clock.getElapsedTime();
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();