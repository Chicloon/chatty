import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo';

import { Menu, Icon } from 'antd';
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
      <Menu
        theme="light"
        module="inline"
      >      
        {/* {groups.map(el =>
          <Item key={el.id}>
            <Icon type="plus-square-o" />
            <span> {el.name} </span>
            <Link to={`/chat/${el.id}`} />
          </Item>
        )} */}

        <Item key="1">
          This is a menuItem
            <Link to='/chat/' />
          </Item>
      </Menu>
    );
  }
}

// const menuQuery = graphql(query);

// export default compose(menuQuery)(MainMenu);


export default MainMenu;
