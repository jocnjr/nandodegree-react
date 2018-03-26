import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    state = {
        query: ''
    }

    
    render() {
        const { books, shelf } = this.props
        
        let filteredBooks = books.filter((book) => book.shelf === shelf)
        
        return(
            <Book books={filteredBooks} />
        )
    }
}

export default ListBooks