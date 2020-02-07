/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import SocialLoginPresenter from './SocialLoginPresenter';
import { facebookConnect, facebookConnectVariables } from '../../types/api';
import { FACEBOOK_CONNECT } from './SocialLoginQueries';
import { LOG_USER_IN } from '../../sharedQueries';

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

class SocialLoginContainer extends React.Component<any, IState> {
  public facebookMutation: any;

  public stateData = {
    email: '',
    fbId: '',
    firstName: '',
    lastName: ''
  };

  public loginCallback = (fbData) => {
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      id: fbId,
      accessToken
    } = fbData;

    this.stateData = {
      email,
      fbId,
      firstName,
      lastName
    };

    try {
      if (accessToken) {
        this.facebookMutation({
          variables: {
            firstName,
            lastName,
            email,
            fbId
          }
        });
        toast.success(`환영합니다! ${lastName}${firstName}님`);
      } else {
        toast.error('페이스북 로그인에러(액세스 토큰 거부)');
      }
    } catch (error) {
      console.log(error.message);
      toast.error('페이스북 로그인에러');
    }
  };

  public onCompleteFn = (data: facebookConnect, logUserInMutation) => {
    const { FacebookConnect } = data;
    if (FacebookConnect.ok && FacebookConnect.token) {
      logUserInMutation({
        variables: {
          token: FacebookConnect.token
        }
      });
    } else {
      toast.error(FacebookConnect.error);
    }
  };

  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserInMutation) => (
          <Mutation<facebookConnect, facebookConnectVariables>
            mutation={FACEBOOK_CONNECT}
            onCompleted={(data) => {
              this.onCompleteFn(data, logUserInMutation);
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return (
                <SocialLoginPresenter loginCallback={this.loginCallback} />
              );
            }}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default SocialLoginContainer;
