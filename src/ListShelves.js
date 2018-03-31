import React, { Component } from 'react'
import ListBooks from './ListBooks'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ListShelves extends Component {
    static propTypes = {
        books: propTypes.array.isRequired,
        shelves: propTypes.array.isRequired,
        getNewShelf: propTypes.func.isRequired,
      }

    render() {
        return(
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
            {this.props.shelves.map((shelf) => (
              <div key={shelf.id}>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                      <ListBooks
                        key={shelf.index}
                        getNewShelf={this.props.getNewShelf}
                        getShelf={this.props.getShelf}
                        shelf={shelf.id} books={this.props.books}
                       />
                  </div>
                </div>
              </div>
            ))}
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
        )
    }
}

export default ListShelves