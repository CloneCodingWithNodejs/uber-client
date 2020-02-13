import React from 'react';
import { Mutation } from 'react-apollo';
import { EDIT_PLACE } from '../../Route/Places/PlaceQueries';
import PlacePresenter from './PlacePresenter';
import { GET_PLACES } from '../../sharedQueries/sharedQueries2';

interface IProps {
  fav: boolean;
  name: string;
  address: string;
  id: number;
}

class PlaceContainer extends React.Component<IProps> {
  render() {
    const { fav, name, address, id } = this.props;
    return (
      <Mutation
        mutation={EDIT_PLACE}
        variables={{
          placeId: id,
          isFav: !fav,
          name,
          address
        }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {(mutation) => (
          <PlacePresenter
            onStarPress={mutation}
            address={address}
            fav={fav}
            name={name}
            id={id}
          />
        )}
      </Mutation>
    );
  }
}

export default PlaceContainer;
