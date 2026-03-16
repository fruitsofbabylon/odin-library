const myLibrary = [];
const bookCards = document.querySelector(".book-cards");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, read) {
  // take params, create a book then store it in the array
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

function addBookCard() {
  for (const book of myLibrary) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const title = document.createElement('h2');
    title.textContent = book.title;
    
    const author = document.createElement('p');
    author.textContent = book.author;
    
    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;
    
    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `${book.id}`;
    checkbox.name = 'readbook';
    checkbox.value = book.read ? 'Read' : 'Not Read';
    checkbox.checked = book.read;
    
    const label = document.createElement('label');
    label.htmlFor = `${book.id}`;
    label.textContent = book.read ? 'Read' : 'Not read yet';
    
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(checkboxDiv);
    card.appendChild(removeBtn);
    
    bookCards.appendChild(card);
  };
}

addBookCard();