import React from 'react';
import { MutationFunction } from 'react-apollo';
import Helmet from 'react-helmet';
import Button from '../../Components/Button';
import Header from '../../Components/Header';
import Input from '../../Components/Input';
import styled from '../../typed-components';
import Form from '../../Components/Form/Form';

const Container = styled.div``;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFunction<any, any>;
  loading: boolean;
}

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo="/phone-login" title="Verify Phone Number" />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder="Enter Verification Code"
        name="verificationKey"
        type="text"
        onChange={onChange}
      />
      <Button
        disabled={loading}
        value={loading ? 'Verifying' : 'Submit'}
        onClick={null}
        type="submit"
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
