import React, { Component } from 'react'
import Book from './Book'

function ListBooks(props) {
    const { books, shelf, getNewShelf } = props
    
    let filteredBooks = books.filter((book) => book.shelf === shelf)
    
    return(
        <ol className="books-grid">
        {filteredBooks.map((book, i) => (
            <li key={i}>
                <Book 
                    getNewShelf={getNewShelf}
                    book={book}
                />
            </li>
        ))}
        </ol>
    )
}

export default ListBooks