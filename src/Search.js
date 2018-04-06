import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import ListBooks from './ListBooks'
import propTypes from 'prop-types'

function Search(props) {

    const { books, getNewShelf, query, updateQuery, searchTerms, queryByTerm } = props
    
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
              placeholder="Type a Term..."
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
            />
        </div>
      </div>
      <div className="search-books-results">
        <div className="search-books-terms">Search Terms Available</div>
          {searchTerms.map((term, i) => (
            <p key={i}><a onClick={() => queryByTerm(term)}>{term}</a></p>
          ))}
          <ListBooks    
            getNewShelf={getNewShelf}
            books={filteredBooks}
          />
        </div>
      </div>
    )
}

Search.propTypes = {
  books: propTypes.array.isRequired,
  getNewShelf: propTypes.func.isRequired,
  updateQuery: propTypes.func.isRequired,
  queryByTerm: propTypes.func.isRequired,
  searchTerms: propTypes.array.isRequired
}

export default Search