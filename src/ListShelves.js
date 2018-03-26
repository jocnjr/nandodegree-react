import React, { Component } from 'react'
import ListBooks from './ListBooks'

class ListShelves extends Component {
    state = {
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


    render() {
        return(
            <div className="list-books-content">
            {this.state.shelves.map((shelf) => (
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                      <ListBooks keys={shelf.id} shelves={this.state.shelves} books={this.props.books} />
                  </div>
                </div>
              </div>
            ))}
            </div>
        )
    }
}

export default ListShelves