import * as THREE from 'three'

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
    if(group?.children?.find(avatar => avatar.name === 'avatar1')){
      group.clear();
      group.add(avatars[1]);
    } 
    else {
      group.clear();
      group.add(avatars[0]);
    }
  };

  fragment
    .querySelectorAll('button')
    .forEach(element => element.onclick = changeAvatar);

  return fragment;
};