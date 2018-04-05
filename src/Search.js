import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import ListBooks from './ListBooks'

function Search(props) {

    const { books, getNewShelf, query, updateQuery } = props
    
    let filteredBooks
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredBooks = books.filter((book) => match.test(book.title))
    } else {
      filteredBooks = books
    }

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={props.query}
              onChange={(event) => updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <ListBooks  
          getNewShelf={getNewShelf}
          books={filteredBooks}
        />
        </div>
      </div>
    )
}

export default Search