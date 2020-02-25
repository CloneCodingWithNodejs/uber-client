import React from 'react';
import { getRide, userProfile, updateRide } from '../../types/api';
import styled from 'styled-components';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import { MutationFunction } from 'react-apollo';
import { GET_RIDE } from './RideQueries';
import noImage from '../../static/no-image-icon.png';
import { toast } from 'react-toastify';

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${(props) => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  width: 100px;
  height: 100px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
  background: ${(props) => props.theme.googleColor};
`;

interface IProps {
  getRideData?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: MutationFunction<updateRide, any>;
  rideId: string;
}

const RidePresenter: React.SFC<IProps> = ({
  getRideData: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn,
  rideId
}) => (
  <Container>
    {ride && user && (
      <React.Fragment>
        <Title>Passenger</Title>
        <Passenger>
          {ride.passenger.profilePhoto === '' && <Img src={noImage} />}
          {ride.passenger.profilePhoto !== '' && (
            <Img src={ride.passenger.profilePhoto!} />
          )}

          <Data>{ride.passenger.fullName!}</Data>
        </Passenger>
        {ride.driver && (
          <React.Fragment>
            <Title>Driver</Title>
            <Passenger>
              {ride.driver.profilePhoto === '' && <Img src={noImage} />}
              {ride.driver.profilePhoto !== '' && (
                <Img src={ride.driver.profilePhoto!} />
              )}
              <Data>{ride.driver.fullName!}</Data>
            </Passenger>
          </React.Fragment>
        )}
        <Title>From</Title>
        <Data>{ride.pickUpAddress}</Data>
        <Title>To</Title>
        <Data>{ride.dropOffAddress}</Data>
        <Title>Price</Title>
        <Data>{ride.price}</Data>
        <Title>Distance</Title>
        <Data>{ride.distance}</Data>
        <Title>Duration</Title>
        <Data>{ride.duration}</Data>
        <Title>Status</Title>
        <Data>{ride.status}</Data>
        <Buttons>
          {ride.driver.id === user.id && ride.status === 'ACCEPTED' && (
            <ExtendedButton
              type="button"
              value="승객 태우기"
              onClick={() => {
                updateRideFn({
                  variables: {
                    rideId: ride.id,
                    status: 'ONROUTE'
                  },
                  refetchQueries: [
                    {
                      query: GET_RIDE,
                      variables: { rideId: parseInt(rideId) }
                    }
                  ]
                });
                toast.success('탑승완료 주행중입니다!');
              }}
            />
          )}
          {ride.driver.id === user.id && ride.status === 'ONROUTE' && (
            <ExtendedButton
              type="button"
              value="주행 종료"
              onClick={() => {
                updateRideFn({
                  variables: {
                    rideId: ride.id,
                    status: 'FINISHED'
                  },
                  refetchQueries: [
                    {
                      query: GET_RIDE,
                      variables: { rideId: parseInt(rideId) }
                    }
                  ]
                });
                toast.success('목적지 도착 이용해주셔서 감사합니다 :)');
              }}
            />
          )}
          {(ride.driver.id === user.id || ride.passenger.id === user.id) &&
            ride.status === 'ACCEPTED' && (
              <Link to={`/chat/${ride.chatId}`}>
                <ExtendedButton type="button" value="채팅하기" onClick={null} />
              </Link>
            )}
        </Buttons>
      </React.Fragment>
    )}
  </Container>
);

export default RidePresenter;
