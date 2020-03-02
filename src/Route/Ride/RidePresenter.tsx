import React from 'react';
import {
  getRide,
  userProfile,
  updateRide,
  updateIsRidingStatus,
  updateIsRidingStatusVariables,
  completeRide,
  completeRideVariables
} from '../../types/api';
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
  updateIsRideMutation: MutationFunction<
    updateIsRidingStatus,
    updateIsRidingStatusVariables
  >;
  completeRideMutation: MutationFunction<completeRide, completeRideVariables>;
}

const RidePresenter: React.SFC<IProps> = ({
  getRideData: { GetRide: { ride = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  updateRideFn,
  rideId,
  updateIsRideMutation,
  completeRideMutation
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
          {ride.driver ? (
            ride.driver.id === user.id &&
            ride.status === 'ACCEPTED' && (
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
            )
          ) : (
            <></>
          )}
          {ride.driver &&
            ride.status === 'ONROUTE' &&
            ride.driver.id === user.id && (
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

                  updateIsRideMutation({
                    variables: { userId: ride.passenger.id }
                  });

                  completeRideMutation({
                    variables: {
                      driverId: ride!.driver!.id,
                      passengerId: ride.passenger.id,
                      rideId: parseInt(rideId)
                    }
                  });

                  toast.success('목적지 도착 이용해주셔서 감사합니다 :)');

                  setTimeout(() => {
                    window.location.href = '/';
                  }, 1500);
                }}
              />
            )}
          {(ride!.driver!.id === user.id || ride.passenger.id === user.id) &&
            (ride.status === 'ACCEPTED' || ride.status === 'ONROUTE') && (
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
