/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
import { getPlaces } from '../../types/api';
import styled from '../../typed-components';
import BackgroundImage from '../../Components/BackgroundImageDiv';
import Background from '../../static/mainBackGround.jpg';
import Place from '../../Components/Place/index';
import Header from '../../Components/Header';

const Container = styled(BackgroundImage)`
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-image: url(${Background});
`;

const MainDiv = styled.div`
  display: flex;
  grid-column: 3 / span 2;
  background: white;
  width: 100%;
  min-height: 200px;
  align-items: center;
  flex-direction: column;
  padding: 30px;

  @media screen and (max-width: 600px) {
    grid-column: 1 / span 6;
  }
`;

const PlaceDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SLink = styled(Link)`
  text-decoration: underline;
  font-weight: bold;
`;

interface IProps {
  data?: getPlaces;
  loading: boolean;
}

const PlacePresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {} as any,
  loading
}) => (
  <>
    <Header title="Places" backTo="/account-settings" />
    <Container>
      <MainDiv>
        <SLink to="/add-place">장소를 추가해보세요!</SLink>
        <PlaceDiv>
          {!loading &&
            places &&
            places.map((place) => (
              <Place
                id={place.id}
                key={place.id}
                fav={place.isFav}
                name={place.name}
                address={place.address}
              />
            ))}
        </PlaceDiv>
      </MainDiv>
    </Container>
  </>
);

export default PlacePresenter;
