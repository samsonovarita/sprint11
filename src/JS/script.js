const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

//объявляем переменные
const root = document.querySelector('.root');
const popupButton = document.querySelector('.user-info__button');
const popUpForm = document.querySelector('.popup_add-place');
const popUpClose = document.querySelector('.popup__close');
const container = document.querySelector('.places-list');
const popupButtonEdit = document.querySelector('.user-edit__button');
const popUpEdit = document.querySelector('.popup_user-edit');
const imgPopup = document.querySelector('.popup_image');
const form = document.forms.new;
const user = document.forms.user;
const profileName = user.elements.user_name;
const profileInfo = user.elements.user_info; 
const popName = form.elements.name;
const popLink = form.elements.link;

import CardList from './cardlist.js';
import Popup from './popup.js';
import Api from './api.js';

const UserConfig = {
  baseUrl: serverUrl,
  headers: {
    authorization:'89b20bf3-9569-474d-8e08-fe4b08de48a5',
    'Content-Type': 'application/json'
  }
};

const api = new Api(UserConfig);

api.getInitialCards()
  .then(res => {
    if (res && res.length > 0) { 
    new CardList(document.querySelector('.places-list'), res);
    }
  })

api.getUserData()
  .then(user => {
    if (!(user.name === null && user.about === null)) {
      document.querySelector('.user-info__name').textContent = user.name;
      document.querySelector('.user-info__job').textContent = user.about;
      document.querySelector('.user-info__photo').setAttribute('style', `background-image: url(${user})`);
    }
  })
  .catch();

api.postUserInfo('Маргарита Самсонова', 'Начинающий фронтенд')

const [addCardLayer, editUserLayer, imageLayer] = root.querySelectorAll('.popup');
const popupCard = new Popup(addCardLayer);
const popupEdit = new Popup(editUserLayer);
const popupImage = new Popup(imageLayer);

root.addEventListener('click', function (event) {
  if (event.target.classList.contains('user-info__button')) {
    popupOpenAddForm();
    popupCard.open();
  } else if (event.target.classList.contains('user-edit__button')) {
    popupOpenEditForm();
    popupEdit.open();
  } else if (event.target.classList.contains('place-card__image')) {
    openImgPopup();
    popupImage.open();
  }
});

// Далее объявляем функции 

// открытие формы добавления нового места
 function popupOpenAddForm() {
  const popBtn = popUpForm.querySelector('.popup__button');

  if (event.target.classList.contains('popup__close')) {
      form.elements.name.value = '';
      form.elements.link.value = '';
    }
  if (event.target.classList.contains('user-info__button')) {
    popUpForm.classList.toggle('popup_is-opened');
    activateFormButton(popBtn, false);
  }
};

//Задание 1: Открываем/закрываем форму О СЕБЕ

function popupOpenEditForm() {
  const popBtn = document.querySelector('.popup__button_save');
  profileName.value = document.querySelector('.user-info__name').textContent;
  profileInfo.value = document.querySelector('.user-info__job').textContent;
 
  if ((profileName.value.length > 1 && profileName.value.length < 30) && 
      (profileInfo.value.length > 1 && profileInfo.value.length < 30)){
      activateFormButton(popBtn, true);
    }
    else{
      activateFormButton(popBtn, false);
    }
};

//Задание 2: Редактирование имени и информации о себе

function fillFields (editName, editDesc) {
  const profileName = document.querySelector('.user-info__name');
  const profileJob = document.querySelector('.user-info__job');
  profileName.textContent = `${editName}`;
  profileJob.textContent = `${editDesc}`;
};

function editProfile (event) {
  event.preventDefault();
  if(validateFormEdit()){ //если валидация формы успешна
    const profileName = user.elements.user_name.value;
    const profileAbout = user.elements.user_info.value;
    if (user.elements.user_name.value.length !== 0
        && user.elements.user_info.value.length !== 0) {
        fillFields(profileName, profileAbout);
      popUpEdit.classList.toggle('popup_is-opened');
    }
  }
};

//Задание 3: Открытие попапа с картинкой

function openImgPopup() {
  const imgSelector = event.target.closest('.place-card__image');
  if (event.target.classList.contains('place-card__image')
      || event.target.classList.contains('popup__close')) {
    showImageInPopup(imgSelector);
  }
};

function showImageInPopup(img) {
  if (img !== null) {
    const popupBackgrImage = document.querySelector('.popup__card_image');
    const removeUrl = img.style.backgroundImage.split('"');
    popupBackgrImage.src = removeUrl[1];
  }
};

//Задание 4: Валидация всех форм

function activateFormButton (btnElement, state){

  if(state){
    console.log('Активирую кнопку');
    btnElement.removeAttribute('disabled');
    btnElement.classList.add('popup__button_active');
  }
  else {
    console.log('Деактивирую кнопку');
    btnElement.setAttribute('disabled', true);
    btnElement.classList.remove('popup__button_active');
  }
};

//Задание 5-6: Валидация формы «Редактировать профиль» и «Новое место»

function validateForm() {
  const nameIsValid = validate(popName);
  const linkIsValid = validate(popLink);
  const submitButton = form.querySelector('.popup__button');
  let isValidate = true;
  if (nameIsValid && linkIsValid) {
    isValidate = true;
    activateFormButton(submitButton, true);
  } else {
    isValidate = false;
    activateFormButton(submitButton, false);
  }
  return isValidate;
}
function validateFormEdit() {
  const nameIsValid = validate(profileName);
  const infoIsValid = validate(profileInfo);
  const submitButton = user.querySelector('.popup__button');
  let isValidate = true;
  if (nameIsValid && infoIsValid) {
    isValidate = true;
    activateFormButton(submitButton, true);
  } else {
    isValidate = false;
    activateFormButton(submitButton, false);
  }
  return isValidate;
}

function validate (element) {
  const errorBox = element.nextElementSibling;
  if (element.validity.typeMismatch&& element.type == 'url') {
    errorBox.textContent = 'Здесь должна быть ссылка';
    return false;
  } else if (element.value.trim().length === 0) {
    errorBox.textContent = 'Это обязательное поле';
    console.log('123');
    return false;
  } else if ((element.value.trim().length < 2 || element.value.trim().length > 30) && element.type === 'text') {
    errorBox.textContent = 'Должно быть от 2 до 30 символов';
    return false;
  } else {
    errorBox.textContent = '';
  }
  return true;
};

function deleteError () {
  let rend = document.querySelectorAll('.popup__error-message')
  rend.forEach(function (elem){ 
    elem.textContent = ' ';
  });
}

//Объявляем слушатели

// Задание 5: добавляем карточки.

form.addEventListener('submit', function(event) {
  event.preventDefault();
  if(validateForm()){ //если валидация формы успешна
    document.querySelector(".popup").classList.remove("popup_is-opened");
    const form = document.forms.new;
    const name = form.elements.name;
    const link = form.elements.link;
    const {cardElement} = new Card(name.value, link.value);
    container.appendChild(cardElement);
  }
});

user.addEventListener('submit', editProfile);
form.addEventListener('input', validateForm);
user.addEventListener('input', validateFormEdit);