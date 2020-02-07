import React from 'react';
import styled from '../../typed-components';
import BackgroundImageDiv from '../../Components/BackgroundImageDiv/index';
import BgImage from '../../static/verifyEmail.jpg';

const MainDiv = styled(BackgroundImageDiv)`
  background-image: url(${BgImage});
  height: 100vh;
`;

const VerifyEmailPresenter: React.SFC<any> = () => <MainDiv />;

export default VerifyEmailPresenter;
