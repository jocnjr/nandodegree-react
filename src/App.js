import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListShelves from './ListShelves'
import Search from './Search'

class BooksApp extends Component {

  state = {
    showSearchPage: true,
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
      },
      {
        id: 'none',
        name: 'None'
      }]
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
  

  render() {
    return (
      <Router>
        <div className="app">
            <Route exact path='/' render={() => (
              <ListShelves 
                getNewShelf={this.getNewShelf} 
                shelves={this.state.shelves} 
                books={this.state.books}
              />
            )}/>
            <Route exact path='/search' render={({ history }) => (
              <Search 
                searchBooks={this.state.books}
                getNewShelf={this.getNewShelf}
              />
            )}/> 
        </div>
      </Router>
    )
  }
}

export default BooksApp
