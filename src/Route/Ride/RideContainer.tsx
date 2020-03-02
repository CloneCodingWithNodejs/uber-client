import React, { useState } from 'react';
import RidePresenter from './RidePresenter';
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables,
  updateIsRidingStatus,
  updateIsRidingStatusVariables,
  completeRide,
  completeRideVariables
} from '../../types/api';
import {
  GET_RIDE,
  RIDE_SUBSCRIPTION,
  UPDATE_RIDE_STATUS,
  UPDATE_ISRIDING_STATUS,
  COMPLETE_RIDE
} from './RideQueries';
import { useQuery, useMutation } from 'react-apollo';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import { SubscribeToMoreOptions } from 'apollo-boost';
import { toast } from 'react-toastify';
import styled from '../../typed-components';
import waitingImage from '../../static/waiting.png';

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

  const [count, setCount] = useState(0);

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

      //state값 변경으로 강제 리렌더링함
      setCount(count + 1);

      if (status === 'FINISHED' && !userData!.GetMyProfile!.user!.isDriving) {
        const { history } = props;
        toast.success('이용해주셔서 감사합니다 :)');
        history.push({ pathname: '/' });
      }
    }
  };

  subscribeToMore(subscribeOptions);

  const [updateRideMutation] = useMutation<updateRide, updateRideVariables>(
    UPDATE_RIDE_STATUS
  );

  const [completeRideMutation] = useMutation<
    completeRide,
    completeRideVariables
  >(COMPLETE_RIDE, {
    onCompleted: (data: completeRide) => {
      const {
        CompleteRide: { error }
      } = data;

      if (error) {
        toast.error(error);
      }
    }
  });

  const [updateIsRideMutation] = useMutation<
    updateIsRidingStatus,
    updateIsRidingStatusVariables
  >(UPDATE_ISRIDING_STATUS);

  const { data: userData, loading } = useQuery<userProfile>(USER_PROFILE);

  //대기중 사진
  const Waiting = styled.div`
    background-image: url(${waitingImage});
    width: 366px;
    height: 450px;
  `;

  const Container = styled.div`
    width: 100%;
    height: 100vh;
    min-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const Comment = styled.div`
    margin-top: 50px;
    font-weight: bold;
    font-size: 20pt;
  `;

  if (getRideData?.GetRide.ride?.driver) {
    return (
      <RidePresenter
        userData={userData}
        loading={loading}
        getRideData={getRideData}
        updateRideFn={updateRideMutation}
        rideId={rideId}
        updateIsRideMutation={updateIsRideMutation}
        completeRideMutation={completeRideMutation}
      />
    );
  } else if (loading) {
    return <div></div>;
  } else {
    return (
      <Container>
        <Waiting />
        <Comment>운전자를 찾는중입니다, 잠시만 기다려주세요 :)</Comment>
      </Container>
    );
  }
};

export default RideContainer;
