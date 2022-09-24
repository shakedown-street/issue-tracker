import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, ApolloProvider, concat } from '@apollo/client';
import { App } from './src/App';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql/' });

const authMiddleware = new ApolloLink((operation, forward) => {
  if (localStorage.getItem('token')) {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    }));
  }
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

const container = document.getElementById('root') as Element;
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
