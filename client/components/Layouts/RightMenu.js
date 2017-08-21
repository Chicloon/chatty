import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

import { Menu, Icon, Button } from 'antd';
const { Item } = Menu;

import query from '../../queries/Chats';

class RightMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {      
    if(!this.props.data.loading) {
      return (      
        <div>
          Chat members:
        </div>
      );
    }
    return <div />
  }
}

const menuQuery = graphql(query);

export default compose(menuQuery)(RightMenu);


// export default MainMenu;
