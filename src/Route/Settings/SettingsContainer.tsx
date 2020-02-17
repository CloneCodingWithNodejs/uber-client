import React from 'react';
import { Mutation, Query } from 'react-apollo';
import SettingsPresenter from './SettingsPresenter';
import { LOG_USER_OUT } from '../../sharedQueries';
import { USER_PROFILE, GET_PLACES } from '../../sharedQueries/sharedQueries2';
import { userProfile, getPlaces } from '../../types/api';

class SettgingsContainer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      index: 1
    };
  }

  public nextPage = () => {
    this.setState({
      index: this.state.index + 7
    });
  };

  public prePage = () => {
    this.setState({
      index: this.state.index - 7
    });
  };

  public render() {
    const { index } = this.state;
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
                    currentPage={index}
                    nextPage={this.nextPage}
                    prePage={this.prePage}
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
