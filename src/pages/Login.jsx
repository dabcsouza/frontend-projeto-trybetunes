import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisable: true,
      loadingPage: false,
      searchPage: false,
      userName: '',
    };
    this.renderLogin = this.renderLogin.bind(this);
    this.handleForm = this.handleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleForm({ target: { value } }) {
    const minLength = 3;
    if (value.length >= minLength) {
      this.setState({
        buttonDisable: false,
        userName: value,
      });
    } else { this.setState({ buttonDisable: true }); }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ loadingPage: true }, async () => {
      const { userName } = this.state;
      await createUser({
        name: userName,
      });
      this.setState({
        searchPage: true,
      });
    });
  }

  renderLogin() {
    const { buttonDisable } = this.state;
    return (
      <div data-testid="page-login">
        <form className="login-form">
          <label className="form-group" htmlFor="login-name-input">
            <div className="background-icon">
              <FontAwesomeIcon
                icon={ faUser }
                className="input-person"
              />
            </div>
            <input
              type="text"
              name="login-name-input"
              id="login-name-input"
              className="form-control"
              data-testid="login-name-input"
              placeholder="Nome"
              onChange={ this.handleForm }
            />
          </label>
          <div className="button-container">
            <button
              disabled={ buttonDisable }
              type="submit"
              data-testid="login-submit-button"
              className="btn btn-success"
              onClick={ this.handleSubmit }
            >
              <FontAwesomeIcon icon={ faChevronRight } />
              Entrar
              <FontAwesomeIcon icon={ faChevronLeft } />
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const { loadingPage, searchPage } = this.state;
    return (
      <div>
        {
          loadingPage ? <Loading /> : this.renderLogin()
        }
        {
          searchPage && <Redirect to="/search" />
        }
      </div>
    );
  }
}
