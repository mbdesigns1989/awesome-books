const title = document.getElementById('title');
const author = document.getElementById('author');
const addBtn = document.getElementById('add-btn');
let inputtedAuthor = '';
let inputtedTitle = '';

class Book {
  constructor(title, author, bookId) {
    this.title = title;
    this.author = author;
    this.bookId = bookId;
  }

  addBook = (title, author, bookId) => {
    const newBook = new Book(title, author, bookId);
    const ls = localStorage.getItem('books') !== null
      ? JSON.parse(localStorage.getItem('books'))
      : [];
    ls.unshift(newBook);
    localStorage.setItem('books', JSON.stringify(ls));
  };

  removeBook = (bookId) => {
    const ls = JSON.parse(localStorage.getItem('books'));
    const removed = ls.filter((book) => book.bookId !== bookId);
    localStorage.setItem('books', JSON.stringify(removed));
    window.location.reload();
  };

  displayBooks = () => {
    if (localStorage.getItem('books') !== null) {
      const lsBooks = JSON.parse(localStorage.getItem('books'));
      lsBooks.forEach((element) => {
        const li = document.createElement('li');
        const pTitle = document.createElement('p');
        const pAuthor = document.createElement('p');
        const removeBook = document.createElement('button');
        li.setAttribute('class', 'book-li');
        pTitle.setAttribute('class', 'book-title');
        pAuthor.setAttribute('class', 'book-author');
        removeBook.setAttribute('onclick', `removeBook(${element.bookId})`);
        pTitle.innerHTML = `${element.title}`;
        pAuthor.innerHTML = `${element.author}`;
        removeBook.innerHTML = 'Remove';
        li.innerHTML
          += pTitle.outerHTML + pAuthor.outerHTML + removeBook.outerHTML;
        document.querySelector('.books-ul').appendChild(li);
      });
    }
  };
}

const booksData = new Book();

/** Remove Book * */
// eslint-disable-next-line no-unused-vars
const removeBook = (id) => {
  booksData.removeBook(id);
};

/** Add Book * */
title.addEventListener('input', (e) => {
  inputtedTitle = e.target.value;
});

author.addEventListener('input', (e) => {
  inputtedAuthor = e.target.value;
});

addBtn.addEventListener('click', () => {
  const generatedId = Math.floor(Math.random() * 100);
  booksData.addBook(inputtedTitle, inputtedAuthor, generatedId);
});

/** display Book * */
window.addEventListener('load', booksData.displayBooks());
