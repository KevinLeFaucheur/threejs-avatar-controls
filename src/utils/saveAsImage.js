const saveAsImage = (renderer) => {
  let imgData, imgNode;

  try {
      let strMime = "image/jpeg";
      return imgData = renderer.domElement.toDataURL(strMime);
  } 
  catch (error) {
      console.log(error);
      return error;
  }
};

export const saveAsImageButton = (renderer) => {

  const fragment = document.createRange().createContextualFragment(
    ` <div class="customization__controller" id="save-image">
        <button>Save</button>
        <dialog class="save-image__dialog" id="save-image__dialog">
          <div id="save-image__header">
            <p>My avatar image:</p>
            <button class="fa fa-regular fa-x close" formnovalidate></button>
          </div>
          <div id="save-image__image">
            <img id='my-avatar-image' src='' />
          </div>
        </dialog>
      </div>
    `
  );

  fragment.querySelector('button').onclick = () => { 
    document.getElementById('my-avatar-image').src = saveAsImage(renderer);
    document.getElementById('save-image__dialog').showModal();
  };

  fragment.querySelector('#save-image__header > button').onclick = () => { 
    document.getElementById('save-image__dialog').close();
  };

  return fragment;

}