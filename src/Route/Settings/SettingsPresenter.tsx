/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../static/settings.jpg';
import styled from '../../typed-components';
import BackgroundImage from '../../Components/BackgroundImageDiv';
import Place from '../../Components/Place';
import Button from '../../Components/Button';
import { userProfile, getPlaces } from '../../types/api';
import Header from '../../Components/Header';

const Container = styled(BackgroundImage)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-image: url(${Background});
`;

const MainDiv = styled.div`
  grid-column: 3 / span 2;
  width: 100%;
  background: white;
  box-shadow: 7px 8px 13px 4px #000000;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;

  @media screen and (max-width: 600px) {
    width: 100%;
    grid-column: 2 / span 4;
  }
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Div = styled.div`
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ExtendedBtn = styled(Button)`
  margin-top: 30px;
`;

const SLink = styled(Link)`
  width: 100%;
`;

interface IProps {
  onClick: any;
  userData?: userProfile;
  isLoading: boolean;
  placesData?: getPlaces;
  placesLoading: boolean;
}

const SettingsPresenter: React.SFC<IProps> = ({
  onClick,
  userData: { GetMyProfile: { user = null } = {} } = {} as any,
  isLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {} as any,
  placesLoading
}) => {
  return (
    <>
      <Header title="Account Settings" backTo="/" />
      <Container>
        <MainDiv>
          {!isLoading && user && (
            <>
              <Link to="/edit-account">
                <Image src={user.profilePhoto} />
              </Link>
              <UserDiv>
                <Link to="/edit-account">
                  <Div>{user.fullName}</Div>
                  <Div>{user.email}</Div>
                </Link>
              </UserDiv>
            </>
          )}
          {!placesLoading &&
            places &&
            places.map((place) => (
              <Place
                key={place.id}
                id={place.id}
                fav={place.isFav}
                name={place.name}
                address={place.address}
              />
            ))}
          <Link to="/places">장소 추가하기</Link>
          <SLink to="/logout">
            <ExtendedBtn
              onClick={onClick}
              type="button"
              value="로그아웃"
              className="style"
            />
          </SLink>
        </MainDiv>
      </Container>
    </>
  );
};

export default SettingsPresenter;
