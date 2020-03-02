/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import styled from '../../typed-components';
import AddressBar from '../../Components/AddressBar';
import Button from '../../Components/Button';

const Map = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const Center = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  width: 40px;
  font-size: 150%;
  margin: auto;
  z-index: 2;
`;

const ExtendedBtn = styled(Button)`
  width: 40%;
  position: absolute;
  bottom: 10px;
  z-index: 5;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 10px;
  box-shadow: 1px 1px 1px gray;
`;

interface IProps {
  mapRef: any;
  name: string;
  onBlur: any;
  onChange: any;
  value: string;
  pressEnter: any;
  onClickPlace: any;
}

class FindAddressPresenter extends React.Component<IProps, any> {
  render() {
    const {
      mapRef,
      onBlur,
      onChange,
      value,
      pressEnter,
      onClickPlace
    } = this.props;
    return (
      <div>
        <AddressBar
          name="address"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          pressEnter={pressEnter}
        />
        <Center>📍</Center>
        <Map ref={mapRef} />
        <ExtendedBtn
          onClick={onClickPlace}
          type="button"
          value="장소 선택하기"
        />
      </div>
    );
  }
}

export default FindAddressPresenter;
