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

    this.state = { errors: [] }
  }

  onLogoutClick = () => {
    localStorage.removeItem('chatty');    
    // this.setState({ errors: [] });
    this.props.data.refetch();
  }

  handleLogin = ({ username, password }) => {
    this.props.loginMutation({
      variables: { username, password },
      refetchQueries: [{ query }]
    })
      // .then(localStorage.setItem('chatty', data.signup.token);
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  handleSignup = async ({ username, password }) => {
    const signup = await this.props.signupMutation({
      variables: { username, password },
      // refetchQueries: [{ query }]
    })
      .then(res => {   
        localStorage.setItem('chatty', res.data.signup.token);
        console.log(res.data.signup.token);
      })
      .then(() => this.props.data.refetch())
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      })


  }

  renderButtons() {
    const { loading, user } = this.props.data;
    console.log(this.props);

    if (loading) { return <div />; }

    if (user) {
      return (
        <Button onClick={this.onLogoutClick}>Logout </Button>
      );
    }
    return (
      <div>
        <Popover placement="bottomLeft" content={<LoginForm onSubmit={this.handleLogin} errors={this.state.errors} />} title="Login" trigger="click" >
          <Button>Login</Button>
        </Popover>

        <Popover placement="bottomRight" content={<SignupForm onSubmit={this.handleSignup} errors={this.state.errors} />} title="Signup" trigger="click">
          <Button>Signup</Button>
        </Popover>
      </div>
    );

  }

  render() {
    console.log(this.props)
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
  graphql(logout, { name: 'logoutMutation' }),
  graphql(login, { name: 'loginMutation' }),
  graphql(signup, { name: 'signupMutation' })
)(HeaderComponent);



// export default graphql(logout)(
//   graphql(query)(HeaderComponent)
// );
