import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";

import DevTools from "mobx-react-devtools";
import { graphql, compose } from 'react-apollo';

import query from '../../queries/CurrentUser';
import mutation from '../../mutations/Logout';

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import MainMenu from './MainMenu';
import HeaderComponent from './HeaderComponent';
import Login from './Login';

class App extends Component {

  constructor(props) {
    super(props);
    this.user = null;
    this.loading = true;
  }

  componenWillMount() {
    if (this.props.data.user) {
      Redirect
    }
  }

  componentWillUpdate(nextProps) {
    // this.pops - the old, current set of props
    // nextProps - the next set of props that will be 
    // in place when component rerenders

    if (!this.props.data.user && nextProps.data.user) {
      this.authenticated = true;
    }
  }

  // componentWillMount() {
  //   if (this.props.data) {
  //     const { loading, user } = this.props.data;
  //     this.user = user;
  //     this.loading = loading;
  //   }
  // }



  render() {
    console.log(this.props);
    if (!this.props.data.loading) {
      if (!this.authenticated) {
        return (<Login />);
      }

      return (
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
    return <div></div>
  }
}

const userQuery = graphql(query);


export default compose(userQuery)(App);
