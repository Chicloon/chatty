import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MainMenu from './components/Layouts/MainMenu';
import HeaderComponent from './components/Layouts/HeaderComponent';

export default class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ background: '#fff', padding: 0 }} >
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
