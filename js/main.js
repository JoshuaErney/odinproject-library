const dialog = document.querySelector("#quickAddDialog");
const form = document.querySelector("form");
const bookDisplay = document.querySelector(".bookDisplay");
const imageInput = document.querySelector("#imageUpload");
const pendingBookList = document.querySelector(".pending-book-list");
const availableBookList = document.querySelector(".available-book-list");
const quickAddBtn = document.querySelector("#quickAddBtn");
const cancelBtn = document.querySelector(".cancelBtn");
const submitBtn = document.querySelector(".submitBtn");
const refreshBtn = document.querySelector(".refreshBtn");

quickAddBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
});

const myLibrary = {
    finishedBooks: [],
    unfinishedBooks: [],
    bookLookup: []
};

let uploadedImageData = ""; // This will store the image data URL

imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0]; // Get the selected file

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImageData = e.target.result; // Store the Base64 image data
        };

        reader.readAsDataURL(file); // Convert file to Base64
    }
});

function addToShelf(book) {
    createBook(book);
}

function addUnfinishedBook(book) {
    let newBook = new Book(...Object.values(book));
    myLibrary.unfinishedBooks.push(newBook);
    return addToShelf(book);
}

function clearInputFields() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("file").forEach(file => file.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
}

// Submit button captures the form data
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const book = Object.fromEntries(new FormData(form));

    if (uploadedImageData) {
        book.imageUpload = uploadedImageData;
        uploadedImageData = "";
    } else {
        book.imageUpload = "https://placehold.co/300x480?text=book+image%0Aplaceholder";
    }

    clearInputFields();
    dialog.close();
    addUnfinishedBook(book);
});

class Book {
    constructor(title, imageUpload, author, genre, numOfPages, yearPublished, ISBN, publisher, language, edition, format, location, tags, summary, rating, availabilityStatus, digitalVersionURL, seriesInfo, bookRecipient, checkoutDate) {
        this.title = title;
        this.imageUpload = imageUpload || "https://placehold.co/300x480?text=book+image%0Aplaceholder";
        this.author = author;
        this.genre = genre;
        this.yearPublished = yearPublished;
        this.numOfPages = numOfPages;
        this.ISBN = ISBN;
        this.publisher = publisher || undefined;
        this.language = language || undefined;
        this.edition = edition || undefined;
        this.format = format || undefined;
        this.location = location || undefined;
        this.tags = tags || [];
        this.summary = summary || undefined;
        this.rating = rating || 0;
        this.availabilityStatus = availabilityStatus || "Available";
        this.digitalVersionURL = digitalVersionURL || undefined;
        this.seriesInfo = seriesInfo || undefined;
        this.bookRecipient = bookRecipient || [];
        this.checkoutDate = checkoutDate || undefined;
    }
}

function createBook(book) {
    // Create Elements
    const bookCard = document.createElement("div");
    const bookCoverImg = document.createElement("div");
    const bookActions = document.createElement("div");
    const bookImg = document.createElement("img");

    // Set Classes
    bookCard.setAttribute("class", "book-card");
    bookCoverImg.setAttribute("class", "book-cover-img");
    bookActions.setAttribute("class", "book-actions");

    bookImg.setAttribute("id", "book-img");
    bookImg.setAttribute("alt", "Book Cover");
    bookImg.setAttribute("src", book.imageUpload);

    function createBtns() {
        const buttonsData = [
            { ariaLabel: "Book Details", icon: "book", text: "Details" },
            { ariaLabel: "Mark as Read", icon: "book-open", text: "Unread" },
            { ariaLabel: "Remove from Shelf", icon: "trash", text: "Remove" }
        ];

        buttonsData.forEach(data => {
            const button = document.createElement("button");
            const para = document.createElement("p");
            const icon = document.createElement("i");

            button.classList.add("btn-details", "icon");
            button.setAttribute("aria-label", data.ariaLabel);
            icon.setAttribute("data-feather", data.icon);
            para.textContent = data.text;

            button.appendChild(icon);
            button.appendChild(para);

            bookActions.appendChild(button);
        });
    }

    createBtns();

    bookCoverImg.appendChild(bookImg);
    bookCard.appendChild(bookCoverImg);
    bookCard.appendChild(bookActions);

    pendingBookList.appendChild(bookCard);

    feather.replace();
}