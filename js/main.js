const dialog = document.querySelector("#quickAddDialog");
const form = document.querySelector("form");
const bookDisplay = document.querySelector(".bookDisplay");
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

const myLibrary = [
    finishedBooks = [],
    unfinishedBooks = [],
    bookLookup = [],
];

function addUnfinishedBook(book) {
    let newBook = Object.assign(new Book, book);
    return myLibrary[1].push(newBook);
}

function clearInputsFields() {
    document.querySelectorAll("input").forEach(input => input.value = "");
    document.querySelectorAll("select").forEach(select => select.selectedIndex = 0);
}

// Submit button captures the form data
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const book = Object.fromEntries(new FormData(form));
    clearInputsFields();
    dialog.close();
    return addUnfinishedBook(book);
});

class Book {
    constructor(title, author, genre, numOfPages, yearPublished, ISBN, publisher, language, edition, format, location, tags, summary, coverImageURL, rating, availabilityStatus, digitalVersionURL, seriesInfo) {
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
        this.tags = tags || []; // Default to empty array
        this.summary = summary || undefined;
        this.coverImageURL = coverImageURL || undefined;
        this.rating = rating || 0; // Default rating is 0
        this.availabilityStatus = availabilityStatus || "Available";
        this.digitalVersionURL = digitalVersionURL || undefined;
        this.seriesInfo = seriesInfo || null; // If part of a series
    }
}

/* 
this.borrowerHistory = []; // Stores past borrowers
this.dueDate = null; // If checked out

// Method to display book details
this.getDetails = function () {
    return `${this.title} by ${this.author}, Genre: ${this.genre}, Published: ${this.yearPublished}, ISBN: ${this.ISBN}, Edition: ${this.edition}, Format: ${this.format}, Location: ${this.location}, Availability: ${this.availabilityStatus}`;
}; 
*/

/*
    The International Standard Book Number (ISBN) format is 13 digits long, with each digit separated by a hyphen or space
    
    Prefix: The first three digits, which are always either 978 or 979 
    
    Registration group: The next one to five digits, which identify the country, region, or language where the book was registered 
    
    Registrant: The next up to seven digits, which identify the publisher or imprint 
    
    Publication: The next up to six digits, which identify the edition and format of the book
    
    Check digit: The final digit, which is calculated using a mathematical formula to validate the other digits
       
*/