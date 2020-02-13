import React from 'react';
import { Mutation, Query } from 'react-apollo';
import SettingsPresenter from './SettingsPresenter';
import { LOG_USER_OUT } from '../../sharedQueries';
import { USER_PROFILE, GET_PLACES } from '../../sharedQueries/sharedQueries2';
import { userProfile, getPlaces } from '../../types/api';

class SettgingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
        {(logUserOut) => (
          <Query<userProfile> query={USER_PROFILE}>
            {({ data: userData, loading: userLoading }) => (
              <Query<getPlaces> query={GET_PLACES}>
                {({ data: placesData, loading: placesLoading }) => (
                  <SettingsPresenter
                    isLoading={userLoading}
                    onClick={logUserOut}
                    userData={userData}
                    placesData={placesData}
                    placesLoading={placesLoading}
                  />
                )}
              </Query>
            )}
          </Query>
        )}
      </Mutation>
    );
  }
}

export default SettgingsContainer;
