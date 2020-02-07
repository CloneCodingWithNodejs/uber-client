import React from 'react';
import EamilSignUpPresenter from './EmailSignUpPresenter';

class EamilSignUpContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
  }

  public inputChange = (event) => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    });
  };

  public submitFn = () => {
    const { email } = this.state;

    console.log(email);
  };

  render() {
    return (
      <EamilSignUpPresenter
        submitFn={this.submitFn}
        onChange={this.inputChange}
      />
    );
  }
}

export default EamilSignUpContainer;
