import { changeAvatarFeature } from "../handlers/changeMeshColor";

export const changeFeature = (mesh) => {
  if(mesh.name.includes('Empty')) mesh.name = 'None';

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button" id=${mesh.name}>

      <button class="fa fa-angle-left"></button>

      ${mesh.name.includes('Empty') 
      // 
      ? `
      <label for=${mesh.name}>${mesh.name} Color: </label>
      <input type="color" id=${mesh.name}" name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>` 
      // 
      : `<p class='avatar--name'>${mesh.name}</p>`}
      
      <button class="fa fa-angle-right"></button>
    </div>
    `
  );
  
  const onChangeAvatarFeature = (mesh, index) => {
    const newMesh = changeAvatarFeature(mesh, index);
    document.getElementById(mesh.name).replaceWith(changeFeature(newMesh));
  }
 
  // fragment.querySelector('input').onchange = changeColor;
  fragment
    .querySelectorAll('button')
    .forEach((button, index) => button.onclick = () => onChangeAvatarFeature(mesh, index));

  return fragment;
};