import * as THREE from 'three'

export default [
  {
    create: () => { 
      avatarBody = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.8),
        new THREE.MeshBasicMaterial({ color: '#005555' })
      ),
      avatarHead = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.5),
        new THREE.MeshBasicMaterial({ color: '#FE9090' })
      ),
      avatarHead.position.y = 1; 
    }
  },
];