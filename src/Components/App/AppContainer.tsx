import React from 'react';
import { ToastContainer } from 'react-toastify';
import { graphql } from 'react-apollo';
import { IS_LOGGED_IN } from './AppQueries';
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../../typed-components';
import theme from '../../theme';
import Globalstyle from '../../global-styles';
import 'react-toastify/dist/ReactToastify.min.css';

// eslint-disable-next-line react/prop-types
const AppContainer: any = ({ data }) => (
  <>
    <ThemeProvider theme={theme}>
      <Globalstyle />
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable position="bottom-center" />
  </>
);

export default graphql(IS_LOGGED_IN)(AppContainer);
