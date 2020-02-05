/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Helmet from 'react-helmet';
import Input from '../../Components/Input';
import countries from '../../countries';
import styled from '../../typed-components';
import BackArrow from '../../Components/BackArrow';
import Background from '../../static/verifyPhone.jpg';

const Container = styled.div`
  height: 100vh;
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Title = styled.h2`
  font-size: 23px;
  margin-bottom: 5%;
`;

const CountrySelect = styled.select`
  font-size: 12pt;
  color: '#2c3e50';
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: 'Maven Pro';
  margin-bottom: 20px;
  width: 90%;
  margin-left: 3%;
  margin-top: 5%;
  margin-bottom: 15%;
`;

const CountryOption = styled.option``;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  color: white;
  background: ${(props) => props.theme.googleColor};
  cursor: pointer;
  height: 50px;
  margin-top: 200px;
  font-weight: bold;
  font-size: 13pt;
`;

const MainDiv = styled.div`
  background-color: white;
  min-width: 30%;
  height: 50%;
  padding: 20px;
  box-shadow: 7px 2px 19px 6px black;
`;

interface IProps {
  countryCode: string;
  phoneNumber: string;
  onInputChange: any;
  onSubmit: any;
  loading: any;
}

const PhoneLoginPresenter: React.SFC<IProps> = ({
  countryCode,
  phoneNumber,
  onInputChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Phone Login | Number</title>
    </Helmet>
    <MainDiv>
      <Title>핸드폰 번호를 공백없이 입력해주세요</Title>
      <BackArrowExtended backTo="/" />
      <CountrySelect
        value={countryCode}
        name="countryCode"
        onChange={onInputChange}
      >
        {countries.map((country, index) => (
          <CountryOption key={index} value={country.dial_code}>
            {country.flag} {country.name} ({country.dial_code})
          </CountryOption>
        ))}
      </CountrySelect>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="010 1234 1234"
          name="phoneNumber"
          value={phoneNumber}
          onChange={onInputChange}
          type="text"
        />
        <Button>인증번호 전송</Button>
      </Form>
    </MainDiv>
  </Container>
);

export default PhoneLoginPresenter;
