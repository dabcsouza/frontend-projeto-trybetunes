import React, { Component } from 'react';
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

  render() {
    const { showLoading, userName: { name } } = this.state;
    return (
      <header
        data-testid="header-component"
        className="card-header headercell"
      >
        <span
          data-testid="header-user-name"
          className="user-header"
        >
          {
            showLoading ? <Loading /> : <p>{ name }</p>
          }
        </span>
      </header>
    );
  }
}
