import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    render() {
        const { books, shelf, getNewShelf } = this.props
        
        let filteredBooks = books.filter((book) => book.shelf === shelf)
        
        return(
            <Book key={books.index} getNewShelf={getNewShelf} books={filteredBooks} />
        )
    }
}

export default ListBooks