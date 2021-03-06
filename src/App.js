import React from 'react'
import Shelves from './components/Shelves'
import Search from './components/Search'
import * as BooksAPI from './BooksAPI'
import{ Route} from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: ''
  }

  // Update Search page and use this state for Search and SearchButton
  updateSearchPage = state => {
    this.setState({ showSearchPage: state })
  }


  // Using lifecycle to fetch gbs_api
  componentDidMount(){
    BooksAPI.getAll().then(resp =>
      this.setState({ books: resp })
    )

  }

  // Change shelf
  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then( resp => {book.shelf = shelf})

    const updateBooks = this.state.books.map(b => {
      if( b.id === book.id ){
        b.shelf = shelf
      }
      return b
    })
    this.setState({
      books: updateBooks
    })

  }


  //Chaneg shelf from search
   changeShelf = (changedBook, shelf) => {
     BooksAPI.update(changedBook, shelf).then(response => {
       changedBook.shelf = shelf
       this.setState(prevState => ({
         books: prevState.books
           .filter(book => book.id !== changedBook.id)
           .concat(changedBook)
       }))
     })
   }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Shelves allBooks={this.state.books} changeShelf={this.changeBookShelf}/>

        )} />
        <Route exact path='/search' render={() => (
          <Search  books={this.state.books} showSearchPage={this.updateSearchPage} changeShelf={this.changeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
