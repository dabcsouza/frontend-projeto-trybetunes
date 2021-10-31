import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';
import Logo from '../ImagePages/Logo.png';

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
        <FontAwesomeIcon icon={ faUserCircle } size="2x" />
        {name}
      </span>
    );
  }

  render() {
    const { showLoading, userName: { name } } = this.state;
    return (
      <header
        data-testid="header-component"
        className="card-header header"
      >
        <section
          data-testid="header-user-name"
          className="user-header"
        >
          <img src={ Logo } alt="Logo Tybetunes" />
          {
            showLoading ? <Loading /> : this.renderName(name)
          }
        </section>
        <section className="links">
          <Link
            id={ window.location
              .pathname.includes('search') ? 'active' : '' }
            to="/search"
            data-testid="link-to-search"
          >
            Pesquisar
          </Link>
          <Link
            id={ window.location
              .pathname.includes('favorites') ? 'active' : '' }
            to="/favorites"
            data-testid="link-to-favorites"
          >
            Favoritos
          </Link>
          <Link
            id={ window.location
              .pathname.includes('profile') ? 'active' : '' }
            to="/profile"
            data-testid="link-to-profile"
          >
            Perfil
          </Link>
        </section>
      </header>
    );
  }
}
