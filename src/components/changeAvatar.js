import { changeColor } from './changeColor';
import { changeFeature } from './changeFeature';

export const changeAvatar = (group, avatar, init = false) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="selectors--avatar">

      <button class="fa fa-angle-left"></button>

      <p class='avatar--name'>Test</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  const loadNewAvatar = (index) => {
    let newAvatar = null;

    if(group?.children?.find(newAvatar => newAvatar.name === 'avatar1')){
      group.clear();
      avatar = newAvatar[1];
    } 
    else {
      group.clear();
      newAvatar = newAvatar[0];
    }
    group.add(newAvatar);

    reloadAvatarUI(newAvatar);
    document.querySelector('.avatar--name').textContent = newAvatar.name;
  };

  const reloadAvatarUI = (avatar) => {
    document.querySelector('.customization--avatar').innerHTML = '';
    document.querySelector('.customization--features').innerHTML = '';

    avatar.children.forEach(group => {
      if(group.name === 'AVATAR') {
        group.children.forEach(mesh => {
          if(mesh.name === 'Body') return;
          document.querySelector('.customization--avatar').append(changeColor(mesh));
        });
      }
      if(group.name === 'SKIN') {
        group.children.forEach(mesh => {
          document.querySelector('.customization--avatar').append(changeColor(mesh, true));
        });
      }
      if(group.name === 'EYES') {
        group.children.forEach(mesh => {
          if(mesh.name !== 'Base') { 
            document.querySelector('.customization--avatar').append(changeColor(mesh));
          }
        });
      }
      if(group.name === 'FEATURES') {
        group.children.forEach(subgroup => {
          const feature = subgroup.children.find(mesh => mesh.name.includes('Empty'));
          document.querySelector('.customization--features').append(changeFeature(feature));
        });
      }
    });
  }

  if(init) {
    group.add(avatar);
    console.log(group);
    reloadAvatarUI(avatar);
    fragment.querySelector('.avatar--name').textContent = avatar.name;
  }

  fragment
    .querySelectorAll('button')
    .forEach((element, index) => element.onclick = () => loadNewAvatar(index));

  return fragment;
};