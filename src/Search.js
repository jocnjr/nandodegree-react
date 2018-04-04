import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

function Search(props) {

    let filteredBooks
    if (props.query) {
      const match = new RegExp(escapeRegExp(props.query), 'i')
      filteredBooks = props.books.filter((book) => match.test(book.title))
    } else {
      filteredBooks = props.books
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
              onChange={(event) => props.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <Book  
          getNewShelf={props.getNewShelf}
          books={filteredBooks}
        />
        </div>
      </div>
    )
}

export default Search