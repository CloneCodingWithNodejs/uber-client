/* eslint-disable max-classes-per-file */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { PHONE_SIGN_IN } from './PhoneQueries';
import {
  startPhoneVerification,
  startPhoneVerificationVariables
} from '../../types/api';

interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
  disabled: boolean;
}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  public phoneMutation: any;

  constructor(props) {
    super(props);
    this.state = {
      countryCode: '+82',
      phoneNumber: '12345',
      disabled: false
    };
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const { countryCode, phoneNumber } = this.state;

    event.preventDefault();
    const isValid = /^\d{11}$/.test(phoneNumber);

    if (isValid) {
      this.phoneMutation({
        variables: {
          PhoneNumber: countryCode + phoneNumber.substr(1)
        }
      });
    } else {
      toast.error('핸드폰 번호를 확인해주세요');
    }
  };

  public onCompleteFn = (data) => {
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    const { StartPhoneVerification } = data;

    if (StartPhoneVerification.error === 'ALREADY_EXIST') {
      toast.error('이미 같은 핸드폰 번호로 가입되어있습니다!');
    } else if (StartPhoneVerification.ok) {
      toast.info('인증번호 전송');
      setTimeout(
        () =>
          history.push({
            pathname: '/verify-phone',
            state: {
              phoneNumber: countryCode + phoneNumber.substr(1)
            }
          }),
        500
      );
    } else {
      toast.error(StartPhoneVerification.error);
    }
  };

  public render() {
    const { countryCode, phoneNumber, disabled } = this.state;
    return (
      <Mutation<startPhoneVerification, startPhoneVerificationVariables>
        mutation={PHONE_SIGN_IN}
        onCompleted={(data) => {
          this.onCompleteFn(data);
        }}
      >
        {(mutation, { loading }) => {
          this.phoneMutation = mutation;
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
              loading={loading}
              disabled={disabled}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default PhoneLoginContainer;
