import React, { Component } from 'react';
import { FileEarmarkPerson, ArrowRightCircle } from 'react-bootstrap-icons';
import createUser from '../services/userAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonDisable: true,
    };
    this.handleForm = this.handleForm.bind(this);
  }

  handleForm({ target }) {
    const minLength = 3;
    if (target.value.length >= minLength) {
      this.setState({ buttonDisable: false });
    } else { this.setState({ buttonDisable: true }); }
  }

  render() {
    const { buttonDisable } = this.state;
    return (
      <div data-testid="page-login">
        <form className="login-form">
          <label className="form-group" htmlFor="login-name-input">
            <div className="background-icon">
              <FileEarmarkPerson
                size={ 30 }
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
            >
              <ArrowRightCircle />
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
