import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Menu, Icon, Row, Col, Button, Popover } from 'antd';
const { Item } = Menu;

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import query from '../../queries/CurrentUser';
import mutation from '../../mutations/Logout';


class HeaderComponent extends Component {

  onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query }],
    });
  }

  onLogin() {

  }

  onSingup() {

  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) { return <div />; }

    if (user) {
      return (
        <Button onClick={this.onLogoutClick.bind(this)}>Logout </Button>
      );
    }
    return (
      <div>
        <Popover placement="bottomLeft" content={<LoginForm />} title="Login" trigger="click" >
          <Button>Login</Button>
        </Popover>

        <Popover placement="bottomRight" content={<SignupForm />} title="Signup" trigger="click">
          <Button>Signup</Button>
        </Popover>
      </div>
    );

  }

  render() {
    console.log(this.props);
    return (
      <div style={{ padding: '24px' }}>
        {this.renderButtons()}
      </div>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(HeaderComponent)
);
