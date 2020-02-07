/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import { VERIFY_EMAIL } from './VerifyEmailQueries';
import {
  completeEmailVerification,
  completeEmailVerificationVariables
} from '../../types/api';
import VerifyEmailPresenter from './VerifyEmailPresenter';

class VerifyEmailContainer extends React.Component<any, any> {
  public currentUrl: string = window.location.href;

  public key: string = this.currentUrl
    .split('verify-email')[1]
    .replace(new RegExp('/', 'g'), '');

  public verifyEmailMutation: any;

  componentDidMount() {
    this.verifyEmailMutation();
  }

  public completedFn = (data) => {
    const {
      CompleteEmailVerification: { ok, error }
    } = data;
    if (ok) {
      toast.success('이메일 인증 성공! 환영합니다!');
    }
    if (!ok && error === 'ALREADY_EXIST') {
      toast.error('이미 인증된 계정입니다');
    }
  };

  render() {
    return (
      <Mutation<completeEmailVerification, completeEmailVerificationVariables>
        mutation={VERIFY_EMAIL}
        variables={{ key: this.key }}
        onCompleted={(data) => this.completedFn(data)}
      >
        {(verifyEmailMutation, { loading }) => {
          this.verifyEmailMutation = verifyEmailMutation;

          return <VerifyEmailPresenter />;
        }}
      </Mutation>
    );
  }
}

export default VerifyEmailContainer;
