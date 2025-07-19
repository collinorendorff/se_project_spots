//Array for storing "card" objects and their data
const initialCards = [
    {
        name: 'Val Thorens',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg'
    },
    {
        name: 'Restaurant terrace',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg'
    },
    {
        name: 'An outdoor cafe',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg'
    },
    {
        name: 'A very long bridge, over the forest and through the trees',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg'
    },
    {
        name: 'Tunnel with morning light',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg'
    },
    {
        name: 'Mountain house',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg'
    },
    {
        name: 'Golden Gate Bridge',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg'
    },
];

// "Edit Profile" modal selections
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-button");
const editProfileIcon = document.querySelector(".profile__edit-icon");

//edit profile modal close button functionality
editProfileBtn.addEventListener("click", () => {
    openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", () => {
    closeModal(editProfileModal);
    //these 2 lines ensure changes to fields aren't saved if X is pressed
    profileNameInput.value = currentProfileName.textContent;
    profileDescriptionInput.value = currentProfileDescription.textContent;
});

/*------------------------------------------------*/
// "New Post" modal selections and class editing
const newPostBtn = document.querySelector(".profile__plus-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");

newPostBtn.addEventListener("click", () => {
    openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
    closeModal(newPostModal);
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
    closeModal(editProfileModal);
}

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
/*------------------------------------------------*/
//New Post form submission
const newPostForm = document.querySelector("#new-post-form");
const linkInput = document.querySelector('#image-link');
const captionInput = document.querySelector('#caption-input');

function handleNewPostSubmit(evt) {
    evt.preventDefault();
    
    //making object containing inputted values and inserting new object into
    //getCardElement() function
    let cardData = {
        name: captionInput.value,
        link: linkInput.value,
    };

    let cardToInsert = getCardElement(cardData);
    cardsContainer.prepend(cardToInsert);

    closeModal(newPostModal);

    evt.target.reset();
}

newPostForm.addEventListener('submit', handleNewPostSubmit);

//functions for changing visibility (opening/closing) of modals above
function openModal(modal) {
    modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
    modal.classList.remove("modal_is-opened");
}

//Selecting the card template and cards container
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");
const cardsContainer = document.querySelector(".cards__pics");

//Selecting preview modal and its elements
const previewModal = document.querySelector("#preview-image-modal");
const previewImg = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__preview-caption");

//Looping through array of cards "initialCards" and populating container of cards
initialCards.forEach(function (card) {
    let cardToInsert = getCardElement(card);
    cardsContainer.prepend(cardToInsert);
});

//Generating cards from the template
function getCardElement(data) {
    //Selecting cloned card's image and caption and setting them
    const cardElement = cardTemplate.cloneNode(true);
    const cardImg = cardElement.querySelector(".card__image");
    cardImg.src = data.link;
    cardImg.alt = data.name;
    const cardTitle = cardElement.querySelector(".card__title");
    cardTitle.textContent = data.name;

    cardImg.addEventListener('click', () => {
        previewImg.src = cardImg.src;
        previewImg.alt = cardImg.alt;
        previewCaption.textContent = cardTitle.textContent;
        openModal(previewModal);
    });
    

    //event listener to change heart button when clicked
    const cardHeartIcon = cardElement.querySelector(".card__heart-icon");
    cardHeartIcon.addEventListener('click', () => {
        if (!cardHeartIcon.classList.contains("card__heart-icon_liked")) {
            cardHeartIcon.src = './images/heart-liked.svg';
        } else {
            cardHeartIcon.src = "./images/heart-default.svg";
        }
        cardHeartIcon.classList.toggle("card__heart-icon_liked");
    });

    //event listeners for delete button: changing delete icon on hover and 
    //deleting card upon clicking
    const cardBinIcon = cardElement.querySelector(".card__bin-icon");
    cardBinIcon.addEventListener('mouseover', () => {
        cardBinIcon.src = "./images/bin-hovered.svg";
    });

    cardBinIcon.addEventListener('mouseout', () => {
        cardBinIcon.src = "./images/bin-default.svg";
    });

    cardBinIcon.addEventListener('click', () => {
        cardElement.remove();
    });

    return cardElement;
}

//Adding event listener to close button on preview modal
const previewCloseBtn = previewModal.querySelector(".modal__close-button_type_preview");
previewCloseBtn.addEventListener('click', () => {
    closeModal(previewModal);
})