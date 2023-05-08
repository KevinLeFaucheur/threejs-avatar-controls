import { setupMesh } from '../../utils/threejsUtils';
import maps from '../../data/maps.json';

export const mapLoad = (map) => {

  let mapConfig = maps.find(object => object.name === map.name);

  map.traverse(currentMesh => {
    let meshConfig = mapConfig.meshes.find(mesh => currentMesh.name.toLowerCase().includes(mesh.name.toLowerCase()));
    if(meshConfig) {
      setupMesh(currentMesh, meshConfig.color, meshConfig['double-sided']);
    }
  });
};