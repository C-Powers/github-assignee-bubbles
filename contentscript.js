(() => {
  setTimeout(() => handler(), 1500);
})();

function handler() {
  const avatars = gatherAssignees();
  const el = buildEl(avatars);

  const injectionRef =
    document.getElementsByClassName('js-project-header')?.[0];
  injectionRef.parentNode.prepend(el);
}

function gatherAssignees() {
  const allAvatars = document.getElementsByClassName('AvatarStack-body');

  const avatarsHash = {};
  const reducedAvatars = [];

  for (let avatar of allAvatars) {
    const al = avatar.getAttribute('aria-label');
    if (avatarsHash.hasOwnProperty(al)) continue;

    avatarsHash[al] = true;
    reducedAvatars.push(avatar);
  }

  return reducedAvatars;
}

function buildEl(avatars) {
  const el = document.createElement('div');
  el.className =
    'd-sm-flex flex-row flex-shrink-0 flex-justify-between project-header js-project-header py-2 py-sm-0 pt-sm-3 px-2 px-sm-3 pl-lg-3 pr-lg-4';
  for (let av of avatars) {
    el.appendChild(av);
  }

  return el;
}
