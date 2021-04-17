import React from 'react'

import Shelves from './components/Shelves'
import Search from './components/Search'
import SearchButton from './components/SearchButton'

import * as BooksAPI from './BooksAPI'

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
    books: []
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
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search showSearchPage={this.updateSearchPage}/>
        ) : (
          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Shelves allBooks={this.state.books}/>
            <SearchButton showSearchPage={this.updateSearchPage}/>

          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
