import * as THREE from 'three'
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { skinColor } from "../utils/skinColor";
import { changeAvatar } from '../components/changeAvatar';

export const loadAvatar = (path, avatarGroup) => {
  const fbxLoader = new FBXLoader();

  fbxLoader.load(
    path,
    (object) => {

      const avatar = object;
      avatar.name = 'JOHN';
      
      const configMesh = (avatar) => {
        avatar.children.forEach(group => {
          const bodyColor = { color: '#'+Math.floor(Math.random()*16777215).toString(16) };
          const headColor = { color: skinColor() };
          group.children.forEach(mesh => {
            if(mesh.name === 'Body') mesh.material = new THREE.MeshStandardMaterial(bodyColor);
            else mesh.material = new THREE.MeshStandardMaterial(headColor);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if(group.name === 'FEATURES') mesh.visible = false;
          });
        });
      };
      
      configMesh(avatar);

      document.querySelector('.canvas__swap').append(changeAvatar(avatarGroup, avatar, true));

      scene.add(avatar);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    },
    (error) => {
        console.log(error);
    }
  );
};