/* eslint-disable no-undef */
/* eslint-disable react/no-find-dom-node */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Query, graphql, Mutation } from 'react-apollo';
import HomePresenter from './HomePresenter';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import {
  userProfile,
  reportLocation,
  reportLocationVariables,
  getDrivers,
  requestRide,
  requestRideVariables,
  acceptRide
} from '../../types/api';
import { geoCode, reverseGeoCode } from '../../mapHelpers';
import startFlag from '../../static/startFlag.png';
import car from '../../static/car.png';
import { toast } from 'react-toastify';
import {
  REPORT_LOCATION,
  GET_NEARBY_DRIVERS,
  REQUEST_RIDE,
  GET_NEARBY_RIDE,
  ACCEPT_RIDE,
  SUBSCRIBE_NEARBY_RIDES
} from './HomeQueries';
import { SubscribeToMoreOptions } from 'apollo-client';

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
  fromAddress: string;
  isDriving: boolean;
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
      price: '',
      fromAddress: '',
      isDriving: false
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess);
  }

  public getFromAddress = async (lat: number, lng: number) => {
    const address = await reverseGeoCode(lat, lng);

    if (address) {
      this.setState({
        fromAddress: address
      });
    }
  };

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

    this.getFromAddress(lat, lng);
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

    let setPrice = Number(
      parseFloat(distance.replace('.', ',')) * 3000
    ).toFixed(2);

    if (setPrice === '0.00') {
      setPrice = '1000.00';
    }

    this.setState({
      price: setPrice
    });
  };

  public handleNearbyDrivers = (data: getDrivers) => {
    const {
      GetNearByDrivers: { ok, drivers }
    } = data;
    const { isDriving } = this.state;
    if (ok && drivers && !isDriving) {
      drivers.forEach((driver) => {
        if (driver) {
          console.log(driver);
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
    } else {
      console.log('실향됨');
      for (let i = 0; i < this.drivers.length; i++) {
        this.drivers[i].setMap(null);
      }
    }
  };

  public handleRequestRide = (data: requestRide) => {
    const { history } = this.props;
    if (data.RequestRide.ok) {
      toast.success('Uber 요청 성공!!');
      history.push({
        pathname: `/ride/${data.RequestRide.ride!.id}`
      });
    }
    if (data.RequestRide.error) toast.error(data.RequestRide.error);
  };

  public handleProfileQuery = (data: userProfile) => {
    const {
      GetMyProfile: { user }
    } = data;

    if (user) {
      const { isDriving } = user;
      if (isDriving) {
        this.setState({
          isDriving
        });
      }
    }
  };

  public render() {
    const {
      isMenuOpen,
      toAddress,
      price,
      distance,
      fromAddress,
      lat,
      lng,
      toLat,
      toLng,
      duration,
      isDriving
    } = this.state;
    return (
      <Query<userProfile>
        query={USER_PROFILE}
        onCompleted={this.handleProfileQuery}
      >
        {({ data, loading }) => {
          return (
            <Mutation<requestRide, requestRideVariables>
              mutation={REQUEST_RIDE}
              variables={{
                distance,
                pickUpAddress: fromAddress,
                pickUpLat: lat,
                pickUpLng: lng,
                price: Number(price),
                duration,
                dropOffLat: toLat,
                dropOffLng: toLng,
                dropOffAddress: toAddress
              }}
              onCompleted={this.handleRequestRide}
            >
              {(rideMutation) => {
                return (
                  <Query<getDrivers>
                    fetchPolicy="cache-and-network"
                    query={GET_NEARBY_DRIVERS}
                    skip={isDriving}
                    pollInterval={1000}
                    onCompleted={this.handleNearbyDrivers}
                  >
                    {() => {
                      return (
                        <Query query={GET_NEARBY_RIDE} key="999">
                          {({ subscribeToMore, data: getNearbyRide }) => {
                            const rideSubscriptionOptions: SubscribeToMoreOptions = {
                              document: SUBSCRIBE_NEARBY_RIDES,
                              updateQuery: (prev, { subscriptionData }) => {
                                if (!subscriptionData.data) {
                                  return prev;
                                }
                                const newObject = Object.assign({}, prev, {
                                  GetNearbyRide: {
                                    ...prev.GetNearbyRide,
                                    ride:
                                      subscriptionData.data
                                        .NearbyRideSubscription
                                  }
                                });

                                return newObject;
                              }
                            };
                            subscribeToMore(rideSubscriptionOptions);
                            return (
                              <Mutation
                                mutation={ACCEPT_RIDE}
                                onCompleted={(data: acceptRide) => {
                                  const { history } = this.props;
                                  if (data.UpdateRideStatus.ok) {
                                    toast.success('탑승 요청 승인 성공!!');
                                    history.push({
                                      pathname: `/ride/${data.UpdateRideStatus.rideId}`
                                    });
                                  } else {
                                    toast.error(data.UpdateRideStatus.error);
                                  }
                                }}
                              >
                                {(acceptRideFn) => (
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
                                    requestRideMutation={rideMutation}
                                    nearbyRide={getNearbyRide}
                                    acceptRideFn={acceptRideFn}
                                    isDriving={isDriving}
                                  />
                                )}
                              </Mutation>
                            );
                          }}
                        </Query>
                      );
                    }}
                  </Query>
                );
              }}
            </Mutation>
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
