(() => {
  setTimeout(() => {
    try {
      handler();
    } catch (e) {
      console.log('oops, something went wrong: ', e);
    }
  }, 1500);
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
    'd-sm-flex flex-row flex-shrink-0 flex-justify-end';
  el.style.cssText = 'padding-top:1rem;padding-right:2rem'
  for (let av of avatars) {
    av.style.cssText = 'padding-left:.5rem;padding-right:.5rem;'
    el.appendChild(av);
  }

  return el;
}
