import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import Search from './Search'

class BooksApp extends Component {

  state = {
    books: [],
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
      }
    ]
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })    
  }

  getNewShelf = (event, book) => {
    const shelfForm = event.target.value
    book.shelf = shelfForm
    BooksAPI.update(book, shelfForm)
    .then(() => {
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id).concat([ book ])
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
  

  render() {
    return (
      <Router>
        <div className="app">
            <Route exact path='/' render={() => (
              <ListShelves 
                getNewShelf={this.getNewShelf}
                getShelf={this.getShelf}
                shelves={this.state.shelves}
                books={this.state.books}
              />
            )}/>
            <Route exact path='/search' render={({ history }) => (
              <Search 
                getNewShelf={this.getNewShelf}
                getShelf={this.getShelf}
                books={this.state.books}
              />
            )}/> 
        </div>
      </Router>
    )
  }
}

export default BooksApp
