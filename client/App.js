import React, { Component } from 'react';
import { observable } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './components/Layout';

import stores from './stores';

// Antd for ui components
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import ruRU from 'antd/lib/locale-provider/ru_RU';
// Apollo for gql
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin',
	},
});

const client = new ApolloClient({
	dataIdFromObject: o => o.id,
	networkInterface,
});


class App extends Component {	
	render() {
		// console.log(this.props);		
		return (
			<LocaleProvider locale={ruRU}>
				<ApolloProvider client={client}>
					<Provider {...stores}>
						<Router>							
									<Layout />
						</Router>
					</Provider>
				</ ApolloProvider>
			</LocaleProvider>
		);
	}

}

export default App;
