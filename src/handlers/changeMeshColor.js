import * as THREE from 'three';

export const changeMeshColor = (mesh, hexColor) => {
  mesh?.material?.color.set(new THREE.Color(hexColor));
};

export const changeAvatarFeature = (mesh, offset) => {
  const children = mesh.parent.children;
  let index = children.findIndex(child => child.name === mesh.name);

  index = offset === 0 ? index - 1 : index + 1;
  index = index >= children.length ? 0 : index < 0 ? children.length-1 : index;

  toggleMeshVisible(mesh);
  toggleMeshVisible(children[index]);

  return children[index];
};

export const toggleMeshVisible = (mesh) => {
  mesh.visible = !mesh.visible;
};

export const initAvatar = () => {

};