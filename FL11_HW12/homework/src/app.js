const ID_TEN = 10;
const ID_LENGTH = 12;
const MESSAGE_DELAY = 2000;
const ERROR_MESSAGES = {
  done: `You can't edit already done item`,
  exist: `You can't add already exist item`,
  empty: `You can't add empty item`
};

const rootNode = document.getElementById('root');
const containers = rootNode.querySelectorAll('.container');
const mainNode = rootNode.querySelector('.main');
const newButton = mainNode.querySelector('.newButton');
const saveNewButton = rootNode.querySelector('.save-new');
const cancelButtons = rootNode.querySelectorAll('.cancel');
const saveNewInput = rootNode.querySelector('.save-new-input');
const saveModifiedButton = rootNode.querySelector('.save-modified');
const saveModifiedInput = rootNode.querySelector('.save-modified-input');
const errorNode = document.querySelector('.error');
const errorText = errorNode.querySelector('.error-text');
let listOfItems = localStorage.data ? JSON.parse(localStorage.getItem('data')) : [];

const getRandomID = () => parseInt(Math.random() * Math.pow(ID_TEN, ID_LENGTH), 10);

const getItem = (i) => {
  const newElement = document.createElement(`li`);
  newElement.innerHTML = `<img class="checkbox" src="./assets/img/${i.isDone ? 'done' : 'todo'}-s.png"></img>
  <p class="item">${i.description}</p>
  <img class="delete" src="./assets/img/remove-s.jpg"></img>`;
  addHandlers(newElement, i);
  return newElement;
}

const fillTheItems = (items) => {
  const newElement = document.createElement(`ul`);
  newElement.classList.add('list');
  if (items.length === 0) {
    newElement.innerHTML = '<p>TODO is empty</p>';
  } else {
    const sortedItems = items.sort((a, b) => a.isDone - b.isDone);
    for (const item of sortedItems) {
      newElement.appendChild(getItem(item));
    }
  }
  return newElement;
}

const showErrorMessage = (text) => {
  errorText.textContent = text;
  errorNode.classList.remove('error-hide');
  setTimeout(function() {
    errorNode.classList.add('error-hide');
  }, MESSAGE_DELAY);
}

const isValueValid = value => {
  if (value === '') {
    showErrorMessage(ERROR_MESSAGES.empty);
  } else {
    if (listOfItems.map(el => el.description).includes(value)) {
      showErrorMessage(ERROR_MESSAGES.exist);
    } else {
      return true;
    }
  }
  return false;
}

const onNewButtonClick = () => {
  location.hash = 'add';
  saveNewButton.addEventListener('click', onSaveButtonClick);
}
const onSaveButtonClick = () => {
  const value = saveNewInput.value.trim();
  if (isValueValid(value)) {
    listOfItems.push({
      isDone: false,
      id: getRandomID(),
      description: value
    });
    saveNewInput.value = '';
    location.hash = 'main';
    saveNewButton.removeEventListener('click', onSaveButtonClick);
    updateLocalStorage();
  }
}
const onSaveModifiedClick = (evt, item) => {
  if (isValueValid(saveModifiedInput.value.trim())) {
    item.description = saveModifiedInput.value.trim();
    location.hash = 'main';
    updateLocalStorage();
  } else {
    saveModifiedButton.addEventListener('click', function(e) {
      onSaveModifiedClick(e, item);
    }, {once: true});
  }
}
const onCancelButtonClick = () => {
  location.hash = 'main';
  if (saveNewInput.value) {
    saveNewInput.value = '';
  }
}
const onCheckboxClick = (item) => {
  item.isDone = !item.isDone;
  mainNode.replaceChild(fillTheItems(listOfItems), rootNode.querySelector('.list'));
  updateLocalStorage();
}
const onItemClick = (item) => {
  if (item.isDone) {
    showErrorMessage(ERROR_MESSAGES.done);
  } else {
    location.hash = `modify/${item.id}`;
    saveModifiedInput.value = item.description;
    saveModifiedButton.addEventListener('click', function(e) {
      onSaveModifiedClick(e, item);
    }, {once: true});
  }
}
const onDeleteClick = (item) => {
  const indexOfDeletedItem = listOfItems.findIndex(x => x === item);
  listOfItems.splice(indexOfDeletedItem, 1);
  mainNode.replaceChild(fillTheItems(listOfItems), rootNode.querySelector('.list'));
  updateLocalStorage();
}
const onHashChange = () => {
  containers.forEach((elem) => {
    if (elem.classList.contains('visible')) {
      elem.classList.remove('visible');
    }
  });
  switch (location.hash.split('/')[0]) {
    case '#add':
      rootNode.querySelector('.add-new-item').classList.add('visible');
      break;
    case '#modify':
      rootNode.querySelector('.modify-item').classList.add('visible');
      break;
    default:
      mainNode.classList.add('visible');
      mainNode.replaceChild(fillTheItems(listOfItems), rootNode.querySelector('.list'));
  }
}
const addHandlers = (elem, i) => {
  elem.querySelector('.checkbox').addEventListener('click', () => {
    onCheckboxClick(i);
  });
  elem.querySelector('.item').addEventListener('click', () => {
    onItemClick(i);
  })
  elem.querySelector('.delete').addEventListener('click', () => {
    onDeleteClick(i);
  });
}

const checkBrowserName = () => {
  const reg = /Chrome/;
  if (reg.test(window.navigator.userAgent)) {
    errorNode.style.left = '20px';
  } else {
    errorNode.style.right = '20px';
  }
}

const updateLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(listOfItems));
}

const init = () => {
  location.hash = 'main';
  newButton.addEventListener('click', onNewButtonClick);
  cancelButtons.forEach((elem) => {
    elem.addEventListener('click', onCancelButtonClick);
  });
  window.addEventListener('hashchange', onHashChange);
  mainNode.appendChild(fillTheItems(listOfItems));
  checkBrowserName();
}

init();
