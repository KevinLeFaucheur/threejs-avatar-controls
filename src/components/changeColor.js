import * as THREE from 'three'

export const changeColor = (mesh, label = 'Mesh', color = '#e66465') => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button">
      <label for="head">${label} Color</label>
      <input type="color" id="head" name="head" value=${color}>
    </div>
    `
  );

  const changeColor = (event) => {
    console.log(event.target.value);
    const meshColor = new THREE.Color(event.target.value);
    console.log(meshColor);
    mesh?.material?.color.set(meshColor);
  };

  fragment.querySelector('input').onblur = changeColor;

  return fragment;
};