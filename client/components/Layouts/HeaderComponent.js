import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Menu, Icon, Row, Col, Button, Popover } from 'antd';
const { Item } = Menu;

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import query from '../../queries/CurrentUser';
import logout from '../../mutations/Logout';
import login from '../../mutations/Login';
import signup from '../../mutations/Signup';


class HeaderComponent extends Component {

  constructor(props) {
    super(props);

    this.state={errors: []}
  }  

  onLogoutClick = ()=> {
    this.props.logoutMutation({
      refetchQueries: [{ query }],
    });
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
  }

  handleSignup = ({username, password}) => {
    this.props.signupMutation({
      variables: { username, password },
      refetchQueries: [{ query }]
    })
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
        <Popover placement="bottomLeft" content={<LoginForm onSubmit={this.handleLogin} errors = {this.state.errors} />} title="Login" trigger="click" >
          <Button>Login</Button>
        </Popover>

        <Popover placement="bottomRight" content={<SignupForm onSubmit={this.handleSignup}  />} title="Signup" trigger="click">
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

// const groupQuery = graphql(query, {
//     options: props => ({
//         variables: {
//             groupId: props.match.params.chat,
//         },
//     })
// });


export default compose(
  graphql(query),
  graphql(logout, {name: 'logoutMutation'}),
  graphql(login, {name: 'loginMutation'}),
  graphql(signup, {name: 'signupMutation'})
)(HeaderComponent);



// export default graphql(logout)(
//   graphql(query)(HeaderComponent)
// );
