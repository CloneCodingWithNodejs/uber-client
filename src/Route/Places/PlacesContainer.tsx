import React from 'react';
import { Query } from 'react-apollo';
import PlacePresenter from './PlacesPresenter';
import { GET_PLACES } from '../../sharedQueries/sharedQueries2';
import { getPlaces } from '../../types/api';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  render() {
    return (
      <Query<getPlaces> query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacePresenter loading={loading} data={data} />
        )}
      </Query>
    );
  }
}

export default PlaceContainer;
