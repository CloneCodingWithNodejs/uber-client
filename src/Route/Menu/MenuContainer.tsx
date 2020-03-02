/* eslint-disable indent */
import React from 'react';
import { Query, Mutation } from 'react-apollo';
import MenuPresenter from './MenuPresenter';
import { userProfile, toggleDriving } from '../../types/api';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import { TOGGLE_DRIVING } from './MenuQueries';

class MenuContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      userDriving: false
    };
  }

  render() {
    const { userDriving } = this.state;
    return (
      // <Mutation<toggleDriving>
      //   mutation={TOGGLE_DRIVING}
      //   update={(cache, { data }) => {
      //     if (data) {
      //       const { ToggleDrivingMode } = data;
      //       if (!ToggleDrivingMode.ok) {
      //         toast.error(ToggleDrivingMode.error);
      //       }
      //       const query: any = cache.readQuery({ query: USER_PROFILE });
      //       query.GetMyProfile.user.isDriving = !query.GetMyProfile.user
      //         .isDriving;
      //       cache.writeQuery({ query: USER_PROFILE, data: query });
      //     }
      //   }}
      // >

      <Mutation<toggleDriving>
        mutation={TOGGLE_DRIVING}
        refetchQueries={[{ query: USER_PROFILE }]}
        onCompleted={() => {
          const { userDriving } = this.state;
          this.setState({
            userDriving: !userDriving
          });
        }}
      >
        {(toggleDrivingFn) => (
          <Query<userProfile, any> query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                isLoading={loading}
                toggleDrivingFn={toggleDrivingFn}
                userDriving={userDriving}
              />
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default MenuContainer;
