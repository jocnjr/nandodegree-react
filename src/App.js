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
    console.log('getNewShelf', book)
    const shelfForm = event.target.value
    book.shelf = shelfForm
    BooksAPI.update(book, shelfForm)
    .then((booksIdByShelf) => {
        console.log('response', booksIdByShelf, book)
        let bookNewStructure = {}
        bookNewStructure[book.id] = book
        this.setState((state) => ({
          booksInShelf: state.booksInShelf.filter((b) => b[Object.keys(b)[0]].id !== book.id).concat([ bookNewStructure ])

        }))
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
              let foreignShelf = 'none'
              this.state.booksInShelf.map((b) => {
                for (const bookKey in b) {
                  if (bookKey === book.id) {
                    foreignShelf = b.shelf
                  }
                }
              })
              newBookObj[book.id].shelf = foreignShelf
              if (!book.imageLinks) newBookObj[book.id].imageLinks = []
              if (!book.authors) newBookObj[book.id].authors = ['sorry, the author is missing']
              newBooksStructure.push(newBookObj)
            })

            booksInSearch = newBooksStructure

            this.setState({ booksInSearch })

          })
          .catch((e) => console.log(e))
      }
    })
  }

  parseShelf = (book) => {
    if (!book.shelf) book.shelf = 'none'
  }

  parseImageLinks = (book) => {
    if (!book.imageLinks) book.imageLinks = []
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
