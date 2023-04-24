import { changeColor } from './changeColor';
import { changeFeature } from './changeFeature';

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
        // document.querySelector('.canvas__buttons--add').append(addFeatureButton(group));

        group.children.forEach(group => {
          const feature = group.children.find(mesh => mesh.name.includes('Empty'));
          document.querySelector('.canvas__buttons--features').append(changeFeature(feature));
        });
      }
    });
  }

  if(init) {
    reloadAvatarUI(avatar);
    fragment.querySelector('.avatar--name').textContent = avatar.name;
  }

  fragment
    .querySelectorAll('button')
    .forEach((element, index) => element.onclick = () => loadNewAvatar(index));

  return fragment;
};