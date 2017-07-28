import React, { Component } from "react";
import { Link } from 'react-router-dom'

import { Menu, Icon } from 'antd';
const { Item } = Menu;

export default class MainMenu extends Component {	
	render() {
		return (			
				<Menu 
          theme="light"
          module="inline"
        >
          <Item key="1">
            <Icon type="user" />
            <span> Link 1 </span>
            <Link to='/groups/1' />
          </Item>
          <Item key="2">
            <Icon type="video-camera" />
              <span> Link 2 </span>
            <Link to='/groups/2' /> 
          </Item>
        </Menu>			
		);
	}
}
