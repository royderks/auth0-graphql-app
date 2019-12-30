import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './App';
import { Auth0Provider } from './react-auth0-spa';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

const onRedirectCallback = () => {
  history.push(window.location.pathname);
};

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
        audience={process.env.REACT_APP_AUTH0_API_IDENTIFIER}
      >
        <App />
      </Auth0Provider>
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
