import { avatars } from "../../data/paths";
import { load } from "../../utils/threejsUtils";
import { updateAvatarController } from "./avatarController";
import { avatarLoad } from "./avatarLoader";

let avatarIndex = 0;

export const selectAvatarController = (avatar, group) => {

  const fragment = document.createRange().createContextualFragment(
    `<div id="${avatar.name}--controller" class="customization__controller">
      <p class='customization__controller--name'>${avatar.name}</p>
    </div>`
  );

  const leftButton = 
    document
      .createRange()
      .createContextualFragment(`<button value=${-1} class="fa fa-angle-left"></button>`);
  const rightButton = 
    document
      .createRange()
      .createContextualFragment(`<button value=${1} class="fa fa-angle-right"></button>`);
    
  leftButton.querySelector('button').onclick = () => onChangeAvatar(-1);
  rightButton.querySelector('button').onclick = () => onChangeAvatar(1);

  fragment.getElementById(`${avatar.name}--controller`).prepend(leftButton);
  fragment.getElementById(`${avatar.name}--controller`).append(rightButton);
  
  const onChangeAvatar = (offset) => {
    let newIndex = (avatarIndex + offset);
    avatarIndex = newIndex < 0 ? avatars.length-1 : newIndex >= avatars.length ? 0 : newIndex;
    
    load(avatars[avatarIndex]).then((object) => { 
      let { scene: avatar } = object;
      
      group.clear();
      avatarLoad(avatar);
      group.add(avatar);

      updateAvatarController(avatar);
    });
  };

  updateAvatarController(avatar);
  return fragment;
};