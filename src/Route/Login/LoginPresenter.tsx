/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-one-expression-per-line */
import styled from '../../typed-components';
import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import BackGround from '../../static/mainBackGround.jpg';

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 65%;
  background-image: url(${BackGround});
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
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
  background-color: black;
`;

const Title = styled.h1`
  color: white;
  text-shadow: 1px 1px 1px black;
  font-weight: bold;
  font-size: 30pt;
`;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding-top: 50px;
  padding-left: 30px;
  padding-bottom: 10px;
  height: 100%;
`;

const Grey = styled.span`
  color: ${(props) => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${(props) => props.theme.greyColor};
  padding: 55px 20px;
`;

const SocialLink = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-size: 20px;
`;

interface IProps extends RouteComponentProps<any> {}

const LoginPresenter: React.SFC<IProps> = () => (
  <Container>
    <Helmet>
      <title>Login | Uber</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>uber</Title>
      </Logo>
    </Header>
    <Footer>
      <PhoneLogin>
        <Subtitle>지금 uber와 함께하세요</Subtitle>
        <Link to="/phone-login">
          <FakeInput>
            <Grey>핸드폰으로 회원가입</Grey>
          </FakeInput>
        </Link>
      </PhoneLogin>
      <Link to="/social-login">
        <SocialLogin>
          <SocialLink>Or connect with social</SocialLink>
        </SocialLogin>
      </Link>
    </Footer>
  </Container>
);

export default LoginPresenter;
