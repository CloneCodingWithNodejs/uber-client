/* eslint-disable max-classes-per-file */
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import PhoneLoginPresenter from './PhoneLoginPresenter';
import { PHONE_SIGN_IN } from './PhoneQueries.local';
import {
  startPhoneVerification,
  startPhoneVerificationVariables
} from '../../types/api';

interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: '+82',
      phoneNumber: '12345'
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

  public render() {
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    return (
      <Mutation<startPhoneVerification, startPhoneVerificationVariables>
        mutation={PHONE_SIGN_IN}
        variables={{
          PhoneNumber: countryCode + phoneNumber.substr(1)
        }}
        onCompleted={(data) => {
          const { StartPhoneVerification } = data;
          if (StartPhoneVerification.ok) {
            toast.info('인증번호 전송');
            setTimeout(
              () =>
                history.push({
                  pathname: '/verify-phone',
                  state: {
                    phoneNumber: countryCode + phoneNumber.substr(1)
                  }
                }),
              2000
            );
          }
          toast.error(StartPhoneVerification.error);
        }}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
            event.preventDefault();
            const isValid = /^\d{11}$/.test(phoneNumber);

            if (isValid) {
              mutation();
            } else {
              toast.error('핸드폰 번호를 확인해주세요');
            }
          };

          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default PhoneLoginContainer;
