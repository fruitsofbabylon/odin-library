const myLibrary = [];
const bookCards = document.querySelector('.book-cards');

//add book entity constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
};

Book.prototype.changeState = function() {
  this.read = !this.read;
};

//create book obj based on params and add it to the books array
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

// display each book obj as a card on the page
function addBookCard() {
  bookCards.textContent = '';
  for (const book of myLibrary) {

    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = `${book.id}`;
    
    const title = document.createElement('h2');
    title.textContent = book.title;
    
    const author = document.createElement('p');
    author.textContent = book.author;
    
    const pages = document.createElement('p');
    pages.textContent = `${book.pages} pages`;
    
    const checkboxDiv = document.createElement('div');
    const checkbox = document.createElement('input');
    const label = document.createElement('label');

    checkbox.type = 'checkbox';
    checkbox.id = 'readbook';
    checkbox.name = 'readbook';
    checkbox.checked = book.read;
    checkbox.addEventListener('change', () => {
      const bookItem = myLibrary.find(book => book.id === card.dataset.id);
      bookItem.changeState();
      label.textContent = bookItem.read ? 'Read' : 'Not read yet';
    });
    checkbox.value = book.read ? 'Read' : 'Not Read';
    label.htmlFor = 'readbook';
    label.textContent = book.read ? 'Read' : 'Not read yet';

    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    checkboxDiv.classList.add('checkbox');
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'removeBtn';
    removeBtn.addEventListener('click', () => {
      const bookIndex = myLibrary.findIndex(book => book.id === card.dataset.id);
      myLibrary.splice(bookIndex, 1);
      card.remove();
    });
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(checkboxDiv);
    card.appendChild(removeBtn);
    
    bookCards.appendChild(card);
  };
}

// add new book from input from the dialog
const showBtn = document.getElementById('showDialog');
const formDialog = document.getElementById('formDialog');
const form = formDialog.querySelector('form');
const readCheckbox = formDialog.querySelector('#read');

formDialog.addEventListener('click', (event) => {
  if (event.target === formDialog) {
    formDialog.close();
  }
});

showBtn.addEventListener('click', () => {
  formDialog.showModal();
  readCheckbox.addEventListener('change', () => {
    formDialog.querySelector('#labelSwitch').innerHTML = readCheckbox.checked ? 'Read' : 'Not read yet';
  });
});

form.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    return;
  }

  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  addBookCard();

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;

  formDialog.close();
});

addBookToLibrary('Jane Eyre', 'Charlotte Brontë', 624, true);
addBookCard();