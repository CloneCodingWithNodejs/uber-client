/* eslint-disable camelcase */
/* eslint-disable consistent-return */
import axios from 'axios';
import { toast } from 'react-toastify';
import { MAPS_KEY } from './keys';

// 주소로 위도경도를 리턴함
export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${MAPS_KEY}`;
  const { data } = await axios(URL);
  const { results } = data;
  if (results.length !== 0) {
    const firstPlace = results[0];
    const {
      formatted_address,
      geometry: {
        location: { lat, lng }
      }
    } = firstPlace;
    return { lat, lng, formatted_address };
  } else {
    return { lat: 0, lng: 0, formatted_address: 'NO_ADDRESS' };
  }
};

// 위도 경도로 주소를 리턴함
export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAPS_KEY}`;
  const { status, data } = await axios(URL);
  if (status === 200) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;
    return address;
  }
  toast.error(data.error_message);
};
