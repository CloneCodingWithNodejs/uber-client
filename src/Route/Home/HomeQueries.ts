import { gql } from 'apollo-boost';

export const REPORT_LOCATION = gql`
  mutation reportLocation($lat: Float!, $lng: Float!) {
    ReportMovement(lastLat: $lat, lastLng: $lng) {
      ok
    }
  }
`;

export const GET_NEARBY_DRIVERS = gql`
  query getDrivers {
    GetNearByDrivers {
      ok
      drivers {
        id
        lastLat
        lastLng
      }
    }
  }
`;
