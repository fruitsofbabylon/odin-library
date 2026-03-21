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
    checkbox.type = 'checkbox';
    checkbox.id = 'readbook';
    checkbox.name = 'readbook';
    checkbox.value = book.read ? 'Read' : 'Not Read';
    checkbox.checked = book.read;
    
    const label = document.createElement('label');
    label.htmlFor = 'readbook';
    label.textContent = book.read ? 'Read' : 'Not read yet';
    
    checkboxDiv.appendChild(checkbox);
    checkboxDiv.appendChild(label);
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'removeBtn';
    
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(checkboxDiv);
    card.appendChild(removeBtn);
    
    bookCards.appendChild(card);
  };
}

//delete book card with remove btn
function removeCardListener() {
  const removeBtns = document.querySelectorAll('.removeBtn');

  removeBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const bookCard = btn.closest('.card');
      const bookIndex = myLibrary.findIndex(book => book.id === bookCard.dataset.id);
      myLibrary.splice(bookIndex, 1);
      bookCard.remove();
    });
  });
}

// add new book from input from the dialog
const showBtn = document.getElementById('showDialog');
const formDialog = document.getElementById('formDialog');
const submitBtn = formDialog.querySelector('#submitBtn');

showBtn.addEventListener('click', () => {
  formDialog.showModal();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value, 10);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);
  addBookCard();
  removeCardListener();

  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('pages').value = '';
  document.getElementById('read').checked = false;

  formDialog.close();
});

addBookToLibrary('Jane Eyre', 'Charlotte Brontë', 624, true);
addBookCard();
removeCardListener();