import React, { Component } from 'react'
import ListBooks from './ListBooks'

class ListShelves extends Component {

    render() {
        return(
            <div className="list-books-content">
            {this.props.shelves.map((shelf) => (
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                      <ListBooks keys={shelf.id} shelf={shelf.id} books={this.props.books} />
                  </div>
                </div>
              </div>
            ))}
            </div>
        )
    }
}

export default ListShelves