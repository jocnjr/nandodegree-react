import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: '',
    searchBooks: [],
    searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
  }

  updateQuery = (query) => {
    if (!query) {
      const searchBooks = []
      this.setState({ searchBooks })
    }

    this.state.searchTerms.map((term) => {
      term = term.toLowerCase()
      if (term !== query) {
        this.setState({ query: query.toLowerCase() })
      } else {
          BooksAPI.search(query).then((searchBooks) => {
              this.setState({ searchBooks })
          })
          // .catch((e) => console.log(e))
      }
    })
  }


  render() {
    let filteredBooks
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      filteredBooks = this.state.searchBooks.filter((book) => match.test(book.title))
      // let booksWithoutShelf
      // if (filteredBooks) {
      //   filteredBooks.map((book) => {
      //     booksWithoutShelf = this.props.books.filter((b) => b.id !== book.id)
      //     console.log(booksWithoutShelf, '<<--- filtered?')
      //     booksWithoutShelf.map((book) => {
      //       book.shelf = 'none'
      //       console.log('inside the search api request --> ', book.shelf)
      //     })
      //   })
      //   console.log(booksWithoutShelf, this.props.books, '<====>')
      //   filteredBooks = Object.assign(booksWithoutShelf, this.props.books)
    } else {
      filteredBooks = this.state.searchBooks
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
          getShelf={this.props.getShelf} 
          books={filteredBooks}
        />
        </div>
      </div>
    )
  }
}

export default Search