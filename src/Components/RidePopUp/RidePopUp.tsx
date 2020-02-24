import React from 'react';
import styled from '../../typed-components';
import Button from '../Button';
import { MutationFunction } from 'react-apollo';
import { acceptRide, acceptRideVariables } from '../../types/api';

const Container = styled.div`
  background-color: white;
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 80%;
  height: 60%;
  z-index: 9;
  padding: 20px;
  max-width: 500px;
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
  width: 80px;
  height: 80px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

interface IProps {
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passengerName: string;
  passengerPhoto: string;
  acceptRideFn: MutationFunction<acceptRide, acceptRideVariables>;
  id: number;
}

const ExtendedBtn = styled(Button)`
  margin-top: 60px;
  background: ${(props) => props.theme.googleColor};
`;

const RidePopUp: React.SFC<IProps> = ({
  pickUpAddress,
  dropOffAddress,
  price,
  distance,
  passengerName,
  passengerPhoto,
  acceptRideFn,
  id
}) => (
  <Container>
    <Title>타는 곳</Title>
    <Data>{pickUpAddress}</Data>
    <Title>내리는 곳 </Title>
    <Data>{dropOffAddress}</Data>
    <Title>가격</Title>
    <Data>{price}</Data>
    <Title>주행 거리</Title>
    <Data>{distance}</Data>
    <Title>탑승객:</Title>
    <Passenger>
      <Img src={passengerPhoto} />
      <Data>{passengerName}</Data>
    </Passenger>
    <ExtendedBtn
      onClick={() => acceptRideFn({ variables: { rideId: id } })}
      value="탑승요청 승인"
      type="button"
    />
  </Container>
);

export default RidePopUp;
