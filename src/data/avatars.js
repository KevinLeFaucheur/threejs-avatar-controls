import * as THREE from 'three'

// export default [
//   {
//     create: () => { 
//       avatarBody = new THREE.Mesh(
//         new THREE.SphereBufferGeometry(0.8),
//         new THREE.MeshBasicMaterial({ color: '#005555' })
//       ),
//       avatarHead = new THREE.Mesh(
//         new THREE.SphereBufferGeometry(0.5),
//         new THREE.MeshBasicMaterial({ color: '#FE9090' })
//       ),
//       avatarHead.position.y = 1; 
//     }
//   },
// ];

export default () => {
  // Avatar 1
  const avatarBody1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.8, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#7CFEFE' })
  );
  avatarBody1.name = 'Body';
  avatarBody1.castShadow = true;
  avatarBody1.receiveShadow = true;
  avatarBody1.material.metalness = 0.3;
  avatarBody1.material.roughness = 0.3;
  
  const avatarHead1 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#FF9090' })
  );
  avatarHead1.name = 'Head';
  avatarHead1.position.y = 1;
  avatarHead1.castShadow = true;
  avatarHead1.receiveShadow = true;
  
  const avatar1 = new THREE.Group();
  avatar1.add(avatarBody1);
  avatar1.add(avatarHead1);
  avatar1.name = 'avatar1';

  // Avatar 2
  const avatarBody2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.8, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#0055FF' })
  );
  avatarBody2.name = 'Body';
  avatarBody2.castShadow = true;
  avatarBody2.receiveShadow = true;
  avatarBody2.material.metalness = 0.3;
  avatarBody2.material.roughness = 0.3;
      
  const avatarHead2 = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5, 16, 12),
    new THREE.MeshStandardMaterial({ color: '#FF5555' })
  );
  avatarHead2.name = 'Head';
  avatarHead2.castShadow = true;
  avatarHead2.receiveShadow = true;
  avatarHead2.position.y = 1;
  
  const avatar2 = new THREE.Group();
  avatar2.add(avatarBody2);
  avatar2.add(avatarHead2);
  avatar2.name = 'avatar2';

  return [avatar1, avatar2];
}