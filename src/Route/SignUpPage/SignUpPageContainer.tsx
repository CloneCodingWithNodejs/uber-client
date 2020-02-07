/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-alert */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import SignUpPagePresenter from './SignUpPagePresenter';
import { EMAIL_SIGN_UP } from '../EmailSignUp/EmailSignUpQueries';
import { emailSignUp, emailSignUpVariables } from '../../types/api';
import { LOG_USER_IN } from '../../sharedQueries';

class SignUpPageContainer extends React.Component<any, any> {
  public emailSignUpMutation: any;

  constructor(props) {
    super(props);
    // this.props.location.state.stateData
    this.state = {
      email: '',
      fbId: '',
      firstName: '',
      lastName: '',
      passwordDisabled: false,
      phoneDisabled: false,
      phoneNumber: '',
      profilePhoto: '',
      password: '',
      password2: ''
    };

    if (this.props.location.state.stateData) {
      const {
        email,
        fbId,
        firstName,
        lastName
      } = this.props.location.state.stateData;
      this.state = {
        email,
        fbId,
        firstName,
        lastName,
        passwordDisabled: false,
        phoneDisabled: false,
        phoneNumber: '',
        profilePhoto: '',
        password: '',
        password2: ''
      };
    }

    if (this.props.location.state.phoneNumber) {
      const { phoneNumber } = this.props.location.state;
      this.state = {
        email: '',
        fbId: '',
        firstName: '',
        lastName: '',
        passwordDisabled: false,
        phoneDisabled: false,
        phoneNumber,
        profilePhoto: '',
        password: '',
        password2: ''
      };
    }
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  public onSubmitFn = () => {
    const {
      password,
      password2,
      firstName,
      lastName,
      email,
      profilePhoto,
      age,
      phoneNumber
    } = this.state;
    if (password !== password2) {
      toast.error('비밀번호가 서로 다릅니다! 확인해주세요');
    } else {
      try {
        this.emailSignUpMutation({
          variables: {
            firstName,
            lastName,
            email,
            password,
            profilePhoto,
            age: parseInt(age, 0),
            phoneNumber
          }
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  public onCompletedFn = (data, logUserInMutation) => {
    const { EmailSignUp } = data;
    if (EmailSignUp.ok && EmailSignUp.token) {
      toast.success('이제 이메일 인증을 해주세요!');
      setTimeout(() => {
        logUserInMutation({
          variables: {
            token: EmailSignUp.token
          }
        });
      }, 2000);
    }
  };

  render() {
    const { email, fbId, firstName, lastName, phoneNumber } = this.state;
    let { passwordDisabled, phoneDisabled } = this.state;
    // 페북 연동이라면 패스워드는 입력할 수 없어야함
    if (fbId) {
      passwordDisabled = true;
    }
    if (phoneNumber) {
      phoneDisabled = true;
    }
    return (
      <Mutation mutation={LOG_USER_IN}>
        {(logUserInMutation) => {
          return (
            <Mutation<emailSignUp, emailSignUpVariables>
              mutation={EMAIL_SIGN_UP}
              onCompleted={(data) =>
                this.onCompletedFn(data, logUserInMutation)
              }
            >
              {(emailSignUpMutation, { loading }) => {
                this.emailSignUpMutation = emailSignUpMutation;
                return (
                  <SignUpPagePresenter
                    email={email}
                    fbId={fbId}
                    firstName={firstName}
                    lastName={lastName}
                    passwordDisabled={passwordDisabled}
                    phoneDisabled={phoneDisabled}
                    onChange={this.onInputChange}
                    onSubmit={this.onSubmitFn}
                    phoneNumber={phoneNumber}
                  />
                );
              }}
            </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default SignUpPageContainer;
