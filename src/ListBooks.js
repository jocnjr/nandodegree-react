import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    render() {
        const { books, shelf, getNewShelf } = this.props
        
        let filteredBooks = books.filter((book) => book[Object.keys(book)[0]].shelf === shelf)
        
        return(
            <Book 
                key={filteredBooks.index} 
                getNewShelf={getNewShelf}
                books={filteredBooks} 
            />
        )
    }
}

export default ListBooks