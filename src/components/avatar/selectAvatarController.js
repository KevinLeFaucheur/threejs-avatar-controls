import { avatars } from "../../data/paths";
import { load } from "../../utils/threejsUtils";
import { updateAvatarController } from "./avatarController";
import { avatarLoad } from "./avatarLoader";

let avatarIndex = 0;
let avatarName = '';

export const selectAvatarController = (avatar, group) => {
  let isEditing = false;
  let hasOwnName = false;

  const setIsEditing = () => {
    isEditing = !isEditing;
    if(isEditing) {
      document.querySelector(`#${avatar.name}--controller > p`).replaceWith(inputName);
      inputName.focus();
    } else {
      document.querySelector(`#${avatar.name}--controller > input`).replaceWith(pName);
    }
  };

  const setAvatarName = (value) => {
    avatarName = value;
    pName.innerText = avatarName === '' ? avatar.name : avatarName;
    value === '' ? hasOwnName = false : hasOwnName = true;
    setIsEditing();
  };

  const inputName = document.createElement('input');
  inputName.classList.add('customization__controller--name');
  inputName.style.width = 'auto'
  inputName.setAttribute('type', 'text');
  inputName.placeholder = avatar.name;
  inputName.onblur = (e) => setAvatarName(e.target.value);

  const pName = document.createElement('p');
  pName.onclick = setIsEditing;
  pName.classList.add('customization__controller--name');
  pName.innerHTML = hasOwnName ? avatarName : avatar.name;

  const fragment = document.createRange().createContextualFragment(
    `<div id="${avatar.name}--controller" class="customization__controller"></div>`
  );

  fragment.getElementById(`${avatar.name}--controller`).append(isEditing ? inputName : pName);

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