/* eslint-disable operator-linebreak */
/* eslint-disable no-constant-condition */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import styled from '../../typed-components';
import { Link } from 'react-router-dom';
import { userProfile } from '../../types/api';
import noImage from '../../static/no-image-icon.png';

const MainDiv = styled.div`
  background: white;
  height: 100vh;
`;

const TopDiv = styled.div`
  height: 25%;
  background: ${(props) => props.theme.blackColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 40ex;
  margin-right: 10px;
  @media screen and (max-width: 600px) {
    height: 60px;
    width: 60px;
    margin-left: 10px;
  }
`;

const UserName = styled.span`
  font-size: 15pt;
  color: white;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 10pt;
  }
`;

const MenuDiv = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Span = styled.span`
  font-size: 15pt;
  font-weight: bold;
  @media screen and (max-width: 600px) {
    font-size: 12pt;
  }
`;

const SLink = styled(Link)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

interface IToggleProps {
  isDriving: boolean;
}

const DriveBtn = styled.button<IToggleProps>`
  margin-top: 15px;
  background-color: ${(props) =>
    props.isDriving ? props.theme.yellowColor : props.theme.googleColor};
  width: 100%;
  height: 50px;
  border-style: none;
  font-size: 15pt;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

interface IProps {
  isLoading: boolean;
  data?: userProfile;
  toggleDrivingFn: any;
  userDriving: boolean;
}

const MenuPresenter: React.SFC<IProps> = ({
  data: { GetMyProfile: { user = null } = {} } = {},
  isLoading,
  toggleDrivingFn,
  userDriving
}) => (
  <MainDiv>
    {!isLoading && user && (
      <>
        {user.profilePhoto && (
          <TopDiv>
            <ProfileImg src={user.profilePhoto} />
            <UserName>{user.fullName}</UserName>
          </TopDiv>
        )}
        {user.profilePhoto === '' && (
          <TopDiv>
            <ProfileImg src={noImage} />
            <UserName>{user.fullName}</UserName>
          </TopDiv>
        )}
        <MenuDiv>
          <SLink to="#">
            <Span>내 이용 기록</Span>
          </SLink>
          <SLink to="/edit-account">
            <Span>내 프로필</Span>
          </SLink>
          <SLink to="/account-settings">
            <Span>프로필 설정</Span>
          </SLink>
          <DriveBtn onClick={toggleDrivingFn} isDriving={userDriving}>
            {userDriving ? 'Stop Driving' : 'StartDriving'}
          </DriveBtn>
        </MenuDiv>
      </>
    )}
  </MainDiv>
);

export default MenuPresenter;
