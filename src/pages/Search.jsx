import React, { Component } from 'react';
import { Google } from 'react-bootstrap-icons';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchDisable: true,
      inputValue: '',
      searchResult: '',
      isLoading: false,
      searchDone: false,
      albuns: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSearchButtonChange = this.onSearchButtonChange.bind(this);
    this.renderSearchField = this.renderSearchField.bind(this);
  }

  onInputChange({ target: { value } }) {
    const minLenSearch = 2;
    const searchResult = value.substring(0);
    this.setState({
      inputValue: value,
      searchResult,
    });
    if (value.length >= minLenSearch) {
      this.setState({
        searchDisable: false,
        inputValue: value,
      });
    } else {
      this.setState({
        searchDisable: true,
      });
    }
  }

  onSearchButtonChange() {
    this.setState({
      isLoading: true,
    },
    async () => {
      const { inputValue } = this.state;
      const albuns = await searchAlbumsAPIs(inputValue);
      this.setState({
        albuns,
        isLoading: false,
        inputValue: '',
        searchDone: true,
      });
    });
  }

  renderSearchField() {
    const { inputValue, searchDisable } = this.state;
    return (
      <section className="input-section">
        <div className="input-group w100 search-container">
          <button
            disabled={ searchDisable }
            type="button"
            className="btn btn-outline-secondary"
            data-testid="search-artist-button"
            onClick={ this.onSearchButtonChange }
          >
            <Google />
          </button>
          <label
            htmlFor="search-artist"
          >
            <input
              data-testid="search-artist-input"
              className="form-control"
              type="text"
              name="search-artist"
              id="search-artist"
              onChange={ this.onInputChange }
              value={ inputValue }
            />
          </label>
        </div>
      </section>
    );
  }

  render() {
    const { isLoading, searchDone, searchResult, inputValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <Loading /> : this.renderSearchField()
        }
        {
          (searchDone && inputValue === '') && (
            <h3 className="title-results">
              {`Resultado de álbuns de:  ${searchResult.toUpperCase()}`}
            </h3>
          )
        }
      </div>
    );
  }
}
