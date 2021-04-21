import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'


class Search extends React.Component{
  static propTypes = {
      books: PropTypes.array.isRequired,
      changeShelf: PropTypes.func.isRequired
    };

    state = {
      query: '',
      newBooks: [],
      books: [],
      searchErr: false
    };

    getBooks = event => {
      const query = event.target.value;
      this.setState({ query });


    if (query) {
        BooksAPI.search(query.trim(), 20).then(books => {

        if (books) {
          if(!books.error){
            console.log(books)
            books = books.map((book) => {
                const bookInShelf = this.props.books.find(b => b.id === book.id);
                if (bookInShelf) {
                    book.shelf = bookInShelf.shelf;
                }
                return book;
            });
            this.setState({ searchQuery : 'results', showingBooks : books })
          }
          else {
            this.setState({ searchQuery : 'error', showingBooks : books.error })
          }

        }
          books.length > 0
            ? this.setState({ newBooks: books, searchErr: false })
            : this.setState({ newBooks: [], searchErr: true })
        })

      } else this.setState({ newBooks: [], searchErr: false })

/*
if(query) {

     BooksAPI.search(query, 20).then((books) => {
       if (books) {
         if(!books.error){
           console.log(books)
           books = books.map((book) => {
               const bookInShelf = this.props.books.find(b => b.id === book.id);
               if (bookInShelf) {
                   book.shelf = bookInShelf.shelf;
               }
               return book;
           });
           this.setState({ searchQuery : 'results', showingBooks : books })
         }
         else {
           this.setState({ searchQuery : 'error', showingBooks : books.error })
         }

       }
     })
   }
   else{
     this.setState({ searchQuery : 'noresults', showingBooks: [] })

   }

*/

    }

    render() {
      const { query, newBooks, searchErr } = this.state
      const { books, changeShelf } = this.props

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/">
              Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={this.getBooks}
              />
            </div>
          </div>
          <div className="search-books-results">
            {newBooks.length > 0 && (
              <div>
                <h3>Search returned {newBooks.length} books </h3>
                <ol className="books-grid">
                  {newBooks.map(book => (
                    <Book
                      book={book}
                      books={books}
                      key={book.id}
                      changeShelf={changeShelf}
                    />
                  ))}
                </ol>
              </div>
            )}
            {searchErr && (
              <h3>Please try again!</h3>
            )}
          </div>
        </div>
      );
    }
  }
export default Search
