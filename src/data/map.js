import * as THREE from 'three';

export default (scene) => {
  // Grass
  const grass = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100, 1, 1),
    new THREE.MeshStandardMaterial({ color: '#689780' })
  );
  grass.receiveShadow = true;
  grass.rotation.x = -Math.PI / 2;
  grass.position.y = -1;
  scene.add(grass);

  // Tree
  const tree = new THREE.Mesh(
    new THREE.ConeBufferGeometry(5, 15, 8, 16),
    new THREE.MeshStandardMaterial({ color: '#005500' })
  );
  tree.receiveShadow = true;
  tree.position.set(
    (Math.random() - 0.5) * 6, 
    0,
    (Math.random() - 0.5) * 3 - 10
  ); 
  scene.add(tree);
}