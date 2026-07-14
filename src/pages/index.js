import "./index.css";
import { enableValidation, selectors } from "../scripts/validation.js";
import heartLiked from "../images/heart-liked.svg";
import heartDefault from "../images/heart-default.svg";
import binHovered from "../images/bin-hovered.svg";
import binDefault from "../images/bin-default.svg";
import { setButtonText } from "../utils/helpers.js";
import Api from "../utils/Api.js";

const cardsContainer = document.querySelector(".cards__pics");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(
  ".profile__description",
);
const currentPfp = document.querySelector(".profile__pfp");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "bce9eff9-056a-4a65-8f13-41f8749fd43e",
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach(function (card) {
      let cardToInsert = getCardElement(card);
      cardsContainer.append(cardToInsert);
    });

    currentProfileName.textContent = userInfo["name"];
    currentProfileDescription.textContent = userInfo["about"];
    currentPfp.src = userInfo["avatar"];
  })
  .catch((err) => {
    console.error(err);
  });

//Selecting preview modal and its elements
const previewModal = document.querySelector("#preview-image-modal");
const previewImg = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__preview-caption");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close-button_type_preview"
);

// "Edit Profile" modal elements
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(
  ".modal__close-button",
);
const editProfileIcon = document.querySelector(".profile__edit-icon");
const editProfileForm = document.querySelector("#edit-profile-form");
const editProfileErrorSpan = editProfileForm.querySelector("modal__error");

const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description",
);

// "New Post" modal selections
const newPostBtn = document.querySelector(".profile__plus-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const newPostForm = document.querySelector("#new-post-form");
const newPostSubmitButton = newPostForm.querySelector(".modal__button");

// "Edit Avatar" modal elements
const editAvatarBtn = document.querySelector(".profile__avatar-btn");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarCloseBtn = editAvatarModal.querySelector(
  ".modal__close-button",
);
const editAvatarForm = document.querySelector("#edit-avatar-form");
const editAvatarSubmitButton = editAvatarModal.querySelector(
  ".modal__button",
);
const editAvatarInput = editAvatarModal.querySelector("#edit-avatar-input");

// "Delete card" modal elements
const deleteModal = document.querySelector("#delete-modal");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteModalForm = deleteModal.querySelector(".modal__form");
const deleteModalDeleteBtn = deleteModalForm.querySelector(
  ".modal__button_type_delete",
);
const deleteModalCancelBtn = deleteModalForm.querySelector(
  ".modal__button_type_cancel",
);

//edit profile modal close button functionality
editProfileBtn.addEventListener("click", () => {
  resetEditFormFields();
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
  //these 2 lines ensure changes to fields aren't saved if X is pressed
  //setting delay so user doesn't see field resetting until modal is fully gone
  setTimeout(() => {
    resetEditFormFields();
  }, 300);
});

/*------------------------------------------------*/

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

/*------------------------------------------------*/
//Filling form modals when opening "edit profile" modal
//Setting value of input fields
function resetEditFormFields() {
  profileNameInput.value = currentProfileName.textContent;
  profileDescriptionInput.value = currentProfileDescription.textContent;
}
resetEditFormFields();

// Functions for changing visibility (opening/closing) of modals above
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  // Callback function in this listener allows user to close current modal with Esc
  window.addEventListener("keydown", escapeToClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  window.removeEventListener("keydown", escapeToClose);
}

/*------------------------------------------------*/
// All form submission handler functions

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // Changing text to "Saving..." while fetching is being done
  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptionInput.value,
    })
    .then((data) => {
      currentProfileName.textContent = data["name"];
      currentProfileDescription.textContent = data["about"];
      closeModal(editProfileModal);
      //setting default values of input fields to new ones
      profileNameInput.value = data["name"];
      profileDescriptionInput.value = data["about"];
    })
    .catch(console.error)
    .finally(() => {
      // Changing text content of button back to "Save" now that fetching is done
      setButtonText(submitBtn, false);
    });
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);


const linkInput = newPostForm.querySelector("#image-link");
const captionInput = newPostForm.querySelector("#caption-input");

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .addNewCard({
      name: captionInput.value,
      link: linkInput.value,
    })
    .then((data) => {
      let cardToInsert = getCardElement(data);
      cardsContainer.prepend(cardToInsert);
      closeModal(newPostModal);

      setTimeout(() => {
        evt.target.reset();
        disableButton(newPostSubmitButton, selectors);
      }, 300); //setting delay so user doesn't see resetting until modal is fully gone
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

newPostForm.addEventListener("submit", handleNewPostSubmit);

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true);

  api
    .editAvatar({
      avatar: editAvatarInput.value,
    })
    .then((data) => {
      currentPfp.src = data["avatar"];
      closeModal(editAvatarModal);
      editAvatarInput.value = "";
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false);
    });
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

let selectedCard;
let selectedCardId;

function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitBtn = evt.submitter;
  setButtonText(submitBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(submitBtn, false, "Delete", "Deleting...");
    });
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
  openModal(deleteModal);
}

deleteModalForm.addEventListener("submit", handleDeleteSubmit);

function handleLike(evt, data) {
  const isLiked = data.isLiked;
  api
    .changeLikeStatus(data._id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__heart-icon_liked");
      evt.target.src = evt.target.classList.contains("card__heart-icon_liked")
        ? heartLiked
        : heartDefault;
    })
    .catch(console.error);
}

//Selecting the card template and cards container
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

//Generating cards from the template
function getCardElement(data) {
  //Selecting cloned card's image and caption and setting them
  const cardElement = cardTemplate.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  cardImg.src = data["link"];
  // cardImg.alt = data["name"];
  const cardTitle = cardElement.querySelector(".card__title");
  cardTitle.textContent = data["name"];

  cardImg.addEventListener("click", () => {
    previewImg.src = cardImg.src;
    previewImg.alt = cardImg.alt;
    previewCaption.textContent = cardTitle.textContent;
    openModal(previewModal);
  });

  // setting initial like state and adding event listener to change heart button when clicked
  const cardHeartIcon = cardElement.querySelector(".card__heart-icon");

  if (data.isLiked) {
    cardHeartIcon.src = heartLiked;
    cardHeartIcon.classList.add("card__heart-icon_liked");
  } else {
    cardHeartIcon.src = heartDefault;
  }

  cardHeartIcon.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  //event listeners for delete button: changing delete icon on hover and
  //deleting card upon clicking
  const cardBinIcon = cardElement.querySelector(".card__bin-icon");
  cardBinIcon.addEventListener("mouseover", () => {
    cardBinIcon.src = binHovered;
  });

  cardBinIcon.addEventListener("mouseout", () => {
    cardBinIcon.src = binDefault;
  });

  cardBinIcon.addEventListener("click", () =>
    handleDeleteCard(cardElement, data._id),
  );

  return cardElement;
}

//Adding event listeners for opening/closing modals

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editAvatarBtn.addEventListener("click", () => {
  openModal(editAvatarModal);
});

editAvatarCloseBtn.addEventListener("click", () => {
  closeModal(editAvatarModal);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

//Closing any of the modals by clicking outside of the modal (area with darkened background)
const modalList = document.querySelectorAll(".modal");
modalList.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) closeModal(modal);
    if (evt.target.id === "edit-profile-modal") {
      setTimeout(() => {
        resetEditFormFields();
      }, 300);
    }
  });
});

//function for closing modal by pressing Escape key
//listener added to modal in openModal() function, listener removed in closeModal() function
function escapeToClose(evt) {
  //only one modal can have this class at once
  const currentOpenModal = document.querySelector(".modal_is-opened");
  if (evt.keyCode === 27) {
    closeModal(currentOpenModal);
    if (currentOpenModal.id === "edit-profile-modal") {
      setTimeout(() => {
        resetEditFormFields();
      }, 300);
    }
  }
}

