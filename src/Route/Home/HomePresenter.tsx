/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/button-has-type */
import React from 'react';
import Helmet from 'react-helmet';
import Sidebar from 'react-sidebar';
import styled from '../../typed-components';
import Menu from '../../Route/Menu/index';
import AddressBar from '../../Components/AddressBar';
import Button from '../../Components/Button';
import '../../static/css/sidebar.css';
import {
  userProfile,
  requestRide,
  requestRideVariables,
  getRides
} from '../../types/api';
import { MutationFunction } from 'react-apollo';
import RidePopUp from '../../Components/RidePopUp/RidePopUp';
import noImage from '../../static/no-image-icon.png';

const Container = styled.div``;

interface SButtonProps {
  isMenuOpen: boolean;
}

const SButton = styled.div<SButtonProps>`
  position: absolute;
  top: 20px;
  left: 40px;
  font-weight: bold;
  font-size: 20pt;
  color: ${(props) => (props.isMenuOpen ? 'white' : 'black')};
  transform: rotate(90deg);
  z-index: 100;
  cursor: pointer;

  @media screen and (max-width: 600px) {
    left: 10px;
  }
`;

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const ExtendedBtn = styled(Button)`
  width: 80%;
  position: absolute;
  bottom: 75px;
  z-index: 5;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 1px 1px 1px gray;
  background: ${(props) => props.theme.googleColor};
`;

const ExtendedBtnBottom = styled(Button)`
  width: 80%;
  position: absolute;
  bottom: 10px;
  z-index: 5;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 1px 1px 1px gray;
`;

interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  isLoading: boolean;
  mapRef: any;
  toAddress: string;
  onChange: any;
  pressEnter: any;
  onClick: any;
  price: string;
  userData?: userProfile;
  requestRideMutation: MutationFunction<requestRide, requestRideVariables>;
  nearbyRide?: getRides;
  acceptRideFn?: any;
  isDriving: boolean;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  isLoading,
  mapRef,
  toAddress,
  onChange,
  pressEnter,
  onClick,
  price,
  userData: { GetMyProfile: { user = null } = {} } = {},
  requestRideMutation,
  nearbyRide: { GetNearbyRide: { ride = null } = {} } = {},
  acceptRideFn,
  isDriving
}) => (
  <>
    {isDriving && ride && (
      <RidePopUp
        id={ride.id}
        acceptRideFn={acceptRideFn}
        distance={ride.distance}
        dropOffAddress={ride.dropOffAddress}
        passengerName={ride.passenger.fullName!}
        passengerPhoto={
          ride.passenger.profilePhoto === ''
            ? noImage
            : ride.passenger.profilePhoto!
        }
        pickUpAddress={ride.pickUpAddress}
        price={ride.price}
      />
    )}
    <Container>
      <Helmet>
        <title>Home | uber</title>
      </Helmet>
      {user && !user.isDriving && (
        <AddressBar
          name="toAddress"
          onBlur={() => {
            console.log('hi');
          }}
          onChange={onChange}
          pressEnter={pressEnter}
          value={toAddress}
        />
      )}

      <Sidebar
        sidebar={<Menu />}
        open={isMenuOpen}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: {
            width: '40%',
            zIndex: '10',
            backgroundColor: 'white'
          }
        }}
        sidebarId="customSidebar"
      >
        {!isLoading && (
          <SButton isMenuOpen={isMenuOpen} onClick={toggleMenu}>
            |||
          </SButton>
        )}
      </Sidebar>
      <Map ref={mapRef} />
      {price && (
        <ExtendedBtn
          onClick={requestRideMutation}
          type="button"
          value={`비용 : ${price}원 UBER 요청하기`}
          className="style"
        />
      )}
      {user && !user.isDriving && (
        <ExtendedBtnBottom
          onClick={onClick}
          type="button"
          value={toAddress === '' ? '도착 장소 선택하기' : '도착 장소 변경하기'}
        />
      )}
    </Container>
  </>
);

export default HomePresenter;
