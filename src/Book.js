import React, { Component } from 'react'

class Book extends Component {


    render() {
        const { books, getNewShelf } = this.props
        console.log('sera que estou recebendo as props?', books)

        return(
            <ol className="books-grid">
            {books.map((book) => (
                <li  key={book.id}>
                    <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
                        <div className="book-shelf-changer">
                        <form>
                            <select onChange={(e) => getNewShelf(e, book)}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </form>
                        </div>
                    </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map((author) => (
                            <div key={author} className="book-authors">{author}</div>
                        ))}
                    </div>
                </li>
            ))}
            </ol>
        )
    }
}

export default Book