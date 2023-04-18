import * as THREE from 'three'

export const changeColor = (mesh) => {
  console.log(mesh);

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button">
      <label for=${mesh.name}>${mesh.name} Color: </label>
      <input type="color" id=${mesh.name}" name=${mesh.name} value=${'#'+mesh?.material.color.getHexString()}>
    </div>
    `
  );

  const changeColor = (event) => {
    const meshColor = new THREE.Color(event.target.value);
    mesh?.material?.color.set(meshColor);
  };

  fragment.querySelector('input').onchange = changeColor;

  return fragment;
};