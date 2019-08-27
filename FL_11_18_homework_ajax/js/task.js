const endPoint = 'https://jsonplaceholder.typicode.com/'
const mainNode = document.querySelector('.main');
const loader = document.querySelector('.lds-dual-ring');

const makeGetRequest = (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, `${endPoint}${url}`, true);
  xhr.send(null);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      renderUsersList(response);
    } else {
      console.error(xhr.statusText);
    }
  };
  
  xhr.onerror = function () {
    console.error(xhr.statusText);
  };
}

const makeDeleteRequest = (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, `${endPoint}${url}`, true);
  xhr.send(null);

  xhr.onload = function () {
    if (xhr.status === 200) {
      hideLoader();
    } else {
      console.error(xhr.statusText);
    }
  };
  
  xhr.onerror = function () {
    console.error(xhr.statusText);
  };
}

const makeUpdateRequest = (method, url) => {
  const xhr = new XMLHttpRequest();
  xhr.open(method, `${endPoint}${url}`, true);
  xhr.send(null);

  xhr.onload = function () {
    if (xhr.status === 200) {
      makeGetRequest(`GET`, `users`);
      hideLoader();
    } else {
      console.error(xhr.statusText);
    }
  };
  
  xhr.onerror = function () {
    console.error(xhr.statusText);
  };
}

const getUsersList = users => users.reduce((acc, user) => {
  return acc += `<li><button class="edit-button" data-id="${user.id}">Edit</button><button class="delete-button" data-id="${user.id}">Delete</button>${user.name}</li>`;
}, '');

const onSaveButtonClick = (evt) => {
  showLoader();
  makeUpdateRequest(`PUT`, `users/${evt.target.parentNode.dataset.id}`)
}

const onEditButtonClick = (evt) => {
  const target = evt.target;
  const value = target.parentNode.childNodes[2].textContent;
  const id = target.dataset.id;
  const newElement = document.createElement(`li`);
  newElement.innerHTML = `<input class="edit-input" type="text" value="${value}"></input><button class="save-button">Save</button>`;
  newElement.dataset.id = id;
  newElement.querySelector('.save-button').addEventListener('click', onSaveButtonClick);
  mainNode.querySelector('.users').replaceChild(newElement, target.parentNode);
}

const onDeleteButtonClick = (target) => {
  showLoader();
  makeDeleteRequest(`DELETE`, `users/${target.dataset.id}`);
  target.parentNode.innerHTML = '';
}

const renderUsersList = users => {
  hideLoader();
  mainNode.innerHTML = '';
  const usersNode = document.createElement('ul');
  usersNode.classList.add('users');
  usersNode.innerHTML = getUsersList(users);
  mainNode.appendChild(usersNode);
  const editButtons = document.querySelectorAll('.edit-button');
  editButtons.forEach(el => {el.addEventListener('click', function(evt) {
    onEditButtonClick(evt);
  })});
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(el => {el.addEventListener('click', function(evt) {
    onDeleteButtonClick(evt.target);
  })});
}

const showLoader = () => {
  mainNode.style.display = 'none';
  loader.style.display = 'inline-block';
}
const hideLoader = () => {
  loader.style.display = 'none';
  mainNode.style.display = 'block';
}

const init = () => {
  showLoader();
  makeGetRequest(`GET`, `users`);
}

init();
