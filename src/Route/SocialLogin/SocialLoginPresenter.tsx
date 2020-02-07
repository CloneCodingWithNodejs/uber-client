/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import Helmet from 'react-helmet';
import FacebookLogin from 'react-facebook-login';
import styled from '../../typed-components';
import Background from '../../static/socialLoginBG.jpg';
import '../../static/css/facebookBtn.css';

const Container = styled.div`
  height: 100vh;
`;

const MainDiv = styled.div`
  background-image: url(${Background});
  background-size: cover;
  background-attachment: fixed;
  background-position: 100% 100%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const SocialLoginForm = styled.div`
  width: 50%;
  height: 50%;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 647px;
`;

// const FaceBookConnect = styled.div`
//   background-color: ${(props) => props.theme.faceBookColor};
//   height: 15%;
//   width: 100%;
//   color: white;
//   font-weight: bold;
//   padding: 8px;
//   display: flex;
//   align-items: center;
//   cursor: pointer;
// `;

const GoogleConnect = styled.div`
  background-color: ${(props) => props.theme.googleColor};
  height: 15%;
  width: 100%;
  color: white;
  font-weight: bold;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SocialImage = styled.img`
  color: white;
  width: 40px;
  height: 36px;
  filter: invert(100%);
  margin-right: 20px;
  margin-left: 10px;
`;

const InnerSpan = styled.span`
  color: white;
  margin-left: 15px;
  font-weight: bold;
  font-size: 13pt;
`;

// const Header = styled.div`
//   height: 10%;
//   background-color: blue;
// `;

// const Footer = styled.div`
//   height: 10%;
//   background-color: red;
// `;

interface IProps {
  loginCallback: (fbData) => void;
}

const SocialLoginPresenter: React.SFC<IProps> = ({ loginCallback }) => (
  <Container>
    <Helmet>
      <title>Social Login | Uber </title>
    </Helmet>
    <MainDiv>
      <SocialLoginForm className="form">
        <FacebookLogin
          textButton="Facebook으로 계속"
          appId="630076941159979"
          autoLoad={false}
          fields="first_name,email,picture,last_name"
          callback={loginCallback}
          cssClass="facebook__button"
          onClick={null}
          icon={
            <SocialImage
              alt="google"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgMGgtMTRjLTIuNzYxIDAtNSAyLjIzOS01IDV2MTRjMCAyLjc2MSAyLjIzOSA1IDUgNWgxNGMyLjc2MiAwIDUtMi4yMzkgNS01di0xNGMwLTIuNzYxLTIuMjM4LTUtNS01em0tMyA3aC0xLjkyNGMtLjYxNSAwLTEuMDc2LjI1Mi0xLjA3Ni44ODl2MS4xMTFoM2wtLjIzOCAzaC0yLjc2MnY4aC0zdi04aC0ydi0zaDJ2LTEuOTIzYzAtMi4wMjIgMS4wNjQtMy4wNzcgMy40NjEtMy4wNzdoMi41Mzl2M3oiLz48L3N2Zz4="
            />
          }
        />
        <GoogleConnect>
          <SocialImage
            alt="google"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNyAxMXYyLjRoMy45N2MtLjE2IDEuMDI5LTEuMiAzLjAyLTMuOTcgMy4wMi0yLjM5IDAtNC4zNC0xLjk3OS00LjM0LTQuNDIgMC0yLjQ0IDEuOTUtNC40MiA0LjM0LTQuNDIgMS4zNiAwIDIuMjcuNTggMi43OSAxLjA4bDEuOS0xLjgzYy0xLjIyLTEuMTQtMi44LTEuODMtNC42OS0xLjgzLTMuODcgMC03IDMuMTMtNyA3czMuMTMgNyA3IDdjNC4wNCAwIDYuNzIxLTIuODQgNi43MjEtNi44NCAwLS40Ni0uMDUxLS44MS0uMTExLTEuMTZoLTYuNjF6bTAgMCAxNyAyaC0zdjNoLTJ2LTNoLTN2LTJoM3YtM2gydjNoM3YyeiIgZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4="
          />
          <InnerSpan>Google로 계속</InnerSpan>
        </GoogleConnect>
      </SocialLoginForm>
    </MainDiv>
  </Container>
);

export default SocialLoginPresenter;
