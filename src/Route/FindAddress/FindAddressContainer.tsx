/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';
import FindAddressPresenter from './FindAddressPresenter';
import { reverseGeoCode, geoCode } from '../../mapHelpers';

interface IState {
  lat: number;
  lng: number;
  address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
  mapRef: React.RefObject<any>;

  map: any;

  constructor(props) {
    super(props);
    this.mapRef = React.createRef();

    this.state = {
      lat: 0,
      lng: 0,
      address: ''
    };
  }

  // 컴포넌트가 마운트되면 내 위치를 불러오고 콜백함수를 실행한다
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.handleGeoSuccess);
  }

  // 내 위치를 loadMap 함수에게 매개변수로 넘겨줌
  public handleGeoSuccess = async (position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    this.loadMap(latitude, longitude);
    const reversedAddress = await reverseGeoCode(latitude, longitude);
    this.setState({
      lat: latitude,
      lng: longitude,
      address: reversedAddress
    });
  };

  // 구글 맵을 로딩하는 함수
  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig = {
      zoom: 16,
      center: {
        lat,
        lng
      }
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener('dragend', this.handleDragEnd);
  };

  // 드래그가 끝나면 state의 위도 경도를 업데이트함
  public handleDragEnd = async () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversedAddress = await reverseGeoCode(lat, lng);

    this.setState({
      lat,
      lng,
      address: reversedAddress
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

  public handleBlur = async () => {
    const { address } = this.state;
    const result = await geoCode(address);
    if (result) {
      const { lat, lng, formatted_address } = result;
      this.setState({
        lat,
        lng,
        address: formatted_address
      });
      this.map.panTo({ lat, lng });
    }
  };

  public handleKeyPress = async (event) => {
    const { address } = this.state;
    if (event.keyCode === 13) {
      const result = await geoCode(address);
      if (result) {
        const { lat, lng, formatted_address } = result;
        this.setState({
          lat,
          lng,
          address: formatted_address
        });
        this.map.panTo({ lat, lng });
      }
    }
  };

  public onClickPlace = () => {
    const { address, lat, lng } = this.state;
    const { history } = this.props;
    history.push({
      pathname: '/add-place',
      lat,
      lng,
      address
    });
    console.log(address, lat, lng);
  };

  render() {
    return (
      <FindAddressPresenter
        name="address"
        onChange={this.onChange}
        onBlur={this.handleBlur}
        mapRef={this.mapRef}
        value={this.state.address}
        pressEnter={this.handleKeyPress}
        onClickPlace={this.onClickPlace}
      />
    );
  }
}

export default FindAddressContainer;
