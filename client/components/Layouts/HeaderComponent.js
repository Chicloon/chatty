import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Menu, Icon, Row, Col, Button, Popover } from 'antd';
const { Item } = Menu;

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import query from '../../queries/CurrentUser';
// import {Logout} from '../../mutations/userMutations';
import {Login} from '../../mutations/userMutations';
import {Signup} from '../../mutations/userMutations';


class HeaderComponent extends Component {

  constructor(props) {
    super(props);

    this.state={errors: []}
  }  

  onLogoutClick = ()=> {
    // this.props.logoutMutation({
    //   refetchQueries: [{ query }],
    // });
    localStorage.removeItem('chatty');
    this.setState({errors: []});
  }

  handleLogin =({username, password})=> {
    this.props.loginMutation({
      variables: { username, password },
      refetchQueries: [{ query }]
    })
      .catch(res=> {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState ({errors });
      });
      this.setState({errors: []});
  }

  handleSignup = ({username, password, isAdmin}) => {
    this.props.signupMutation({
      variables: { username, password, isAdmin},
      refetchQueries: [{ query }]
    })
    .catch(res=> {
      const errors = res.graphQLErrors.map(error => error.message);
      this.setState ({errors });
    });
    this.setState({errors: []});
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) { return <div />; }

    if (user) {
      return (
        <Button onClick={this.onLogoutClick}>Logout </Button>
      );
    }
    return (
      <div>
        <Popover 
          placement="bottomLeft" 
          title={<h3 style={{textAlign: 'center'}}>Login</h3>} 
          trigger="click" 
          content={<LoginForm 
            onSubmit={this.handleLogin} 
            errors = {this.state.errors} />} 
          >
          <Button>Login</Button>
        </Popover>

        <Popover 
          placement="bottomRight" 
          title={<h3 style={{textAlign: 'center'}}>Signup</h3>} 
          trigger="click"
          content={<SignupForm 
            onSubmit={this.handleSignup}  
            errors = {this.state.errors}/>} 
          >
          <Button>Signup</Button>
        </Popover>
      </div>
    );

  }

  render() {    
    return (
      <div style={{ padding: '24px' }}>
        {this.renderButtons()}
      </div>
    );
  }
}

export default compose(
  graphql(query),
  // graphql(Logout, {name: 'logoutMutation'}),
  graphql(Login, {name: 'loginMutation'}),
  graphql(Signup, {name: 'signupMutation'})
)(HeaderComponent);