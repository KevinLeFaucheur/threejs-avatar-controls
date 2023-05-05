import * as THREE from 'three';
import { setupMesh } from '../../utils/threejsUtils';
import maps from '../../data/maps.json';

export const mapLoad = (map) => {

  let mapFile = maps.find(object => object.name === map.name);

  map.traverse(currentMesh => {
    let meshConfig = mapFile.meshes.find(mesh => currentMesh.name.toLowerCase().includes(mesh.name));
    if(meshConfig) {
      setupMesh(currentMesh, meshConfig.color, meshConfig['double-sided']);
    }
  });

  // Grass
  const grass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(300, 300, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#689780' })
  );

  grass.receiveShadow = true;
  grass.rotation.x = -Math.PI / 2;
  grass.name = 'Grass';  
  map.add(grass);
};