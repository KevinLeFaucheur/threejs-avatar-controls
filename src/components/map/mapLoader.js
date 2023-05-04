import * as THREE from 'three';
import { setupMesh } from '../../utils/threejsUtils';

export const mapLoad = (map) => {

  switch (map.name) {
    case 'Map 1':
      map.traverse(mesh => {
        if(mesh.name.toLowerCase().includes('tree')) {
          setupMesh(mesh, '#365412');
        }
        else if(mesh.name.toLowerCase().includes('grass')) {
          setupMesh(mesh, '#365412');
        }
        else {
          setupMesh(mesh, '#FEFEFE');
        }
      })
      break;

    case 'Map 2':
      map.traverse(mesh => {
        if(mesh.name.toLowerCase().includes('fruit')) {
          setupMesh(mesh, '#7B4D4C');
        }
        else if(mesh.name.toLowerCase().includes('leaves')) {
          setupMesh(mesh, '#4ED068', true);
        }
        else if(mesh.name.toLowerCase().includes('branch')) {
          setupMesh(mesh, '#4ED068', true);
        }
        else if(mesh.name.toLowerCase().includes('trunk')) {
          setupMesh(mesh, '#B67C3A');
        }
        else if(mesh.name.toLowerCase().includes('fern')) {
          setupMesh(mesh, '#4ED068', true);
        }
        else {
          setupMesh(mesh, '#4ED068');
        }
      })
      break;

    default:
      break;
  }

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