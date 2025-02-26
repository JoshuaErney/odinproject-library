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

document.addEventListener("click", function (e) {
    if (e.target.closest("#remove")) {
        const bookCard = e.target.closest(".book-card");
        if (bookCard) {
            bookCard.remove(); // Remove the book from the DOM
        }
    }

    if (e.target.closest("#untouched")) {
        const button = e.target.closest("#untouched");
        const textElement = button.querySelector("#btn-text-read");

        if (textElement) {
            textElement.textContent = textElement.textContent.trim() === "Untouched" ? "Completed" : "Untouched";
        }
    }
});

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

let uploadedImageData = "";

imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            uploadedImageData = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

function addToShelf(book) {
    createBook(book);
}

function clearInputFields() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("file").forEach(file => file.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const book = Object.fromEntries(new FormData(form));

    if (uploadedImageData) {
        book.imageUpload = uploadedImageData;
        uploadedImageData = "";
    }

    clearInputFields();
    dialog.close();
    addUnfinishedBook(book);
});

function addUnfinishedBook(bookData) {
    let newBook = new Book(
        bookData.ISBN,
        bookData.title,
        bookData.imageUpload,
        bookData.author,
        bookData.genre,
        bookData.numOfPages,
        bookData.yearPublished,
        bookData.publisher,
        bookData.language,
        bookData.edition,
        bookData.format,
        bookData.location,
        bookData.tags,
        bookData.rating,
        bookData.availabilityStatus,
        bookData.digitalVersionURL,
        bookData.seriesInfo,
        bookData.bookRecipient,
        bookData.checkoutDate
    );

    myLibrary.unfinishedBooks.push(newBook);
    return addToShelf(newBook);
}

class Book {
    constructor(ISBN, title, imageUpload, author, genre, numOfPages, yearPublished, publisher, language, edition, format, location, tags, rating, availabilityStatus, digitalVersionURL, seriesInfo, bookRecipient, checkoutDate) {
        this.ISBN = ISBN;
        this.title = title;
        this.imageUpload = imageUpload || "https://placehold.co/300x480?text=book+image%0Aplaceholder";
        this.author = author;
        this.genre = genre;
        this.yearPublished = yearPublished;
        this.numOfPages = numOfPages;
        this.publisher = publisher || undefined;
        this.language = language || undefined;
        this.edition = edition || undefined;
        this.format = format || undefined;
        this.location = location || undefined;
        this.tags = tags || [];
        this.rating = rating || undefined;
        this.availabilityStatus = availabilityStatus || "Available";
        this.digitalVersionURL = digitalVersionURL || undefined;
        this.seriesInfo = seriesInfo || undefined;
        this.bookRecipient = bookRecipient || [];
        this.checkoutDate = checkoutDate || undefined;
    }
}

function createBook(book) {
    const bookCard = document.createElement("div");
    const bookCoverImg = document.createElement("div");
    const bookActions = document.createElement("div");
    const bookImg = document.createElement("img");

    bookCard.setAttribute("class", "book-card");
    bookCoverImg.setAttribute("class", "book-cover-img");
    bookActions.setAttribute("class", "book-actions");

    bookImg.setAttribute("id", "book-img");
    bookImg.setAttribute("alt", "Book Cover");
    bookImg.setAttribute("src", book.imageUpload);

    function createBtns() {
        const buttonsData = [
            { ariaLabel: "Book Details", icon: "book", text: "Details", id: "details", paraID: "btn-text-details" },
            { ariaLabel: "Mark as Read", icon: "book-open", text: "Untouched", id: "untouched", paraID: "btn-text-read" },
            { ariaLabel: "Remove from Shelf", icon: "trash", text: "Remove", id: "remove", paraID: "btn-text-delete" }
        ];

        buttonsData.forEach(data => {
            const button = document.createElement("button");
            const para = document.createElement("p");
            const icon = document.createElement("i");

            button.classList.add("btn-details", "icon");
            button.setAttribute("aria-label", data.ariaLabel);
            icon.setAttribute("data-feather", data.icon);
            para.setAttribute("id", data.paraID);
            para.textContent = data.text;
            button.setAttribute("id", data.id);

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

