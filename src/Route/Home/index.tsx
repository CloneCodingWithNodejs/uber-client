import { GoogleApiWrapper } from 'google-maps-react';
import HomeContatiner from './HomeContatiner';
import { MAPS_KEY } from '../../keys';

export default GoogleApiWrapper({
  apiKey: MAPS_KEY
})(HomeContatiner);
