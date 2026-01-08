//how to play 
// Get modal elements
const howButton = document.getElementById("howButton");
const popupModal = document.getElementById("popupModal");
const closeButton = document.getElementById("closeButton");

// Show the popup when "How to Play" button is clicked
howButton.addEventListener("click", () => {
    popupModal.style.display = "flex";
});

// Hide the popup when the "Close" button is clicked
closeButton.addEventListener("click", () => {
    popupModal.style.display = "none";
});

// Close the popup when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === popupModal) {
        popupModal.style.display = "none";
    }
});

// Example to open the popup
function openPopup() {
    document.querySelector('.popup-modal').style.display = 'flex';
    document.body.classList.add('modal-open'); // Disable body scroll
}

// Example to close the popup
function closePopup() {
    document.querySelector('.popup-modal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable body scroll
}

//Nota start

// Get notes modal elements
const notesButton = document.getElementById("notesButton");
const notesPopupModal = document.getElementById("notesPopupModal");
const closeNotesButton = document.getElementById("closeNotesButton");

// Show the notes popup when "Notes" button is clicked
notesButton.addEventListener("click", () => {
    notesPopupModal.style.display = "flex";
    document.body.classList.add('modal-open'); // Disable body scroll
});

// Hide the notes popup when the "Close" button is clicked
closeNotesButton.addEventListener("click", () => {
    notesPopupModal.style.display = "none";
    document.body.classList.remove('modal-open'); // Re-enable body scroll
});

// Close the notes popup when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === notesPopupModal) {
        notesPopupModal.style.display = "none";
        document.body.classList.remove('modal-open'); // Re-enable body scroll
    }
});


//about start

// Get notes modal elements
const aboutButton = document.getElementById("aboutButton");
const aboutPopupModal = document.getElementById("aboutPopupModal");
const closeAboutButton = document.getElementById("closeAboutButton");

// Show the notes popup when "Notes" button is clicked
aboutButton.addEventListener("click", () => {
    aboutPopupModal.style.display = "flex";
    document.body.classList.add('modal-open'); // Disable body scroll
});

// Hide the notes popup when the "Close" button is clicked
closeAboutButton.addEventListener("click", () => {
    aboutPopupModal.style.display = "none";
    document.body.classList.remove('modal-open'); // Re-enable body scroll
});

// Close the notes popup when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === aboutPopupModal) {
        aboutPopupModal.style.display = "none";
        document.body.classList.remove('modal-open'); // Re-enable body scroll
    }
});


//kredit start

// Get kredit modal elements
const kreditButton = document.getElementById("kreditButton");
const kreditPopupModal = document.getElementById("kreditPopupModal");
const closeKreditButton = document.getElementById("closeKreditButton");

// Show the notes popup when "Notes" button is clicked
kreditButton.addEventListener("click", () => {
    kreditPopupModal.style.display = "flex";
    document.body.classList.add('modal-open'); // Disable body scroll
});

// Hide the notes popup when the "Close" button is clicked
closeKreditButton.addEventListener("click", () => {
    kreditPopupModal.style.display = "none";
    document.body.classList.remove('modal-open'); // Re-enable body scroll
});

// Close the notes popup when clicking outside the modal content
window.addEventListener("click", (event) => {
    if (event.target === kreditPopupModal) {
        kreditPopupModal.style.display = "none";
        document.body.classList.remove('modal-open'); // Re-enable body scroll
    }
});