/* eslint-disable no-useless-constructor */
import React from 'react';
import { Mutation } from 'react-apollo';
import { toast } from 'react-toastify';
import VerifyPhonePresenter from './VerifyPhonePresenter';
import { verifyPhone, verifyPhoneVariables } from '../../types/api';
import { VERIFY_PHONE } from './VerifyPhoneQuery';

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

  public render() {
    if (this.state) {
      const { verificationKey, phoneNumber } = this.state;

      return (
        <Mutation<verifyPhone, verifyPhoneVariables>
          variables={{ key: verificationKey, phoneNumber }}
          mutation={VERIFY_PHONE}
          onCompleted={(data) => {
            const { CompletePhoneVerification } = data;
            if (CompletePhoneVerification.ok) {
              return;
            }
            toast.error(CompletePhoneVerification.error);
          }}
        >
          {(mutation, { loading }) => (
            <VerifyPhonePresenter
              onSubmit={mutation}
              onChange={this.onInputChange}
              verificationKey={verificationKey}
              loading={loading}
            />
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
