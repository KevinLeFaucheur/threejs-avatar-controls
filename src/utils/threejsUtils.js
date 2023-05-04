import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const setupMesh = (mesh, color, doubleSide = false) => {
  mesh.material = new THREE.MeshStandardMaterial({ color });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if(doubleSide) mesh.material.side = THREE.DoubleSide;
}

export const load = (model) => {
	return new Promise((resolve, reject) => {
	
		const loader = new GLTFLoader();
		loader.load(model, (object) => {
			resolve(object);
		});
	});
};