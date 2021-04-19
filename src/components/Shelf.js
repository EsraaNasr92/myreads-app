import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
  render() {

    const shelfBooks = this.props.books

    console.log("shelfBooks", shelfBooks)

    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map(book => (
              <Book key={book.id} book={book}  changeShelf={this.props.changeShelf} />
            ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
