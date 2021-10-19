import React, { Component } from 'react';
import { Google } from 'react-bootstrap-icons';
import Header from '../components/Header';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDisable: true,
    };
    this.onSearchButtonChange = this.onSearchButtonChange.bind(this);
  }

  onSearchButtonChange({ target: { value } }) {
    const minLenSearch = 2;
    if (value.length >= minLenSearch) {
      this.setState({
        searchDisable: false,
      });
    } else {
      this.setState({
        searchDisable: true,
      });
    }
  }

  render() {
    const { searchDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="input-group w100 search-container">
          <button
            disabled={ searchDisable }
            type="button"
            className="btn btn-outline-secondary"
            data-testid="search-artist-button"
          >
            <Google />
          </button>
          <label
            htmlFor="search-artist"
            className=""
          >
            <input
              data-testid="search-artist-input"
              className="form-control"
              type="text"
              name="search-artist"
              id="search-artist"
              onChange={ this.onSearchButtonChange }
            />
          </label>
        </div>
      </div>
    );
  }
}
