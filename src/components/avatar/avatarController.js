import { meshColorController } from "../meshColorController";
import { selectFeatureController } from "../selectFeatureController";
import { skinColors } from "../../data/avatarConfig";

export const updateAvatarController = (avatar) => {
  document.querySelector('.customization--avatar').innerHTML = '';
  document.querySelector('.customization--features').innerHTML = '';
  document.querySelector('.customization__controller--name').innerHTML = avatar.name;

  avatar.children.forEach(group => {

    switch(group.name) {
      case 'AVATAR':
        group.children.forEach(mesh => {
          document.querySelector('.customization--avatar').append(meshColorController(mesh));
        });
        break;
      case 'SKIN':
        document.querySelector('.customization--avatar').append(meshColorController(group.children, skinColors));
        break;
      case 'EYES':
        group.children.forEach(mesh => {
          if(mesh.name !== 'Base') {
            document.querySelector('.customization--avatar').append(meshColorController(mesh));
          }
        });
        break;
      case 'HAIR':
        document.querySelector('.customization--avatar').append(meshColorController(group.children));
        break;
      case 'FEATURES':
        group.children.forEach(subgroup => {
          const feature = subgroup.children.find(mesh => mesh.name.includes('None'));
          document.querySelector('.customization--features').append(selectFeatureController(feature));
        });
        break;
    }
  });
};