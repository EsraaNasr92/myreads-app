import React from 'react'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class Search extends React.Component{

  state = {
       query: '',
       bookResults: []
     }

     searchUpdate = (query) => {
       this.setState({
         query: query.trim()
       })
       this.bookSearch(query);
     }

     searchClear = () => {
       this.setState({
         query: ''
       })
     }

     //search through data
     bookSearch(query) {
       BooksAPI.search(query).then(bookResults => {
         bookResults ?
         this.setState({bookResults}) : this.setState({bookResults:[]})
         console.log("Here's a book result", bookResults);
     }).catch(
         // Log the rejection reason
         (reason) => {
           console.log('Handle rejected promise ('+reason+') here.');
         });

     }
     //display the books
     resultsMap() {
       if (this.state.query) {
         //so we can ignore any special characters and pass them as object literals
         const result = new RegExp(escapeRegExp(this.state.query), 'i')
         this.state.bookResults = this.props.books.filter((book) => result.test(book.title))
       } else {
         this.state.bookResults = this.props.books
       }
     };

     print = (book)=>
     console.log(book);

  render(){

    const bookResults = this.state.bookResults;


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">

            <input
                type='text'
                value={this.state.query}
                onChange={(event)=>this.searchUpdate(event.target.value)}
                placeholder="look up books by title or author"
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

          {bookResults && bookResults.length > 0 && bookResults.map((book)=>(
              <Book key={book.id} book={book}  changeShelf={this.props.changeShelf} />
          ))}

          </ol>
        </div>
      </div>
    )
  }
}

export default Search
