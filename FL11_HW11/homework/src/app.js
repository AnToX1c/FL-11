const MAX_ITEM_PER_LIST = 10;
let rootNode = document.getElementById('root');
const addInputContainer = rootNode.querySelector('.add-input-wrapper');
const addInput = addInputContainer.querySelector('.add-input');
const addButton = addInputContainer.querySelector('.add-box');
const list = rootNode.querySelector('.list');
const listItems = rootNode.querySelectorAll('.list-item');
let dragSrcEl = null;

const addNewAction = (text) => {
  const newElement = document.createElement(`li`);
  newElement.classList.add('list-item');
  newElement.draggable = true;
  newElement.innerHTML = `<i class="material-icons checkbox">check_box_outline_blank</i>
  <p>${text}</p>
  <i class="material-icons edit-icon">create</i>
  <i class="material-icons delete-icon">delete</i>`;
  addHandlers(newElement);
  list.appendChild(newElement);
  addInput.value = '';
  addInput.focus();
  disableAddButton();
  isListFull();
};

const isListFull = () => list.querySelectorAll('li').length >= MAX_ITEM_PER_LIST ? showWarning() : removeWarning();

const showWarning = () => {
  addInput.disabled = true;
  const newElement = document.createElement(`p`);
  newElement.classList.add('warning-message');
  newElement.innerHTML = `Maximum item per list are created`;
  rootNode.insertBefore(newElement, addInputContainer);
};

const removeWarning = () => {
  if (addInput.disabled) {
    addInput.disabled = false;
    rootNode.removeChild(rootNode.querySelector('.warning-message'));
  }
};

const onAddInputChange = (e) => {
  if (e.target.value) {
    addButton.classList.add('button-enable');
    addButton.style.cursor = 'pointer';
    addButton.addEventListener('click', onAddButtonClick);
  } else {
    disableAddButton();
  }
};

const disableAddButton = () => {
  if (addButton.style.cursor === 'pointer') {
    addButton.classList.toggle('button-enable');
    addButton.style.cursor = 'default';
    addButton.removeEventListener('click', onAddButtonClick);
  }
};

const onAddButtonClick = () => addNewAction(addInput.value);

const onSaveButtonClick = (e) => {
  const value = e.target.previousElementSibling.value;
  const newElement = document.createElement(`li`);
  newElement.classList.add('list-item');
  newElement.draggable = true;
  newElement.innerHTML = `<i class="material-icons checkbox">check_box_outline_blank</i>
  <p>${value}</p>
  <i class="material-icons edit-icon">create</i>
  <i class="material-icons delete-icon">delete</i>`;
  addHandlers(newElement);
  list.replaceChild(newElement, e.target.parentNode);
};

const onEditButtonClick = (e) => {
  const value = e.target.previousElementSibling.innerText;
  const newElement = document.createElement(`li`);
  newElement.innerHTML = `<input class="edit-input" type="text" value="${value}"></input>
  <i class="material-icons save-icon">save</i>`;
  newElement.querySelector('.save-icon').addEventListener('click', onSaveButtonClick);
  list.replaceChild(newElement, e.target.parentNode);
};

const onDeleteButtonClick = (e) => {
  list.removeChild(e.target.parentNode);
  isListFull();
};

const onCheckboxClick = (e) => {
  e.target.removeEventListener('click', onCheckboxClick);
  e.target.innerText = 'check_box';
  e.target.parentNode.querySelector('.edit-icon').removeEventListener('click', onEditButtonClick);
};

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.outerHTML);
  this.classList.add('dragElem');
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl !== this) {
    this.parentNode.removeChild(dragSrcEl);
    const dropHTML = e.dataTransfer.getData('text/html');
    this.insertAdjacentHTML('beforebegin', dropHTML);
    const dropElem = this.previousSibling;
    addHandlers(dropElem);
  }
  return false;
}

function handleDragEnd() {
  this.classList.remove('dragElem');
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

const addHandlers = (elem) => {
  elem.querySelector('.checkbox').addEventListener('click', onCheckboxClick);
  if (elem.querySelector('.checkbox').innerText === 'check_box_outline_blank') {
    elem.querySelector('.edit-icon').addEventListener('click', onEditButtonClick);
  }
  elem.querySelector('.delete-icon').addEventListener('click', onDeleteButtonClick);
  elem.addEventListener('dragstart', handleDragStart, false);
  elem.addEventListener('dragover', handleDragOver, false);
  elem.addEventListener('drop', handleDrop, false);
  elem.addEventListener('dragend', handleDragEnd, false);
};

addInput.addEventListener('input', onAddInputChange);
[].forEach.call(listItems, addHandlers);
