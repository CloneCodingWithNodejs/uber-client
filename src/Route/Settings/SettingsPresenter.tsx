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

  @media screen and (max-width: 1000px) {
    width: 100%;
    grid-column: 2 / span 3;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
    grid-column: 1 / span 6;
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

const NextBtn = styled.span`
  margin-bottom: 20px;
  cursor: pointer;
`;

const PreBtn = styled.span`
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const PageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const PlaceDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

interface IProps {
  onClick: any;
  userData?: userProfile;
  isLoading: boolean;
  placesData?: getPlaces;
  placesLoading: boolean;
  currentPage: number;
  nextPage: any;
  prePage: any;
}

const SettingsPresenter: React.SFC<IProps> = ({
  onClick,
  userData: { GetMyProfile: { user = null } = {} } = {} as any,
  isLoading,
  placesData: { GetMyPlaces: { places = null } = {} } = {} as any,
  placesLoading,
  currentPage,
  nextPage,
  prePage
}) => {
  const limit = currentPage + 5;
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
          <PlaceDiv>
            {!placesLoading &&
              places &&
              places.map((place, index) => {
                if (index <= limit && currentPage - 1 <= index) {
                  return (
                    <Place
                      key={place.id}
                      id={place.id}
                      fav={place.isFav}
                      name={place.name}
                      address={place.address}
                    />
                  );
                }
                return false;
              })}
            <PageDiv>
              {!placesLoading && currentPage !== 1 && (
                <PreBtn onClick={prePage}>이전</PreBtn>
              )}

              {!placesLoading && places.length > limit && (
                <NextBtn onClick={nextPage}>다음</NextBtn>
              )}
            </PageDiv>
          </PlaceDiv>
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
