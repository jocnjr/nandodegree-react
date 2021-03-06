import React from 'react'
import propTypes from 'prop-types'

function Book(props) {
  
  const { book, getNewShelf } = props
  
  return(
      <div className="book">
      <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
          <div className="book-shelf-changer">
              <select defaultValue={book.shelf} onChange={(e) => getNewShelf(e, book)}>
                  <option disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
              </select>
          </div>
      </div>
      <div className="book-title">{book.title}</div>
      {book.authors.map((author, i) => (
          <div key={i} className="book-authors">{author}</div>
      ))}
      </div>
  )

}

Book.propTypes = {
  book: propTypes.object.isRequired,
  getNewShelf: propTypes.func.isRequired
}

export default Book