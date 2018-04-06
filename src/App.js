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
          this.setState({ booksInSearch: [] })
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
      this.setState({ booksInSearch: [] })
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
    if (!book.hasOwnProperty('imageLinks')) {
      book.imageLinks = {}
      book.imageLinks.thumbnail = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADBCAMAAAAw5EgwAAAAHlBMVEX///8AAAD8/Pz5+fkEBAT19fUJCQkMDAzz8/Pt7e2WBtw3AAAEd0lEQVR4nO1Y4brcKAhFQNO+/wsvcNA42/brza65vzi3nRgnExAQDhIVCoVCoVAoFAqFQqFQKBQKhUKhUCgUCoVCoVAoFAqFwt/ApK2N1hoTNSUhVh+ST6tf7aI+ZjzaiONXB6HN32tvlstFi406tQTRtUZzTs7K77Fu8nW7FKbRusTQRRLHd6YXiV9MP7fLQQ3MrsOX5BJVBVJDsgEqmVNcoiqH9aHbOfiSzL+jsaQvlLFMWir5XZ+Cmx72gceAhZnZwT708thjXcLc9m24NTTjz1R1n52Cx1uowBF+IuHxtdrmT4wQ7RvFI8KU6ufkM3XVOd48Dh+EIXDjGiBYEAoHEatlN+vc+PGh8W/N2+rhKt8uJzWISEduCe+ue+z9Ne8QS1jjoPvx+rz4e2W7n8h58Rzp0xzPHtbiF33CJeuTIDb+5uAFyfzLxC5MfvNxBh8vZbnvmW7ZvvtEJH0hZx0AQffWSsGCjbE5YYuPo6WAPz7m8N/z+Si/FAFQ5Y5wRthjuNngRWCdiiQ0WDwxW2lwjZyONEWpflUJ8TRrxQeVKCuEpcIG+eM4E/pABFu/wHw02Jc7AGk6asIPbIb3AC7SghhFPo4tEHpIQy5+0wHY+eZ01R/DGIk2yqjwFHyZGiwvxyFHsXFOAE6GLQFLgBIdTYC/kz/poHOuLInSFheRPVu9ogGDkYAdpQbgw6SHeegf4buQYu9hG2pE32Qq74KTmyw6xmiNGLvgfQVmjAvqELY8Z/7/FkTMyUaLBNVBcvgdCshsPAUcjSlj/xvk+2o7/cwSKElLfPg98qflOYNgaXUb5qAgcB26CQdvPf/NeTvRrdFSQuajH2o90zADXPxl7GVOGK/jxYmSl8gnE5v6b09OqvR15E/n8YfOfZ9kJPpSRi3uSA3DKzFapXiyKSx0zzyMEu90reGNSh/ttxccjgQ4KUBWgh5ZuIW8sR2UmGpgTEGUnvXK7AtjK3uW9xkHIT1E2ChPQKz5Gm0WP5sboCaapycEcgDKIKt1+roC8QN7XfagJqdd5MSLsFZ3AbxhFIDblQcTphdKVBxe9HlSwvzYA1nmrcZ7mFvlc85hDajeLTlHxx7Lcr38gEyuKE1erHBa4G18HKhsO+hLCKLlonAMk5bnaMSbfsZA8pGM1DjN02kenrT1YbUA03fVR5AeEKB4v//RdkYFAzScEa5jM6apgKafHkahIKLCfNh0ihi0LiCa/2UBXsc3YYaL4oyC+miRowS1mx7KDx/oFWoMLDiXzXEIE1FBaEV0KjKZGtoTt91w12EbBmV5lInSizJtrx29CFOwX0sHomGP5iTVTWYXW/sY4aMgKj5KlfTp+nFBlpW71kaOla0sJAm9uWjwg/k7yiIi/2kXZrpfXW//6LlXVPPUyxLOPWZvHHkrRc/6hb7Tnfk/lyn315Tr5lWoZrDNLdfzJcnhvq7BHS+8livrhtZq9mMIaDltPcvz/PrVhrFQKBQKhUKhUCgUCoVCoVAoFAqFQqFQKBQKhUKhUCgU/jf+AUvwDTMdRn/HAAAAAElFTkSuQmCC'
    }
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
