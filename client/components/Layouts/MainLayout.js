import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import DevTools from "mobx-react-devtools";
import { graphql, compose } from 'react-apollo';

import query from '../../queries/CurrentUser';
// import mutation from '../../mutations/Logout';

import { Layout, Row } from 'antd';
const { Sider, Content } = Layout;

import RightMenu from './RightMenu';
import LeftMenu from './LeftMenu';
import HeaderComponent from './HeaderComponent';

class MainLayout extends Component {

  constructor(props) {
    super(props);
    this.user = null;
    this.loading = true;
  }

  renderChat = () => {
    if (this.props.data.user) {
      return (
        <Layout>
          <Sider
            className="sider"
            style={{ background: '#fff' }}
            breakpoint="sm"
            collapsedWidth="35"
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <LeftMenu />
          </Sider>
          <Content style={{ margin: '12px  12px' }}>
            {this.props.children}
          </Content>
          <Sider
            className="sider"
            style={{ background: '#fff' }}
            breakpoint="sm"
            collapsedWidth="35"
            onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          >
            <RightMenu />
          </Sider>
        </Layout>
      )
    } else {
      return (
        <Layout>
          <Content>
            <h1 style={{ textAlign: 'center' }}> Необходима авторизация </h1>
          </Content>
        </Layout>
      )
    }
  }


  render() {    
    if (!this.props.data.loading) {
      return (
        <Layout style={{ minHeight: '100vh' }}>
          <Row type="flex" justify="end" align="middle" style={{ marginBottom: '24px', height: '64px', background: 'black' }}>
            <HeaderComponent />
          </Row>
          {this.renderChat()}
        </Layout>
      );
    }
    return <div></div>
  }
}

const userQuery = graphql(query);


export default compose(userQuery)(MainLayout);
