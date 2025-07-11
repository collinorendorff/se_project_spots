// "Edit Profile" modal selections and class editing
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-button");

editProfileBtn.addEventListener("click", function () {
    editProfileModal.classList.toggle("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
    editProfileModal.classList.toggle("modal_is-opened");
    //these 2 lines ensure changes to fields aren't saved if X is pressed
    profileNameInput.value = currentProfileName.textContent;
    profileDescriptionInput.value = currentProfileDescription.textContent;
});
/*------------------------------------------------*/
// "New Post" modal selections and class editing
const newPostBtn = document.querySelector(".profile__plus-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");

newPostBtn.addEventListener("click", function () {
    newPostModal.classList.toggle("modal_is-opened");
});

newPostCloseBtn.addEventListener("click", function () {
    newPostModal.classList.toggle("modal_is-opened");
});
/*------------------------------------------------*/
//Filling form modals when opening "edit profile" modal
//Selecting input fields in edit profile modal
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector("#profile-description");
//Selecting text content currently in profile
const currentProfileName = document.querySelector(".profile__name");
const currentProfileDescription = document.querySelector(".profile__description");
//Setting value of input fields
profileNameInput.value = currentProfileName.textContent;
profileDescriptionInput.value = currentProfileDescription.textContent;
/*------------------------------------------------*/
//Edit Profile Form submission
const editProfileForm = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    currentProfileName.textContent = profileNameInput.value;
    currentProfileDescription.textContent = profileDescriptionInput.value;
    editProfileModal.classList.toggle("modal_is-opened");
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
/*------------------------------------------------*/
//New Post form submission
const newPostForm = document.querySelector("#new-post-form");
const linkInput = document.querySelector('#image-link');
const captionInput = document.querySelector('#caption-input');

function handleNewPostSubmit(evt) {
    evt.preventDefault();

    console.log(linkInput.value);
    console.log(captionInput.value);
    newPostModal.classList.toggle("modal_is-opened");

    evt.target.reset();
}

newPostForm.addEventListener('submit', handleNewPostSubmit);