import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Background from '../../static/verifyPhone.jpg';
import Input from '../../Components/Input';
import Form from '../../Components/Form';

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

const Title = styled.h2`
  font-size: 23px;
  margin-bottom: 15%;
`;

const Button = styled.button`
  border: none;
  color: white;
  background: ${(props) => props.theme.googleColor};
  cursor: pointer;
  height: 50px;
  margin-top: 240px;
  font-weight: bold;
  font-size: 13pt;
  width: 100%;
`;

const MainDiv = styled.div`
  background-color: white;
  min-width: 30%;
  height: 50%;
  padding: 20px;
  box-shadow: 7px 2px 19px 6px black;
`;

interface IProps {
  submitFn: any;
  onChange: any;
}

const EamilSignUpPresenter: React.SFC<IProps> = ({ submitFn, onChange }) => {
  return (
    <Container>
      <Helmet>
        <title>EmailSignUp | Email Address</title>
      </Helmet>
      <MainDiv>
        <Title>이메일 주소를 입력해주세요</Title>
        <Form submitFn={submitFn}>
          <Input
            placeholder="uber@uber.com"
            name="email"
            onChange={onChange}
            type="email"
            required
          />
          <Button>확인</Button>
        </Form>
      </MainDiv>
    </Container>
  );
};

export default EamilSignUpPresenter;
