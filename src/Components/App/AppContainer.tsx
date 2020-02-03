/* eslint-disable react/prop-types */
import React from 'react';
import { graphql } from 'react-apollo';
import { IS_LOGGED_IN } from './AppQueries';
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../../typed-components';
import theme from '../../theme';
import Globalstyle from '../../global-styles';

// eslint-disable-next-line react/prop-types
const AppContainer: any = ({ data }) => (
  <ThemeProvider theme={theme}>
    <Globalstyle />
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
  </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
