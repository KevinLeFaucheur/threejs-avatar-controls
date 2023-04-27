export const displayAvatar = (avatar) => {
  const fragment = document.createRange().createContextualFragment(
    ` 
    <div class="canvas__swapControls">

      <button class="fa fa-angle-left"></button>

      <p class='avatar--name'>${avatar.name}</p>

      <button class="fa fa-angle-right"></button>

    </div>
    `
  );

  return fragment;
};