import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { maps } from './paths'
import { mapController } from '../components/map/mapController';

export default (scene) => {

  // Map 
  const sceneGroup = new THREE.Group();
  const mapsGroup = new THREE.Group();
  mapsGroup.name = 'Maps';
  
  const fbxLoader = new FBXLoader();
  
  maps.forEach((map, index) => fbxLoader.load(
    map,
    (object) => {
      object.traverse((mesh) => {
        if(mesh.name.toLowerCase().includes('tree')) {
          mesh.material = new THREE.MeshStandardMaterial({ color: '#365412' });
        }
        else if(mesh.name.toLowerCase().includes('grass')) {
          mesh.material = new THREE.MeshStandardMaterial({ color: '#365412' });
        }
        else {
          mesh.material = new THREE.MeshStandardMaterial({ color: '#FEFEFE' });
        }
        mesh.castShadow = true;
        mesh.material.side = THREE.DoubleSide;
        // mesh.receiveShadow = true;
      })

      mapsGroup.add(object);

      if(index === 0) {
        let mapIndex = index + 1;
        object.name = 'Map ' + mapIndex;
        sceneGroup.add(object);
        document.querySelector('.customization--map').append(mapController(object));
      }
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    })
  );

  // Grass
  const grass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(300, 300, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#689780' })
  );
  grass.receiveShadow = true;
  grass.rotation.x = -Math.PI / 2;
  // sceneGroup.add(grass);
  sceneGroup.name = 'Maps';
  
  
  scene.add(grass);
  scene.add(sceneGroup);
};