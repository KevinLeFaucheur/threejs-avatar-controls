import * as THREE from 'three';
import { avatarConfig } from '../../data/avatarConfig';
import { randomHexColor } from "../../utils/randomHexColor";
import { setupMesh } from '../../utils/threejsUtils';
import avatars from '../../data/avatars.json';

export const avatarLoad = (avatar) => {

  // let avatarFile = avatars.find(object => object.name === avatar.name);
  // console.log(avatar);

  // avatar.traverse(currentMesh => {

  //   if(currentMesh instanceof THREE.Mesh) {
  //     let meshConfig = avatarFile.meshes.find(mesh => currentMesh.name.toLowerCase().includes(mesh.name.toLowerCase()));

  //     console.log(meshConfig);

  //     if(meshConfig && !meshConfig.hasOwnProperty('color')) {
  //       meshConfig.color = randomHexColor();
  //     }
  //     if(meshConfig && meshConfig.hasOwnProperty('double-sided')) {
  //       setupMesh(currentMesh, meshConfig.color, meshConfig['double-sided']);
  //     } 
  //     else if(currentMesh.name.toLowerCase().includes('skin')) {
  //       setupMesh(currentMesh, avatarConfig.colors.skin);
  //     }
  //     else if(meshConfig) {
  //       setupMesh(currentMesh, randomHexColor());
  //     }
  //     else 
  //     {
  //       setupMesh(currentMesh, randomHexColor());
  //       currentMesh.visible = false;
  //     }
  //   }
  // });
  
  avatar.traverse(child => {
    if(child instanceof THREE.Mesh) {
      switch(child.name) {
        case 'Belt':
        case 'Shirt':
        case 'Pants':
          setupMesh(child, randomHexColor());
          break;
        case 'Head_skin':
        case 'Hands_skin':
          setupMesh(child, avatarConfig.colors.skin);
          break;
        case 'Base':
          setupMesh(child, avatarConfig.colors.eye);
          break;
        case 'Iris':
          setupMesh(child, avatarConfig.colors.iris);
          break;
        case 'Brows':
          setupMesh(child, avatarConfig.colors.brows);
          break;
        default:
          setupMesh(child, randomHexColor());
          child.visible = false;
          if(['Glasses', 'Cap'].some(string => child.name.includes(string))) {
            child.material.side = THREE.DoubleSide;
          }
          if(!child.name.includes('_') && !child.name.includes('Empty') ) {
              // avatarFolder.add(child, 'visible', child.visible).name(child.name).onChange(() => child.visible = !child.visible); 
          }
      }
    }
  });
}