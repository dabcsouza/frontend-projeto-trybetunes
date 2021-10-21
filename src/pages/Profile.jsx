import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      loading: false,
    };
    this.getProfile = this.getProfile.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    this.setState({ loading: true });
    const profile = await getUser();
    this.setState({
      loading: false,
      profile,
    });
    console.log(profile);
  }

  render() {
    const { loading, profile: { name, email, image, description } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <section
              className="my-profile"
            >
              <p className="profile-name">{name}</p>
              <p className="profile-email">{email}</p>
              <img
                data-testid="profile-image"
                src={ image }
                alt={ `Foto do perfil do usuário ${name}` }
              />
              <p className="profile-description">{description}</p>
              <Link to="/profile/edit">
                <div className="button-profile btn-success">
                  Editar perfil
                </div>
              </Link>
            </section>
          )
        }
      </div>
    );
  }
}
