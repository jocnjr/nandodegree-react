import React, { Component } from 'react'

class Book extends Component {


    render() {
        const { books, getNewShelf } = this.props

        return(
            <ol className="books-grid">
            {books.map((book, i) => (
                <li  key={i}>
                    <div className="book">
                    <div className="book-top">
                    {book[Object.keys(book)[0]].imageLinks ? (
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book[Object.keys(book)[0]].imageLinks.thumbnail})`}}></div>
                    ) : (
                        <div className="book-cover" style={{ width: 128, height: 193}}>Book Cover not available</div>
                    )}
                        <div className="book-shelf-changer">
                            <select defaultValue={book[Object.keys(book)[0]].shelf} onChange={(e) => getNewShelf(e, book[Object.keys(book)[0]])}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book[Object.keys(book)[0]].title}</div>
                    {book[Object.keys(book)[0]].authors ? 
                            (book[Object.keys(book)[0]].authors.map((author) => (
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