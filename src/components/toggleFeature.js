import { toggleMeshVisible } from "../handlers/changeMeshColor";

export const toggleFeature = (mesh) => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__button">
      <label for=${mesh.name}>${mesh.name} Color: </label>
      <input type="checkbox" id=${mesh.name} name=${mesh.name}>
    </div>
    `
  );

  fragment.querySelector('input').onclick = toggleMeshVisible;

  return fragment;
};