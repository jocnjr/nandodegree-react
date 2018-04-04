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
      query: ''
    }
    // this.normalize = this.normalize.bind(this);
    
    this.shelves = [
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
      }]
      
    this.searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']
  }

  componentDidMount() {
    BooksAPI.getAll().then((booksInShelf) => {
      // const newBookObj = {}
      booksInShelf.forEach((book, i) => {
        // newBookObj[book.id] = book
        if (!book.imageLinks) booksInShelf[i].imageLinks = []
        if (!book.authors) booksInShelf[i].authors = ['sorry, no author(s)']
      })
      this.setState({ booksInShelf })
    })
  }

  getNewShelf = (event, book) => {
    const shelfForm = event.target.value
    book.shelf = shelfForm
    BooksAPI.update(book, shelfForm)
    .then((book) => {
        this.setState((state) => ({
          booksInShelf: state.booksInShelf.filter((b) => b.id !== book.id).concat([ book ])

        }))
      })
      .catch((e) => console.log(e))
  }

  // normalize() {

  // }

  updateQuery = (query) => {
    if (!query) {
      this.setState({ booksInSearch: [] })
    }

    this.searchTerms.forEach((term) => {
      term = term.toLowerCase()
      if (term !== query) {
        this.setState({ query: query.toLowerCase() })
      } else {
          BooksAPI.search(query).then((booksInSearch) => {
            // let newBooksStructure = []
            booksInSearch.forEach((book, i) => {
              let foreignShelf = 'none'
              this.state.booksInShelf.forEach((b) => {
                // for (const bookKey in b) {
                  if (b.id === book.id) {
                    foreignShelf = b.shelf
                  }
                // }
                console.log(b, b.shelf, foreignShelf)
              })
              booksInSearch[i].shelf = foreignShelf
              if (!book.imageLinks) booksInSearch[i].imageLinks = []
              if (!book.authors) booksInSearch[i].authors = ['sorry, no author(s)']
            })
            console.log(booksInSearch)
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
                shelves={this.shelves}
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
