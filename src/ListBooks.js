import React from 'react'
import Book from './Book'
import propTypes from 'prop-types'

function ListBooks(props) {

  const { books, shelf, getNewShelf } = props
  
  let filteredBooks

  if (shelf) {
      filteredBooks = books.filter((book) => book.shelf === shelf)
  } else {
      filteredBooks = books
  }
  
  return(
    <ol className="books-grid">
    {filteredBooks.map((book, i) => (
        <li key={i}>
            <Book 
                getNewShelf={getNewShelf}
                book={book}
            />
        </li>
    ))}
    </ol>
  )
}

ListBooks.propTypes = {
  books: propTypes.array.isRequired,
  shelf: propTypes.string,
  getNewShelf: propTypes.func.isRequired
}

export default ListBooks