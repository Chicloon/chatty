import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import query from '../../queries/CurrentUser';
import mutation from '../../mutations/Logout';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MainMenu from './MainMenu';
import HeaderComponent from './HeaderComponent';
import Login from './Login';

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.user = null;
    this.loading = true;
  }


  componentWillMount() {
    if (this.props.data) {
     const { loading, user } = this.props.data;
     this.user = user;
     this.loading = loading;
    }
  }



  render() {
    if(!this.user) {
      console.log(this.props);
      return (<Login />);
    }

    if(this.user) return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ marginBottom: '12px' }} >
           <HeaderComponent />          
        </Header>
        <Layout>
          <Sider
            className="sider"
            style={{ background: '#fff' }}
            breakpoint="sm"
            collapsedWidth="35"
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <MainMenu />
          </Sider>
          <Content style={{ margin: '12px  12px' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
