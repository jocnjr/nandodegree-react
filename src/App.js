import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import Search from './Search'

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.state = {
      booksInShelf: [],
      booksInSearch: [],
      shelves: [
        {
            id: 'currentlyReading',
            name: 'Current Reading'
        },
        {
            id: 'wantToRead',
            name: 'Want to Read'
        },
        {
            id: 'read',
            name: 'Read'
        }],
        query: '',
        searchTerms: ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksInShelf) => {
      let newBooksStructure = []
      booksInShelf.map((book) => {
        let newBookObj = {}
        newBookObj[book.id] = book
        newBooksStructure.push(newBookObj)
      })

      booksInShelf = newBooksStructure

      this.setState({ booksInShelf })
    })
  }

  getNewShelf = (event, book) => {
    const shelfForm = event.target.value
    book.shelf = shelfForm
    BooksAPI.update(book, shelfForm)
    .then(() => {
        this.setState((state) => ({
          booksInShelf: state.booksInShelf.filter((b) => b.id !== book.id).concat([ book ])
        }))
      })
      .catch((e) => console.log(e))
  }

  getShelf = (bookId) => {
    BooksAPI.get(bookId)
    .then((book) => {
      console.log('getShelf', bookId, book.shelf)
      //console.log(book, book.shelf, 'thatś not my shelf')
      // this.setState((state) => ({
      //   books: state.books.filter((b) => b.id !== book.id).concat([ book ])
      // }))
    })
    .catch((e) => console.log(e))
  }

  updateQuery = (query) => {
    if (!query) {
      const booksInSearch = []
      this.setState({ booksInSearch })
    }

    this.state.searchTerms.map((term) => {
      term = term.toLowerCase()
      if (term !== query) {
        this.setState({ query: query.toLowerCase() })
      } else {
          BooksAPI.search(query).then((booksInSearch) => {
            let newBooksStructure = []
            booksInSearch.map((book) => {
              let newBookObj = {}
              newBookObj[book.id] = book
              newBooksStructure.push(newBookObj)
            })

            booksInSearch = newBooksStructure

            this.setState({ booksInSearch })

          })
          .catch((e) => console.log(e))
      }
    })
  }
  

  render() {
    return (
      <Router>
        <div className="app">
            <Route exact path='/' render={() => (
              <ListShelves 
                getNewShelf={this.getNewShelf}
                shelves={this.state.shelves}
                books={this.state.booksInShelf}
              />
            )}/>
            <Route exact path='/search' render={({ history }) => (
              <Search 
                getNewShelf={this.getNewShelf}
                books={this.state.booksInSearch}
                updateQuery={this.updateQuery}
              />
            )}/> 
        </div>
      </Router>
    )
  }
}

export default BooksApp
