export const addFeatureButton = () => {

  const fragment = document.createRange().createContextualFragment(
    ` 
    <button class="canvas__hud-add">
      <i class="fa fa-plus"></i>
    </button>
    `
  );

  const addNextFeature = () => {
    console.log('click');
  };

  fragment.querySelector('.canvas__hud-add').onclick = addNextFeature;

  return fragment;
}