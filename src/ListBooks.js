import React, { Component } from 'react'
import Book from './Book'

class ListBooks extends Component {
    state = {
        query: ''
    }

    render() {

        const { books } = this.props

        return(
            <Book books={books} />
        )
    }
}

export default ListBooks