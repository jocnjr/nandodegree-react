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
      this.parseData = this.parseData.bind(this);
    }

  componentDidMount() {
    BooksAPI.getAll().then((booksInShelf) => {
      booksInShelf.forEach((book, i) => {
        this.parseData(booksInShelf[i])
      })
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

  updateQuery = (query) => {
    if (query === 'clear query' || !query) {
      this.setState({ booksInSearch: [] })
    }

    this.searchTerms.forEach((term) => {
      term = term.toLowerCase()
      if (term !== query) {
        this.setState({ query: query.toLowerCase() })
      } else {
        BooksAPI.search(query).then((booksInSearch) => {
          booksInSearch.forEach((book, i) => {
            let foreignShelf = 'none'
            this.state.booksInShelf.forEach((b) => {
                if (b.id === book.id) {
                  foreignShelf = b.shelf
                }
            })
            booksInSearch[i].shelf = foreignShelf
            this.parseData(booksInSearch[i])
          })
          this.setState({ booksInSearch })
        })
        .catch((e) => console.log(e))
      }
    })
  }
  
  queryByTerm = (term) => {
    term = term.toLowerCase()
    BooksAPI.search(term).then((booksInSearch) => {
      booksInSearch.forEach((book, i) => {
        let foreignShelf = 'none'
        this.state.booksInShelf.forEach((b) => {
            if (b.id === book.id) {
              foreignShelf = b.shelf
            }
          })
          booksInSearch[i].shelf = foreignShelf
          this.parseData(booksInSearch[i])
      })
      this.setState({ booksInSearch })
    })
    .catch((e) => console.log(e))
  }

  parseData = (book) => {
    if (!book.hasOwnProperty('imageLinks')) book.imageLinks = []
    if (!book.hasOwnProperty('authors')) book.authors = ['sorry, no author(s)']
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
                updateQuery={this.updateQuery}
              />
            )}/>
            <Route exact path='/search' render={({ history }) => (
              <Search
                searchTerms={this.searchTerms}
                getNewShelf={this.getNewShelf}
                books={this.state.booksInSearch}
                updateQuery={this.updateQuery}
                queryByTerm={this.queryByTerm}
              />
            )}/> 
        </div>
      </Router>
    )
  }
}

export default BooksApp
