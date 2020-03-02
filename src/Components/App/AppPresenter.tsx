/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-expressions */
import React from 'react';
import propTypes from 'prop-types';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
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
import SignUpPage from '../../Route/SignUpPage/index';
import EmailSignUp from '../../Route/EmailSignUp/index';
import VerifyEmail from '../../Route/VerifyEmail/index';
import Home from '../../Route/Home/index';
import AccountSettings from '../../Route/Settings/index';
import Chat from '../../Route/Chat/index';

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </HashRouter>
  );
};

const LoggedOutRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/phone-login" exact component={PhoneLogin} />
    <Route path="/verify-phone" exact component={VerifyPhone} />
    <Route path="/social-login" exact component={SocialLogin} />
    <Route path="/signUp" exact component={SignUpPage} />
    <Route path="/email-signup" exact component={EmailSignUp} />
    <Redirect from="*" to="/" />
  </Switch>
);

const LoggedInRoutes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/ride/:rideId" exact component={Ride} />
    <Route path="/edit-account" exact component={EditAccount} />
    <Route path="/settings" exact component={Settings} />
    <Route path="/places" exact component={Places} />
    <Route path="/add-place" exact component={AddPlace} />
    <Route path="/find-address" exact component={FindAddress} />
    <Route path="/verify-email/:id" exact component={VerifyEmail} />
    <Route path="/account-settings" exact component={AccountSettings} />
    <Route path="/chat/:chatId" exact component={Chat} />
    <Redirect from="*" to="/" />
  </Switch>
);

AppPresenter.propTypes = {
  isLoggedIn: propTypes.bool.isRequired
};

export default AppPresenter;
