import React from 'react'
import Shelf from './Shelf'

import { Link } from 'react-router-dom'

class Shelves extends React.Component{
  render(){

    const allBooks = this.props.allBooks
    //console.log(allBooks)
    const current = allBooks.filter(book => book.shelf === "currentlyReading")
    const want = allBooks.filter(book => book.shelf === "wantToRead")
    const read = allBooks.filter(book => book.shelf === "read")


    return(
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>

      <div className="list-books-content">
        <div>
          <Shelf books={current} title={"Currently Reading"} changeShelf={this.props.changeShelf} />
          <Shelf books={want} title={"Want to Read"}  changeShelf={this.props.changeShelf} />
          <Shelf books={read} title={"Read"} changeShelf={this.props.changeShelf} />
        </div>
      </div>

      <div className="open-search">
        <Link to='/search' >
            <button>Add a book</button>
        </Link>
        </div>

    </div>
    )
  }
}

export default Shelves
