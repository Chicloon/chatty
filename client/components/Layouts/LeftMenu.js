import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

import { Menu, Icon, Button } from 'antd';
const { Item } = Menu;

import query from '../../queries/Chats';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }

  renderMenuItems() {
    return this.props.data.chats.map(chat =>
      <Item key={chat.id}>
        <Link to={`/chat/${chat.id}/`}>
          {chat.name}
        </Link>
      </Item>
    )
  }


  render() {    
    if (!this.props.data.loading) {
      return (
        <div>
          <Button style={{ width: '100%', marginBottom: '12px' }}> Создать чат </Button>
          <h3 style={{ textAlign: 'center' }}> Список чатов </h3>
          <Menu
            theme="light"
            module="inline"
          >
            {this.renderMenuItems()}
          </Menu>
        </div>
      );
    }
    return <div />
  }
}

const menuQuery = graphql(query);

export default compose(menuQuery)(LeftMenu);


// export default MainMenu;
