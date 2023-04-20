import * as THREE from 'three'
import { changeColor } from './changeColor';
import { addFeatureButton } from './addFeatureButton';

export const changeAvatar = (group, avatars, init = false) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__swapControls">

      <button><i class="fa fa-angle-left"></i></button>

      <p class='avatar--name'>Test</p>

      <button><i class="fa fa-angle-right"></i></button>

    </div>
    `
  );

  const loadNewAvatar = (index) => {
    let avatar = null;

    if(group?.children?.find(avatar => avatar.name === 'avatar1')){
      group.clear();
      avatar = avatars[1];
    } 
    else {
      group.clear();
      avatar = avatars[0];
    }
    group.add(avatar);

    reloadAvatarUI(avatar);
    document.querySelector('.avatar--name').textContent = avatar.name;
  };

  const reloadAvatarUI = (avatar) => {
    console.log(avatar);
    document.querySelector('.canvas__buttons').innerHTML = '';
    avatar.children.forEach(child => {
      if(child.name === 'Head' || child.name === 'Body') { document.querySelector('.canvas__buttons').append(changeColor(child)) } 
    });
    document.querySelector('.canvas__buttons').append(addFeatureButton());
  }

  if(init) {
    reloadAvatarUI(avatars[0]);
    fragment.querySelector('.avatar--name').textContent = avatars[0].name;
  }

  fragment
    .querySelectorAll('button')
    .forEach((element, index) => element.onclick = () => loadNewAvatar(index));

  return fragment;
};