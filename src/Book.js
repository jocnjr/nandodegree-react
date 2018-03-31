import React, { Component } from 'react'

class Book extends Component {


    render() {
        const { books, getNewShelf, getShelf } = this.props
        console.log(books, 'wheres my shelf?')
        return(
            <ol className="books-grid">
            {books.map((book) => (
                <li  key={book.id}>
                    <div className="book">
                    <div className="book-top">
                    {book.imageLinks ? (
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                    ) : (
                        <div className="book-cover" style={{ width: 128, height: 193}}>Book Cover not available</div>
                    )}
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(e) => getNewShelf(e, book)}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors ? 
                            (book.authors.map((author) => (
                                <div key={author} className="book-authors">{author}</div>
                            ))) : ('none')}
                    </div>
                </li>
            ))}
            </ol>
        )
    }
}

export default Book