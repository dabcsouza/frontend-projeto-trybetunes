import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

export default class ProfileEdit extends Component {
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
  }

  render() {
    const { loading, profile } = this.state;
    console.log(profile);
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
                    name="edit-input-name"
                    id="edit-input-name"
                    className="form-control"
                    data-testid="edit-input-name"
                    onChange={ () => console.log('oi') }
                  />
                </label>
              </form>
            </section>
          )
        }
      </div>
    );
  }
}
