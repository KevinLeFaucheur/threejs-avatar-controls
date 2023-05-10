import { changeAvatarFeature } from "../utils/threejsUtils";
import { meshColorController } from "./meshColorController";

export const selectFeatureController = (mesh, swatchColors = null) => {

  const fragment = meshColorController(mesh, swatchColors);

  const leftButton = 
    document
      .createRange()
      .createContextualFragment(`<button value=${-1} class="fa fa-angle-left"></button>`);
  const rightButton = 
    document
      .createRange()
      .createContextualFragment(`<button value=${1} class="fa fa-angle-right"></button>`);
    
  leftButton.querySelector('button').onclick = () => onChangeAvatarFeature(mesh, -1);
  rightButton.querySelector('button').onclick = () => onChangeAvatarFeature(mesh, 1);

  fragment.getElementById(`${mesh.name}--controller`).prepend(leftButton);
  fragment.getElementById(`${mesh.name}--controller`).append(rightButton);
  
  const onChangeAvatarFeature = (mesh, index) => {
    const newMesh = changeAvatarFeature(mesh, index);
    document.getElementById(`${mesh.name}--controller`).replaceWith(selectFeatureController(newMesh));
  };

  return fragment;
};