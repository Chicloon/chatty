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
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
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
	reconnect: true
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(networkInterface, wsClient);

networkInterface.use([{
	async applyMiddleware(req, next) {
		if (!req.options.headers) {
			req.options.headers = {};
		}
		try {
			const token = await localStorage.getItem('chatty');
			if (token != null) {
				req.options.headers.authorization = `Bearer ${token}` || null;
			}
		} catch (error) {
			throw error;
		}

		return next();
	}
}])

const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	networkInterface: networkInterfaceWithSubscriptions,
});


class App extends Component {
	render() {
		// console.log(this.props);		
		return (
			<ApolloProvider client={client}>
				<Router>
					{/* <Provider {...stores}> */}
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
					{/* </Provider> */}
				</Router>
			</ ApolloProvider>
		);
	}
}

export default App;
