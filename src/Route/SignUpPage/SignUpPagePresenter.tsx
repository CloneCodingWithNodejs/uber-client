/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import styled from '../../typed-components';
import BackGround from '../../static/signUpBG.jpg';
import Input from '../../Components/Input/index';
import Form from '../../Components/Form/index';
import Button from '../../Components/Button/index';

const Container = styled.div`
  height: 100vh;
  background-image: url(${BackGround});
  background-size: cover;
  background-attachment: fixed;
  background-position: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const MainDiv = styled.div`
  width: 30%;
  min-width: 469px;
  height: 75%;
  background: white;
  box-shadow: 7px 8px 13px 4px #000000;
  border: 1px solid black;
  border-radius: 15px;
`;

const Logo = styled.div`
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
  background-color: ${(props) => props.theme.blackColor};
  margin-bottom: 30px;
`;

const InnerSpan = styled.span`
  margin-bottom: 30px;
  font-size: 25pt;
  font-weight: bold;
`;

const ExtendedInput = styled(Input)``;
const ExtendedForm = styled(Form)`
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-left: 60px;
  padding-right: 60px;
`;

const Title = styled.h1`
  color: white;
  text-shadow: 1px 1px 1px black;
  font-weight: bold;
  font-size: 30pt;
`;

const HiddenInput = styled.input`
  display: none;
`;

interface IProps {
  email: string;
  fbId: string;
  firstName: string;
  lastName: string;
  passwordDisabled: boolean;
  phoneDisabled: boolean;
  onChange: any;
  onSubmit: any;
  phoneNumber: string;
}

const SignUpPagePresenter: React.SFC<IProps> = ({
  email,
  fbId,
  firstName,
  lastName,
  passwordDisabled,
  phoneDisabled,
  onChange,
  onSubmit,
  phoneNumber
}) => (
  <Container>
    <Logo>
      <Title>Uber</Title>
    </Logo>
    <MainDiv>
      <ExtendedForm submitFn={onSubmit}>
        <InnerSpan>SIGN UP</InnerSpan>
        <ExtendedInput
          name="lastName"
          onChange={onChange}
          type="text"
          value={lastName}
          placeholder="성"
          required
        />
        <ExtendedInput
          name="firstName"
          onChange={onChange}
          type="text"
          value={firstName}
          placeholder="이름"
          required
        />
        <ExtendedInput
          name="email"
          onChange={onChange}
          type="text"
          value={email}
          placeholder="이메일"
          required
        />
        <ExtendedInput
          name="password"
          onChange={onChange}
          type="password"
          placeholder="비밀번호"
          disabled={passwordDisabled}
          required
        />
        <ExtendedInput
          name="password2"
          onChange={onChange}
          type="password"
          placeholder="비밀번호확인"
          required
          disabled={passwordDisabled}
        />
        <ExtendedInput
          name="age"
          onChange={onChange}
          type="number"
          placeholder="나이"
          required
        />
        <ExtendedInput
          name="phoneNumber"
          onChange={onChange}
          type="text"
          placeholder="핸드폰 번호"
          required
          value={phoneNumber}
          disabled={phoneDisabled}
        />
        <HiddenInput type="submit" />
        <Button onClick={null} type="submit" value="Create   Account" />
      </ExtendedForm>
    </MainDiv>
  </Container>
);
export default SignUpPagePresenter;
