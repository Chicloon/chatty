import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { Menu, Icon, Row, Col } from 'antd';
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

        <a onClick={this.onLogoutClick.bind(this)}>Logout </a>

      );
    }
    return (
      <div>
        <Link to='/singup'>Sinup</Link>
        <Link to='/singup'>Sinup</Link>

      </div>
    );

  }

  render() {
    console.log(this.props);
    return (
      <Row type="flex" justify="space-between">
      
        <Col span={22} style={{background: 'blue'}}>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: 'inherit' }}
          >
            <Item>
              <Link className="brand-logo left" to='/'>
                Home
          </Link>
            </Item>
          </Menu>
        </Col>
        <Col span={2} style={{background: 'red'}}>
          {this.renderButtons()}
        </Col>
      </Row>
    );
  }
}

export default graphql(mutation)(
  graphql(query)(HeaderComponent)
);
