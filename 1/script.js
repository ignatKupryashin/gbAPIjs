"use strict";

const trainingInformation = [
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 10
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]

const localStorageKey = "signUpTraining";
const section = document.querySelector('.section');

trainingInformation.forEach((element) => {
    let disabledCancelRecording = "disabled";
    let disabledSignUp = "";
    const data = JSON.parse(localStorage.getItem(localStorageKey));
    if (data) {
        data.forEach((elem) => {
            if (elem.name === element.name) {
                element.currentParticipants += 1;
                disabledCancelRecording = "";
                disabledSignUp = "disabled";
            }
        });
    }

    section.insertAdjacentHTML("afterbegin",
        itemRecords(element, disabledSignUp, disabledCancelRecording));
});


/**
 *
 * @param item Занятие
 * @param signUp
 * @param cancelRecording
 * @returns {string}
 */
function itemRecords (item, signUp, cancelRecording) {
    return `
      <div class="itemTraining">
         <h3>Занятие: ${item.name}</h3>
         <p>Максимальное количество мест: ${item.maxParticipants}</p>
         <p class="currentParticipants">Текущее количеставо участников: <span class="numberCurrentParticipants">${item.currentParticipants}</span></p>
         <button ${signUp} onClick="signUp(this)" class="sign-up-button">Записаться</button>
         <button ${cancelRecording} onClick="cancelRecording(this)" class="cancel-recording-button">Отменить запись</button>
      </div>
   `;
}

/**Функция записи при нажатии на кнопку "Записаться"*/
function signUp (item) {
    const numbercurrentParticipants =
        item.parentElement.getElementsByClassName("numberCurrentParticipants");

    const cancelRecordingButton =
        item.parentElement.getElementsByClassName("cancel-recording-button");

    numbercurrentParticipants.item(0).textContent =
        Number(numbercurrentParticipants.item(0).textContent) + 1;

    cancelRecordingButton.item(0).disabled = false;

    item.disabled = true;

    saveLocalStorage(item.name);
}

/**
 * Отмена записи
 * @param item
 * @param id
 */
function cancelRecording (item) {
    const numbercurrentParticipants =
        item.parentElement.getElementsByClassName("numberCurrentParticipants");

    const signUpButton =
        item.parentElement.getElementsByClassName("sign-up-button");

    numbercurrentParticipants.item(0).textContent =
        Number(numbercurrentParticipants.item(0).textContent) - 1;

    signUpButton.item(0).disabled = false;

    item.disabled = true;

    removeLocalStorage(item.name);
}

/**
 * Запись в localstorage
 * @param name
 */
function saveLocalStorage (name) {
    let record = localStorage.getItem(localStorageKey);
    if (record === null) {
        record = JSON.stringify([{ name: name }]);
    } else {
        const arr = JSON.parse(record);
        arr.push({ name: name });
        record = JSON.stringify(arr);
    }
    localStorage.setItem(localStorageKey, record);
}

/**
 * Удаление записи
 * @param id
 */
function removeLocalStorage (id) {
    let arr;
    let record = localStorage.getItem(localStorageKey);
    if (record !== null) {
        arr = JSON.parse(record);
        const index = arr.indexOf(arr.find(it => it.id === id));
        arr.splice(index, 1);
        record = JSON.stringify(arr);
    }
    if (arr.length !== 0) {
        localStorage.setItem(localStorageKey, record);
    } else {
        localStorage.removeItem(localStorageKey);
    }
}