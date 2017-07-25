import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import { rehydrate, hotRehydrate } from "rfx-core";


//Apollo stuff
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

// Antd for ui components
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import ruRU from 'antd/lib/locale-provider/ru_RU';

import { isProduction } from "./utils/constants";
import App from "./components/Layout";
import stores from "./stores/stores";

const store = rehydrate();

const networkInterface = createNetworkInterface({
	uri: '/graphql',
	opts: {
		credentials: 'same-origin',
	},
});

const client = new ApolloClient({
	// dataIdFromObject: o => o.id,
	networkInterface,
});

const renderApp = Component => {
	render(
		<AppContainer>
			<LocaleProvider locale={ruRU}>
				<ApolloProvider client={client}>
					<Router>
						<Provider store={isProduction ? store : hotRehydrate()}>
							<App />
						</Provider>
					</Router>
				</ApolloProvider>
			</LocaleProvider>
		</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
