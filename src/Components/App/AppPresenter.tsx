/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-expressions */
import React from 'react';
import propTypes from 'prop-types';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../../Route/Login/index';
import PhoneLogin from '../../Route/PhoneLogin/index';
import VerifyPhone from '../../Route/VerifyPhone/index';
import SocialLogin from '../../Route/SocialLogin/index';
import Ride from '../../Route/Ride/index';
import EditAccount from '../../Route/EditAccount/index';
import Settings from '../../Route/Settings/index';
import Places from '../../Route/Places/index';
import AddPlace from '../../Route/AddPlace/index';
import FindAddress from '../../Route/FindAddress/index';

interface Iprops {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<Iprops> = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
  );
};

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/phone-login" exact component={PhoneLogin} />
    <Route path="/verify-phone/:number" exact component={VerifyPhone} />
    <Route path="/social-login" exact component={SocialLogin} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/ride" exact component={Ride} />
    <Route path="/edit-account" exact component={EditAccount} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/places" exact component={Places} />
    <Route path="/add-place" exact component={AddPlace} />
    <Route path="/find-address" exact component={FindAddress} />
    <Redirect from="*" to="/" />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: propTypes.bool.isRequired
};

export default AppPresenter;
