import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// ----------------------------------------------------------------------

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// ----------------------------------------------------------------------
export default function App() {
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </ApolloProvider>
  );
}
