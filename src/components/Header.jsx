import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PersonBoundingBox } from 'react-bootstrap-icons';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      userName: {},
    };
    this.requestUserName = this.requestUserName.bind(this);
  }

  componentDidMount() {
    this.requestUserName();
  }

  requestUserName() {
    this.setState(async () => {
      const userName = await getUser();
      this.setState({
        showLoading: false,
        userName,
      });
    });
  }

  renderName(name) {
    return (
      <span className="user-box">
        <PersonBoundingBox size={ 30 } />
        {name}
      </span>
    );
  }

  render() {
    const { showLoading, userName: { name } } = this.state;
    return (
      <header
        data-testid="header-component"
        className="card-header headercell"
      >
        <section
          data-testid="header-user-name"
          className="user-header"
        >
          {
            showLoading ? <Loading /> : this.renderName(name)
          }
        </section>
        <section className="links">
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </section>
      </header>
    );
  }
}
