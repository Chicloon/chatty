import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';


import './styles/main.css';
// Antd for ui components
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Apollo for gql
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

//Stores
import stores from './stores';

//Components
import * as Client from './components';
import NotFound from './NotFound';
import Group from './components/Group/Group';

import MainLayout from './components/Layouts/MainLayout';


const networkInterface = createNetworkInterface({
	uri: '/graphql', // Ссылка на проксю из webpack.config.dev.js
	opts: {
		credentials: 'same-origin',
	},
});

const wsClient = new SubscriptionClient('ws://localhost:4000/subscriptions', { 
  reconnect: true,
  connectionParams: {}
})

const networkInterfaceWithSubs = addGraphQLSubscriptions(
	networkInterface,
	wsClient
);

const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	networkInterface: networkInterfaceWithSubs
});


class App extends Component {
	render() {
		// console.log(this.props);		
		return (
			<ApolloProvider client={client}>
				<Router>
					<Provider {...stores}>
						<LocaleProvider locale={ruRU}>
							<MainLayout >
								<Switch>
									<Redirect from='/' exact to='/chats' />
									<Route path="/chats" exact component={Client.Group} />
									<Route path="/chat/:chat" component={Client.Chat} />
									<Route path="*" component={NotFound} />
								</Switch>
							</MainLayout>
						</LocaleProvider>
					</Provider>
				</Router>
			</ ApolloProvider>
		);
	}
}

export default App;
