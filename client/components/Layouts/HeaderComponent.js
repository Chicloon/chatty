import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Menu, Icon } from 'antd';
const { Item } = Menu;

import query from '../../queries/CurrentUser';
import mutation from '../../mutations/Logout';

class HeaderComponent extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) { return <div />; }

    if (user) {
      return (
        <Item>
          <a onClick={this.onLogoutClick.bind(this)}>Logout </a>
        </Item>
      );
    }
    return (
      <div>
        <Link to='/singup'>Sinup</Link>
        <Link to='/singup'>Sinup</Link>
        <Item>
          <Link to='/singup'>Sinup</Link>
        </Item>
        <Item>
          <Link to='/login'>Login</Link>
        </Item>
      </div>
    );

  }

  render() {
    console.log(this.props);
    return (

      <div>

        <Link className="brand-logo left" to='/'>
          Home
          </Link>
<Link to='/singup'>Sinup</Link>
        <Link to='/singup'>Sinup</Link>
        <Menu
          theme="dark"
          mode="horizontal"
        >
          {this.renderButtons()}

        </Menu>
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(HeaderComponent)
);
