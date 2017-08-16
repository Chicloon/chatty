import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

import { Menu, Icon, Button } from 'antd';
const { Item } = Menu;

// import query from '../src/graphql/query/groups';

class MainMenu extends Component {
  constructor(props) {
    super(props);
  }
  render() {  
    // const groups = this.props.data.groups;

    // if (this.props.data.loading) {
    //   return <div> ....loading </div>
    // }

    return (      
      <div>
        <Button style={{width: '100%', marginBottom:'12px'}}> Создать чат </Button>
         <h3 style={{textAlign: 'center'}}> Список чатов </h3>
      <Menu
        theme="light"
        module="inline"
      >      
       
        <Item key="1">
          This is a menuItem
            <Link to='/chat/' />
          </Item>
      </Menu>
      </div>
    );
  }
}

// const menuQuery = graphql(query);

// export default compose(menuQuery)(MainMenu);


export default MainMenu;
