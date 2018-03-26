import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    state = {
        query: ''
    }

    
    render() {
        const { books, shelf, getNewShelf } = this.props
        
        let filteredBooks = books.filter((book) => book.shelf === shelf)
        
        return(
            <Book getNewShelf={getNewShelf} books={filteredBooks} />
        )
    }
}

export default ListBooks