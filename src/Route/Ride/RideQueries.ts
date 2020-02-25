import { gql } from 'apollo-boost';

export const GET_RIDE = gql`
  query getRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      error
      ride {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        duration
        distance
        passenger {
          id
          fullName
          profilePhoto
        }
        chatId
        driver {
          id
          fullName
          profilePhoto
        }
      }
    }
  }
`;

export const RIDE_SUBSCRIPTION = gql`
  subscription rideUpdates {
    RideStatusSubscription {
      id
      status
      pickUpAddress
      dropOffAddress
      price
      duration
      distance
      passenger {
        id
        fullName
        profilePhoto
      }
      chatId
      driver {
        id
        fullName
        profilePhoto
      }
    }
  }
`;

export const UPDATE_RIDE_STATUS = gql`
  mutation updateRide($rideId: Int!, $status: StatusOption!) {
    UpdateRideStatus(rideId: $rideId, status: $status) {
      ok
      error
      rideId
    }
  }
`;
