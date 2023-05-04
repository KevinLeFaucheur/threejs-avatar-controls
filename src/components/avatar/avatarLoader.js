import * as THREE from 'three';
import { avatarConfig } from '../../data/avatarConfig';
import { randomHexColor } from "../../utils/randomHexColor";
import { setupMesh } from '../../utils/threejsUtils';

export const avatarLoad = (avatar) => {
  
  avatar.traverse(child => {
    if(child instanceof THREE.Mesh) {
      switch(child.name) {
        case 'Belt':
        case 'Shirt':
        case 'Pants':
          setupMesh(child, randomHexColor());
          break;
        case 'Head':
        case 'Hands':
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