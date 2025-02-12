const dialog = document.querySelector("#quickAddDialog");
const form = document.querySelector("form");
const bookDisplay = document.querySelector(".bookDisplay");
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
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
}

// Submit button captures the form data
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const book = Object.fromEntries(new FormData(form));
    clearInputFields();
    dialog.close();
    addUnfinishedBook(book);
});

class Book {
    constructor(title, author, genre, numOfPages, yearPublished, ISBN, publisher, language, edition, format, location, tags, summary, coverImageURL, rating, availabilityStatus, digitalVersionURL, seriesInfo, bookRecipient, checkoutDate) {
        this.title = title;
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
        this.coverImageURL = coverImageURL || "https://placehold.co/300x480?text=book+image%0Aplaceholder";
        this.rating = rating || 0;
        this.availabilityStatus = availabilityStatus || "Available";
        this.digitalVersionURL = digitalVersionURL || undefined;
        this.seriesInfo = seriesInfo || undefined;
        this.bookRecipient = bookRecipient || [];
        this.checkoutDate = checkoutDate || undefined;
    }
}

function createBook(book) {
    // Create the book card
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    // Create the book cover container
    const bookCover = document.createElement("div");
    bookCover.classList.add("book-cover-img");

    // Create the image element
    const bookImg = document.createElement("img");
    bookImg.src = "https://placehold.co/300x480?text=book+image%0Aplaceholder";
    bookImg.id = "book-img";
    bookImg.alt = "Book Cover";

    // Append image to book cover container
    bookCover.appendChild(bookImg);

    // Create the book actions container
    const bookActions = document.createElement("div");
    bookActions.classList.add("book-actions");

    // Function to create buttons
    function createButton(iconName, text, ariaLabel) {
        const button = document.createElement("button");
        button.classList.add("btn-details", "icon");
        button.setAttribute("aria-label", ariaLabel);

        const icon = document.createElement("i");
        icon.setAttribute("data-feather", iconName);

        const paragraph = document.createElement("p");
        paragraph.textContent = text;

        button.appendChild(icon);
        button.appendChild(paragraph);

        return button;
    }

    // Create and append buttons
    bookActions.appendChild(createButton("btn-details", "book", "Details", "Book Details"));
    bookActions.appendChild(createButton("btn-details", "book-open", "Unread", "Mark as Read"));
    bookActions.appendChild(createButton("btn-details", "trash", "Remove", "Remove from Shelf"));

    // Append elements to book card
    bookCard.appendChild(bookCover);
    bookCard.appendChild(bookActions);

    // Append book card to book list
    pendingBookList.appendChild(bookCard);
}

/*
    The International Standard Book Number (ISBN) format is 13 digits long, with each digit separated by a hyphen or space
    
    Prefix: The first three digits, which are always either 978 or 979 
    
    Registration group: The next one to five digits, which identify the country, region, or language where the book was registered 
    
    Registrant: The next up to seven digits, which identify the publisher or imprint 
    
    Publication: The next up to six digits, which identify the edition and format of the book
    
    Check digit: The final digit, which is calculated using a mathematical formula to validate the other digits
       
*/