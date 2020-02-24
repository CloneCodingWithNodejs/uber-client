/* eslint-disable no-undef */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Query, graphql } from 'react-apollo';
import HomePresenter from './HomePresenter';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import {
  userProfile,
  reportLocation,
  reportLocationVariables,
  getDrivers
} from '../../types/api';
import { geoCode } from '../../mapHelpers';
import startFlag from '../../static/startFlag.png';
import car from '../../static/car.png';
import { toast } from 'react-toastify';
import { REPORT_LOCATION, GET_NEARBY_DRIVERS } from './HomeQueries';

interface IState {
  isMenuOpen: boolean;
  lat: number;
  lng: number;
  address: string;
  toLat: number;
  toLng: number;
  toAddress: string;
  distance: string;
  duration: string;
  price: string;
}

class HomeContatiner extends React.Component<any, IState> {
  mapRef: React.RefObject<any>;

  map!: google.maps.Map;

  userMarker!: google.maps.Marker;

  toMarker!: google.maps.Marker;

  directions!: google.maps.DirectionsRenderer;

  drivers: google.maps.Marker[] = [];

  constructor(props) {
    super(props);

    this.mapRef = React.createRef();

    this.state = {
      isMenuOpen: false,
      lng: 0,
      lat: 0,
      address: '',
      toLat: 0,
      toLng: 0,
      toAddress: '',
      distance: '',
      duration: '',
      price: ''
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess);
  }

  public handleGeoSuccess = async (position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.loadMap(latitude, longitude);

    this.setState({
      lat: latitude,
      lng: longitude
    });
  };

  public loadMap = (lat, lng) => {
    const mapConfig = {
      zoom: 16,
      center: {
        lat,
        lng
      },
      disableDefaultUI: true
    };

    this.map = new google.maps.Map(this.mapRef.current, mapConfig);

    google.maps.event.addDomListenerOnce(this.map, 'idle', () => {
      console.log('map Loaded!!');
    });

    const userMarkerOpitons: google.maps.MarkerOptions = {
      position: {
        lat,
        lng
      },
      icon:
        'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
    };

    this.userMarker = new google.maps.Marker(userMarkerOpitons);
    this.userMarker.setMap(this.map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };

    navigator.geolocation.watchPosition(
      this.handleGeoWatchSuccess,
      this.handleGeoWatchError,
      watchOptions
    );
  };

  public handleGeoWatchSuccess = (position) => {
    const {
      coords: { latitude, longitude }
    } = position;

    const { reportLocation } = this.props;

    this.userMarker.setPosition({ lat: latitude, lng: longitude });
    this.map.panTo({ lat: latitude, lng: longitude });

    reportLocation({
      variables: {
        lat: latitude,
        lng: longitude
      }
    });
  };

  public handleGeoWatchError = () => {
    console.log('handleGeoWatchError');
  };

  public toggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  public onChange = (event) => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
  };

  public pressEnter = async (event) => {
    const { toAddress } = this.state;
    if (event.keyCode === 13) {
      this.makeToMarker(toAddress, google);
    }
  };

  public onClick = async (event) => {
    const { toAddress } = this.state;
    this.makeToMarker(toAddress, google);
  };

  public makeToMarker = async (toAddress, google) => {
    const result = await geoCode(toAddress);
    if (result.formatted_address !== 'NO_ADDRESS') {
      const { lat, lng, formatted_address: formatedAddress } = result;

      const toMarkerOpitons: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        },
        icon: {
          url: startFlag,
          scaledSize: new google.maps.Size(35, 35)
        }
      };
      if (this.toMarker) {
        this.toMarker.setMap(null);
      }

      this.toMarker = new google.maps.Marker(toMarkerOpitons);
      this.toMarker.setMap(this.map);

      const bounds: google.maps.LatLngBounds = new google.maps.LatLngBounds();

      bounds.extend({ lat: this.state.lat, lng: this.state.lng });
      bounds.extend({ lat, lng });

      this.map.fitBounds(bounds);

      this.setState(
        {
          toAddress: formatedAddress,
          toLat: lat,
          toLng: lng
        },
        this.createPath
      );
    } else {
      toast.error('해당하는 주소가 없어요 :( ');
    }
  };

  public createPath = () => {
    const { toLat, toLng, lat, lng } = this.state;
    if (this.directions) {
      this.directions.setMap(null);
    }

    const rednerOptions: google.maps.DirectionsRendererOptions = {
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: 'red'
      }
    };

    const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
    this.directions = new google.maps.DirectionsRenderer(rednerOptions);

    const to = new google.maps.LatLng(toLat, toLng);
    const from = new google.maps.LatLng(lat, lng);

    const directionOptions: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.TRANSIT
    };

    directionService.route(directionOptions, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        const { routes } = result;
        const {
          distance: { text: distance },
          duration: { text: duration }
        } = routes[0].legs[0];
        console.log(distance, duration);
        this.directions.setDirections(result);
        this.directions.setMap(this.map);
        this.setState({ distance, duration }, this.setPrice);
      } else {
        toast.error(status);
      }
    });
  };

  public setPrice = () => {
    const { distance } = this.state;

    this.setState({
      price: Number(parseFloat(distance.replace('.', ',')) * 3000).toFixed(2)
    });
  };

  public handleNearbyDrivers = (data: getDrivers) => {
    const {
      GetNearByDrivers: { ok, drivers }
    } = data;

    if (ok && drivers) {
      drivers.forEach((driver) => {
        if (driver) {
          const existingDriver:
            | google.maps.Marker
            | undefined = this.drivers.find(
            (driverMarker: google.maps.Marker) => {
              const markerID = driverMarker.get('id');
              return markerID === driver.id;
            }
          );
          //이미 존재한다면 마커를 수정
          if (existingDriver) {
            if (driver.lastLat && driver.lastLng) {
              existingDriver.setPosition({
                lat: driver.lastLat,
                lng: driver.lastLng
              });

              // 이거 빼먹으면 안됨
              existingDriver.setMap(this.map);
            } else {
              console.log('drvier.lastLng or LastLat is null');
            }
            // 그렇지않다면 마커를 새로생성함
          } else {
            if (driver.lastLat && driver.lastLng) {
              const markerOptions: google.maps.MarkerOptions = {
                position: {
                  lat: driver.lastLat,
                  lng: driver.lastLng
                },
                icon: {
                  url: car,
                  scaledSize: new google.maps.Size(50, 50)
                }
              };

              const newMarker: google.maps.Marker = new google.maps.Marker(
                markerOptions
              );

              //마커에 아이디를 지정함 .set(키,밸류)
              newMarker.set('id', driver.id);
              newMarker.setMap(this.map);
              this.drivers.push(newMarker);
            } else {
              console.log('drvier.lastLng or LastLat is null');
            }
          }
        }
      });
    }
  };

  public render() {
    const { isMenuOpen, toAddress, price } = this.state;
    return (
      <Query<userProfile> query={USER_PROFILE}>
        {({ data, loading }) => {
          return (
            <Query<getDrivers>
              fetchPolicy="cache-and-network"
              query={GET_NEARBY_DRIVERS}
              pollInterval={1000}
              skip={
                (data &&
                  data.GetMyProfile &&
                  data.GetMyProfile.user &&
                  data.GetMyProfile.user.isDriving) ||
                false
              }
              onCompleted={this.handleNearbyDrivers}
            >
              {() => (
                <HomePresenter
                  isMenuOpen={isMenuOpen}
                  toggleMenu={this.toggleMenu}
                  isLoading={loading}
                  mapRef={this.mapRef}
                  toAddress={toAddress}
                  onChange={this.onChange}
                  pressEnter={this.pressEnter}
                  onClick={this.onClick}
                  price={price}
                  userData={data}
                />
              )}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default graphql<{}, reportLocation, reportLocationVariables>(
  REPORT_LOCATION,
  {
    name: 'reportLocation'
  }
)(HomeContatiner);
