import * as THREE from 'three'
import { changeColor } from './changeColor';

export const changeAvatar = (group, avatars) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__swapControls">

      <button><i class="fa fa-angle-left"></i></button>

      <p>Test</p>

      <button><i class="fa fa-angle-right"></i></button>

    </div>
    `
  );

  const changeAvatar = (event) => {
    console.log(group);
    console.log(avatars);
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
    console.log(avatar?.children[0]?.material.color.getHexString());
    document.querySelector('.canvas__buttons').innerHTML = '';
    document.querySelector('.canvas__buttons').append(changeColor(avatar?.children[0], 'Body', '#'+avatar?.children[0]?.material.color.getHexString()));
    document.querySelector('.canvas__buttons').append(changeColor(avatar?.children[1], 'Head', '#'+avatar?.children[1]?.material.color.getHexString()));
  };

  fragment
    .querySelectorAll('button')
    .forEach(element => element.onclick = changeAvatar);

  return fragment;
};