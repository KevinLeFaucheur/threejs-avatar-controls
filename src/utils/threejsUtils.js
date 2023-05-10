import { Color, MeshStandardMaterial, DoubleSide } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const setupMesh = (mesh, color, doubleSide = false) => {
  mesh.material = new MeshStandardMaterial({ color });
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  if(doubleSide) mesh.material.side = DoubleSide;
}

export const load = (model) => {
	return new Promise((resolve, reject) => {
	
		const loader = new GLTFLoader();
		loader.load(model, (object) => {
			resolve(object);
		});
	});
};

export const changeMeshColor = (mesh, hexColor) => {
  mesh?.material?.color.set(new Color(hexColor));
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

export const getMeshColorHex = (mesh) => {
  return '#'+mesh?.material.color.getHexString();
};