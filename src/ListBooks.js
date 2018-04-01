import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    render() {
        const { booksInShelf, shelf, getNewShelf, getShelf } = this.props
        
        let filteredBooks = booksInShelf.filter((book) => book[Object.keys(book)[0]].shelf === shelf)
        
        return(
            <Book 
                key={filteredBooks.index} 
                getNewShelf={getNewShelf}
                getShelf={getShelf}
                books={filteredBooks} 
            />
        )
    }
}

export default ListBooks