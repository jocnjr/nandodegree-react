import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    searchBooks: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  getSearchBooks = (query) => {
    BooksAPI.search(query).then((searchBooks) => {
      this.setState({ searchBooks })
    })
  }

  render() {
    console.log(this.props.searchBooks)
    let filteredBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      filteredBooks = this.props.searchBooks.filter((book) => match.test(book.title))
    } else {
      filteredBooks = this.props.searchBooks
    }

    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
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