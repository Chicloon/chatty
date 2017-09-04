import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

import { Menu, Icon, Button, Popover } from 'antd';
const { Item } = Menu;

import CreateChatForm from './CreateChatForm';

import { Chats } from '../../queries/chatQueries';
import { CreateChat } from '../../mutations/chatMutations';

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] }
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

  createChat = ({ chatName }) => {
    this.props.createChat({
      variables: { chatName },
      refetchQueries: [{ query: Chats }]
    })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
    this.setState({ errors: [] });
  }


  render() {
    console.log('--left menu', this.props);
    if (!this.props.data.loading) {
      return (
        <div
          style={{
            height: '88vh',
          }}>
          <Popover
            placement="rightTop"
            title={<h3 style={{ textAlign: 'center' }}>Create new chat</h3>}
            trigger="hover"
            content={<CreateChatForm
              onSubmit={this.createChat}
              errors={this.state.errors} />}
          >
            <Button style={{ width: '100%', marginBottom: '12px' }}> Create new Chat</Button>
          </Popover>

          <h3 style={{ textAlign: 'center' }}> Список чатов </h3>
          <Menu
            theme="light"
            module="inline"
            style={{
              height: '96%',
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            {this.renderMenuItems()}
          </Menu>
        </div>
      );
    }
    return <div />
  }
}

const menuQuery = graphql(Chats);



export default compose(
  graphql(Chats),
  graphql(CreateChat, { name: 'createChat' })
)(LeftMenu);


// export default MainMenu;
