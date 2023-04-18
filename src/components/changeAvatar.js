import * as THREE from 'three'
import { changeColor } from './changeColor';

export const changeAvatar = (group, avatars) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__swapControls">

      <button><i class="fa fa-angle-left"></i></button>

      <p class='avatar--name'>Test</p>

      <button><i class="fa fa-angle-right"></i></button>

    </div>
    `
  );

  const changeAvatar = (event) => {
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

    document.querySelector('.canvas__buttons').innerHTML = '';
    avatar.children.forEach(child => document.querySelector('.canvas__buttons').append(changeColor(child)));
    document.querySelector('.avatar--name').textContent = avatar.name;
  };

  fragment
    .querySelectorAll('button')
    .forEach(element => element.onclick = changeAvatar);

  return fragment;
};