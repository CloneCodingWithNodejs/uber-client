/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Query } from 'react-apollo';
import HomePresenter from './HomePresenter';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import { userProfile } from '../../types/api';

interface IState {
  isMenuOpen: boolean;
}

class HomeContatiner extends React.Component<any, IState> {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false
    };
  }

  public toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  public render() {
    const { isMenuOpen } = this.state;
    return (
      <Query<userProfile> query={USER_PROFILE}>
        {({ loading }) => {
          return (
            <HomePresenter
              isMenuOpen={isMenuOpen}
              toggleMenu={this.toggleMenu}
              isLoading={loading}
            />
          );
        }}
      </Query>
    );
  }
}

export default HomeContatiner;
