import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      inputName: '',
      inputEmail: '',
      imgSrc: '',
      inputDescription: '',
    };
    this.getProfile = this.getProfile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  async getProfile() {
    this.setState({ loading: true });
    const profile = await getUser();
    const { name, email, image, description } = profile;
    this.setState({
      loading: false,
      inputName: name,
      inputEmail: email,
      imgSrc: image,
      inputDescription: description,
    });
  }

  render() {
    const { loading, inputName, inputEmail, imgSrc, inputDescription } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {
          loading ? <Loading /> : (
            <section
              className="profile-edit"
            >
              <form className="form-edit-profile">
                <label className="form-group mt-lg-4" htmlFor="edit-input-name">
                  Nome:
                  <input
                    type="text"
                    name="inputName"
                    id="edit-input-name"
                    className="form-control"
                    data-testid="edit-input-name"
                    value={ inputName }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <label className="form-group mt-lg-4" htmlFor="edit-input-email">
                  Email:
                  <input
                    type="email"
                    name="inputEmail"
                    id="edit-input-email"
                    className="form-control"
                    data-testid="edit-input-email"
                    value={ inputEmail }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <label className="form-group mt-lg-4" htmlFor="edit-input-image">
                  Imagem:
                  <input
                    type="text"
                    name="imgSrc"
                    id="edit-input-image"
                    className="form-control"
                    data-testid="edit-input-image"
                    value={ imgSrc }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
                <label className="form-group mt-lg-4" htmlFor="edit-input-description">
                  Imagem:
                  <textarea
                    type="text"
                    rows="5"
                    cols="23"
                    name="inputDescription"
                    id="edit-input-description"
                    className="form-control"
                    data-testid="edit-input-description"
                    value={ inputDescription }
                    onChange={ this.handleChange }
                    required
                  />
                  <button
                    data-testid="edit-button-save"
                    type="submit"
                    className="btn btn-success"
                  >
                    Salvar
                  </button>
                </label>
              </form>
            </section>
          )
        }
      </div>
    );
  }
}
