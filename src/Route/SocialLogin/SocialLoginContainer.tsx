/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import SocialLoginPresenter from './SocialLoginPresenter';
import {
  facebookConnect,
  facebookConnectVariables,
  emailSignIn,
  emailSignInVariables
} from '../../types/api';
import { FACEBOOK_CONNECT, EMAIL_LOGIN } from './SocialLoginQueries';
import { LOG_USER_IN } from '../../sharedQueries';

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
  loginEmail?: any;
  password?: any;
}

class SocialLoginContainer extends React.Component<any, IState> {
  public facebookMutation: any;

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      fbId: '',
      firstName: '',
      lastName: '',
      loginEmail: '',
      password: ''
    };
  }

  public loginCallback = (fbData) => {
    const {
      email,
      first_name: firstName,
      last_name: lastName,
      id: fbId,
      accessToken
    } = fbData;

    this.setState({
      email,
      fbId,
      firstName,
      lastName
    });

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

  public onChange = (event) => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public emailLoginComplete = (data, login) => {
    const {
      EmailSignIn: { ok, error, token }
    } = data;

    if (error) {
      toast.error(error);
      return;
    }

    if (ok && token) {
      toast.success('로그인 성공!');

      setTimeout(() => {
        login({
          variables: {
            token
          }
        });
      }, 2000);
    }
  };

  public render() {
    const { loginEmail, password } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserInMutation) => (
          <Mutation<facebookConnect, facebookConnectVariables>
            mutation={FACEBOOK_CONNECT}
            onCompleted={(data) => {
              this.onCompleteFn(data, logUserInMutation);
            }}
          >
            {(facebookMutation, { loading }) => (
              <Mutation<emailSignIn, emailSignInVariables>
                mutation={EMAIL_LOGIN}
                variables={{
                  email: loginEmail,
                  password
                }}
                onCompleted={(data) => {
                  this.emailLoginComplete(data, logUserInMutation);
                }}
              >
                {(emailLoginMutation) => {
                  this.facebookMutation = facebookMutation;
                  return (
                    <SocialLoginPresenter
                      loginEmail={loginEmail}
                      password={password}
                      loginCallback={this.loginCallback}
                      onChange={this.onChange}
                      onClick={emailLoginMutation}
                    />
                  );
                }}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}

export default SocialLoginContainer;
