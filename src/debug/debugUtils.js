export const logAvatarGroup = (group) => {
  
  const fragment = document.createRange().createContextualFragment(
    ` <button>Log Avatar</button>`
  );

  fragment.querySelector('button').onclick = () => console.log(group);

  return fragment;
}