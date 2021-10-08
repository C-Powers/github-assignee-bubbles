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
  if (avatars.length == 0) return;
  const el = buildEl(avatars);

  const injectionRef =
    document.getElementsByClassName('js-project-header')?.[0];
  injectionRef.parentNode.prepend(el);
}

function gatherAssignees() {
  const avatarStacks = document.getElementsByClassName('AvatarStack-body');

  const avatarsHash = {};
  const reducedAssignees = [];

  for (let avatar of avatarStacks) {
    const children = avatar.getElementsByTagName('button');

    for (let i = 0; i < children.length; i++) {
      const button = children[i];
      const al = button.getAttribute('aria-label');

      if (avatarsHash.hasOwnProperty(al)) continue;

      avatarsHash[al] = true;
      assigneeButton = button.cloneNode(true);
      assigneeButton.className +=
        ' tooltipped tooltipped-nw tooltipped-multiline tooltipped-align-right-1';
      assigneeButton.addEventListener('click', _onAssigneeClick);
      reducedAssignees.push(assigneeButton);
    }
  }

  return reducedAssignees;
}

function _onAssigneeClick() {
  const searchInputEl = document.querySelector('[name="card_filter_query"]');
  searchInputEl.value = '';
}

function buildEl(avatars) {
  const el = document.createElement('div');
  el.className = 'd-sm-flex flex-row flex-shrink-0 flex-justify-end';
  el.style.cssText = 'padding-top:2rem;padding-right:2rem';

  for (let av of avatars) {
    av.style.cssText = 'padding-left:.5rem;padding-right:.5rem;';
    el.appendChild(av);
  }

  return el;
}
