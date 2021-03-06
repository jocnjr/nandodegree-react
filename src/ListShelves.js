import React from 'react'
import ListBooks from './ListBooks'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

function ListShelves(props) {

  const { books, shelves, getNewShelf, updateQuery } = props

  return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div key={shelf.id}>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelf.name}</h2>
              <div className="bookshelf-books">
                <ListBooks
                  getNewShelf={getNewShelf}
                  shelf={shelf.id}
                  books={books}
                  />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="open-search">
        <Link to='/search' onClick={() => updateQuery('clear query')}>Add a book</Link>
      </div>
    </div>
  )
}

ListShelves.propTypes = {
  books: propTypes.array.isRequired,
  shelves: propTypes.array.isRequired,
  getNewShelf: propTypes.func.isRequired,
  updateQuery: propTypes.func.isRequired
}

export default ListShelves