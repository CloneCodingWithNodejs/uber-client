import React from 'react';
import { toast } from 'react-toastify';
import { Mutation } from 'react-apollo';
import AddPlacePresenter from './AddPlacePresenter';
import { ADD_PLACE } from './AddPlaceQueries';
import { GET_PLACES } from '../../sharedQueries/sharedQueries2';

interface IState {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

class AddPlaceContainer extends React.Component<any, IState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      lat: 0,
      lng: 0
    };
  }

  public onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };

  render() {
    const { name, address, lat, lng } = this.state;
    const { history } = this.props;
    return (
      <Mutation
        mutation={ADD_PLACE}
        refetchQueries={[{ query: GET_PLACES }]}
        variables={{ address, name, lat, lng, isFav: false }}
        onCompleted={(data) => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success('장소추가 성공!');
            setTimeout(() => {
              history.push('/places');
            }, 2000);
          } else if (AddPlace.error) {
            toast.error(AddPlace.error);
          }
        }}
      >
        {(mutation, { loading }) => (
          <AddPlacePresenter
            onChange={this.onChange}
            address={address}
            name={name}
            submitFn={mutation}
            pickedAddress={lat !== 0 && lng !== 0}
          />
        )}
      </Mutation>
    );
  }
}

export default AddPlaceContainer;
