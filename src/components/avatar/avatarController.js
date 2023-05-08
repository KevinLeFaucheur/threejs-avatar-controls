import { avatars } from "../../data/paths";
import { load } from "../../utils/threejsUtils";
import { changeColor } from "../changeColor";
import { changeFeature } from "../changeFeature";
import { avatarLoad } from "./avatarLoader";
import { avatarNames } from "../../data/avatarConfig";

let avatarIndex = 0;

const updateAvatarController = (avatar) => {
  document.querySelector('.customization--avatar').innerHTML = '';
  document.querySelector('.customization--features').innerHTML = '';

  avatar.children.forEach(group => {

    switch(group.name) {
      case 'AVATAR':
      case 'SKIN':
      case 'EYES':
        group.children.forEach(mesh => {
          if(mesh.name.includes('skin')) {
            document.querySelector('.customization--avatar').append(changeColor(mesh, true));
          }
          else if(mesh.name !== 'Base') {
            document.querySelector('.customization--avatar').append(changeColor(mesh));
          }
        });
        break;
      case 'FEATURES':
        group.children.forEach(subgroup => {
          const feature = subgroup.children.find(mesh => mesh.name.includes('Empty'));
          document.querySelector('.customization--features').append(changeFeature(feature));
        });
        break;
    }
  });
}

export const avatarController = (avatar, group) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div id="customization__controller--avatar" class="customization__controller">

      <button class="fa fa-angle-left"></button>

      <p class='customization__controller--name'>${avatar.name}</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  fragment.querySelectorAll('#customization__controller--avatar > button').forEach((element, index) => {
    element.onclick = () => {

      let offset = index === 0 ? -1 : 1;
      let newIndex = (avatarIndex + offset);
      avatarIndex = newIndex < 0 ? avatars.length-1 : newIndex >= avatars.length ? 0 : newIndex;
      
      group.clear();

      load(avatars[avatarIndex]).then((object) => { 
        let { scene: avatar } = object;

        avatar.name = `${avatarNames[Math.floor(Math.random() * (avatarNames.length-1))]}`;
        avatarLoad(avatar);
        group.add(avatar);

        document.querySelector('.customization__controller--name').innerHTML = avatar.name;
      });
    }
  });

  updateAvatarController(avatar);
  return fragment;
};