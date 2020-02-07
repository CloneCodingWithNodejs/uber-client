/* eslint-disable operator-linebreak */
/* eslint-disable no-useless-constructor */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { VERIFY_PHONE } from './VerifyPhoneQuery';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { LOG_USER_IN } from '../../sharedQueries';

interface IState {
  verificationKey: string;
  phoneNumber: string;
}

class VerifyPhoneContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    if (!props.location.state) {
      props.history.push('/');
    }

    if (props.location.state) {
      this.state = {
        verificationKey: '',
        phoneNumber: props.location.state.phoneNumber || ''
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

  public onCompleteFn = (data, logUserInMutation) => {
    const { CompletePhoneVerification } = data;
    // 핸드폰 인증에 성공하고 이미 가입되어 있을 경우에는
    // 로그인함

    // 핸드폰인증에 성공했지만 가입이 되어있지않은 경우에는
    // 회원가입 페이지로 이동함
    if (CompletePhoneVerification.ok && !CompletePhoneVerification.token) {
      const { history } = this.props;
      // 회원가입 페이지로 이동해야함
      toast.info('인증 성공! 회원가입 페이지로 이동합니다');
      setTimeout(() => {
        const {
          history: {
            location: { state }
          }
        } = this.props;
        history.push({
          pathname: '/signUp',
          state: {
            phoneNumber: state.phoneNumber
          }
        });
      }, 1500);
    }
    toast.error(CompletePhoneVerification.error);
  };

  public render() {
    if (this.state) {
      const { verificationKey, phoneNumber } = this.state;

      return (
        <Mutation mutation={LOG_USER_IN}>
          {(logUserInMutation) => (
            <Mutation<verifyPhone, verifyPhoneVariables>
              variables={{ key: verificationKey, phoneNumber }}
              mutation={VERIFY_PHONE}
              onCompleted={(data) => this.onCompleteFn(data, logUserInMutation)}
            >
              {(startPhoneVerficationMutation, { loading }) => (
                <VerifyPhonePresenter
                  onSubmit={startPhoneVerficationMutation}
                  onChange={this.onInputChange}
                  verificationKey={verificationKey}
                  loading={loading}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      );
    }

    return (
      <div>
        <span>this is error</span>
      </div>
    );
  }
}

export default VerifyPhoneContainer;
