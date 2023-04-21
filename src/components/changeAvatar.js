import * as THREE from 'three'
import { changeColor } from './changeColor';
import { addFeatureButton } from './addFeatureButton';
import { toggleFeature } from './toggleFeature';

export const changeAvatar = (group, avatar, init = false) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__swapControls">

      <button class="fa fa-angle-left"></button>

      <p class='avatar--name'>Test</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  const loadNewAvatar = (index) => {
    let avatar = null;

    if(group?.children?.find(avatar => avatar.name === 'avatar1')){
      group.clear();
      avatar = avatar[1];
    } 
    else {
      group.clear();
      avatar = avatar[0];
    }
    group.add(avatar);

    reloadAvatarUI(avatar);
    document.querySelector('.avatar--name').textContent = avatar.name;
  };

  const reloadAvatarUI = (avatar) => {
    document.querySelector('.canvas__buttons--avatar').innerHTML = '';
    document.querySelector('.canvas__buttons--features').innerHTML = '';

    avatar.children.forEach(group => {
      if(group.name === 'AVATAR') {
        group.children.forEach(mesh => {
          document.querySelector('.canvas__buttons--avatar').append(changeColor(mesh));
        });
      }
      if(group.name === 'FEATURES') {
        document.querySelector('.canvas__buttons--add').append(addFeatureButton(group));
      }
    });
  }

  if(init) {
    console.log(avatar);
    reloadAvatarUI(avatar);
    fragment.querySelector('.avatar--name').textContent = avatar.name;
  }

  fragment
    .querySelectorAll('button')
    .forEach((element, index) => element.onclick = () => loadNewAvatar(index));

  return fragment;
};