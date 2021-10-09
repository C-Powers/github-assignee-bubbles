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
  const labels = gatherLabels();

  if (avatars.length === 0 && labels.length === 0) return;

  const injectionRef =
    document.getElementsByClassName('js-project-header')?.[0];

  if (avatars.length) {
    const avatarsBar = buildEl(avatars);
    injectionRef.parentNode.prepend(avatarsBar);
  }
  if (labels.length) {
    const labelsBar = buildEl(labels);
    injectionRef.parentNode.prepend(labelsBar);
  }
}

function gatherAssignees() {
  const avatarStacks = document.getElementsByClassName('AvatarStack-body');

  const hash = {};
  const reducedAssignees = [];

  for (let avatar of avatarStacks) {
    const children = avatar.getElementsByTagName('button');

    for (let i = 0; i < children.length; i++) {
      const button = children[i];
      const al = button.getAttribute('aria-label');

      if (hash.hasOwnProperty(al)) continue;
      hash[al] = true;

      assigneeButton = button.cloneNode(true);
      assigneeButton.className +=
        ' tooltipped tooltipped-nw tooltipped-multiline tooltipped-align-right-1';
      assigneeButton.addEventListener('click', _onAssigneeClick);
      reducedAssignees.push(assigneeButton);
    }
  }

  return reducedAssignees;
}

function gatherLabels() {
  const labels = document.getElementsByClassName('IssueLabel');

  const hash = {};
  const reducedLabels = [];

  for (let label of labels) {
    filter = label.getAttribute('data-card-filter');
    console.log('filter', filter);

    if (hash.hasOwnProperty(filter)) continue;
    hash[filter] = true;

    labelButton = label.cloneNode(true);
    labelButton.addEventListener('click', _onAssigneeClick);
    reducedLabels.push(labelButton);
  }

  return reducedLabels;
}

function _onAssigneeClick() {
  const searchInputEl = document.querySelector('[name="card_filter_query"]');
  searchInputEl.value = '';
}

function buildEl(children) {
  const el = document.createElement('div');
  el.className = 'd-sm-flex flex-row flex-shrink-0 flex-justify-end flex-wrap';
  el.style.cssText = 'padding-top:2rem;padding-right:2rem';

  padding = ' padding-left:.5rem;padding-right:.5rem;';

  for (let child of children) {
    child.style.cssText += padding;
    el.appendChild(child);
  }

  return el;
}
