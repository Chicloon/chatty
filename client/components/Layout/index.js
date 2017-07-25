import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

// import c from '../';

import MainLayout from './MainLayout';

export default class App extends Component {	
	render() {
		return (
			<div>
				<Layout>
					<div>
						<Header>Header</Header>
						<Layout>
							<Sider>Sider</Sider>
							<Content>
								<MainLayout />
							</Content>
						</Layout>
					</div>					
				</Layout>
			</div>
		);
	}
}
