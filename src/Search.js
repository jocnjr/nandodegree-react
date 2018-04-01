import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  render() {
    let filteredBooks
    if (this.props.query) {
      const match = new RegExp(escapeRegExp(this.props.query), 'i')
      filteredBooks = this.props.books.filter((book) => match.test(book.title))
    } else {
      filteredBooks = this.props.books
    }

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.props.query}
              onChange={(event) => this.props.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <Book  
          getNewShelf={this.props.getNewShelf}
          books={filteredBooks}
        />
        </div>
      </div>
    )
  }
}

export default Search