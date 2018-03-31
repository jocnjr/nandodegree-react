import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    render() {
        const { books, shelf, getNewShelf, getShelf } = this.props
        
        let filteredBooks = books.filter((book) => book.shelf === shelf)
        
        return(
            <Book 
                key={books.index} 
                getNewShelf={getNewShelf}
                getShelf={getShelf}
                books={filteredBooks} 
            />
        )
    }
}

export default ListBooks