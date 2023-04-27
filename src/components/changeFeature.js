import { changeAvatarFeature, changeMeshColor } from "../handlers/changeMeshColor";

export const changeFeature = (mesh) => {
  if(mesh.name.includes('Empty')) mesh.name = 'None';

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="customization__controller" id=${mesh.parent.name}>

      <button class="fa fa-angle-left"></button>

      ${!mesh.name.includes('None') 
      // 
      ? `
      <div class="customization__controller--color">
        <label for=${mesh.name}>${mesh.name} Color: </label>
        <input type="color" id=${mesh.name}" name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>
      </div>
      ` 
      // 
      : `<p class='avatar--name'>${mesh.name}</p>`}
      
      <button class="fa fa-angle-right"></button>
    </div>
    `
  );
  
  const onChangeAvatarFeature = (mesh, index) => {
    const newMesh = changeAvatarFeature(mesh, index);
    document.getElementById(mesh.parent.name).replaceWith(changeFeature(newMesh));
  }
 
  if(!mesh.name.includes('None')) {
    fragment
      .querySelector('input')
      .onchange = () => changeMeshColor(mesh, event.target.value);
  }
    
  fragment
    .querySelectorAll('button')
    .forEach((button, index) => button.onclick = () => onChangeAvatarFeature(mesh, index));

  return fragment;
};