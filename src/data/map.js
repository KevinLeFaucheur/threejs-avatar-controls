import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export default (scene) => {

  // Map 
  const map = new THREE.Group();
  
  const fbxLoader = new FBXLoader();
  
  fbxLoader.load(
    './models/tree.fbx',
    (object) => {
      console.log(object);
      object.children[0].material = new THREE.MeshStandardMaterial({ color: '#005500' });
      object.children[0].castShadow = true;
      object.children[0].receiveShadow = true;
      object.children[0].position.set(
        (Math.random() - 0.5) * 6, 
        0,
        (Math.random() - 0.5) * 3 - 10
      ); 
      map.add(object.children[0]);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
  );

  // Grass
  const grass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#689780' })
  );
  grass.receiveShadow = true;
  grass.rotation.x = -Math.PI / 2;
  // grass.position.y = -1;
  map.add(grass);

  // Tree
  // const tree = new THREE.Mesh(
  //   new THREE.ConeBufferGeometry(5, 15, 8, 16),
  //   new THREE.MeshStandardMaterial({ color: '#005500' })
  // );
  // tree.castShadow = true;
  // tree.receiveShadow = true;
  // tree.position.set(
  //   (Math.random() - 0.5) * 6, 
  //   15 / 2,
  //   (Math.random() - 0.5) * 3 - 10
  // ); 

  scene.add(map);
};