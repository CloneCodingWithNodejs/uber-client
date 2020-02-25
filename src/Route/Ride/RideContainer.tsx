import React from 'react';
import RidePresenter from './RidePresenter';
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables
} from '../../types/api';
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from './RideQueries';
import { useQuery, useMutation } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import { SubscribeToMoreOptions } from 'apollo-boost';

// class RideContainer extends React.Component<any, any> {
//   constructor(props) {
//     super(props);

//     //url에 rideId가 없을 경우 홈으로 보냄
//     if (!props.match.params.rideId) {
//       props.history.push({ pathname: '/' });
//     }
//   }

//   render() {
//     const {
//       match: {
//         params: { rideId }
//       }
//     } = this.props;

//     //getRide 쿼리
//     const { data: getRideData } = useQuery<getRide, getRideVariables>(
//       GET_RIDE,
//       {
//         variables: {
//           rideId
//         }
//       }
//     );
//     return <RidePresenter getRideData={getRideData} />;
//   }
// }

const RideContainer: React.FC<any> = (props) => {
  const {
    match: {
      params: { rideId }
    }
  } = props;
  // 굳이 rideId를 state로 둘 필요는 없을듯?
  //const [rideId] = React.useState<IState>(initRideId);
  const { data: getRideData, subscribeToMore } = useQuery<
    getRide,
    getRideVariables
  >(GET_RIDE, {
    variables: {
      rideId: parseInt(rideId)
    }
  });

  const subscribeOptions: SubscribeToMoreOptions = {
    document: RIDE_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) {
        return prev;
      }
      const {
        data: {
          RideStatusSubscription: { status }
        }
      } = subscriptionData;

      if (status === 'FINISHED') {
        const { history } = props;
        history.push({ pathname: '/' });
      }
    }
  };

  subscribeToMore(subscribeOptions);

  const [updateRideMutation] = useMutation<updateRide, updateRideVariables>(
    UPDATE_RIDE_STATUS
  );

  const { data: userData, loading } = useQuery<userProfile>(USER_PROFILE);

  return (
    <RidePresenter
      userData={userData}
      loading={loading}
      getRideData={getRideData}
      updateRideFn={updateRideMutation}
      rideId={rideId}
    />
  );
};

export default RideContainer;
