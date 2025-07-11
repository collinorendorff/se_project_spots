// "Edit Profile" modal selections and class editing
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-button");

editProfileBtn.addEventListener("click", function () {
    editProfileModal.classList.toggle("modal_is-opened");
});

editProfileCloseBtn.addEventListener("click", function () {
    editProfileModal.classList.toggle("modal_is-opened");
});

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