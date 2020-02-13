import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../Components/BackgroundImageDiv';
import Background from '../../static/addplace.jpg';
import Form from '../../Components/Form';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import Header from '../../Components/Header';

const Container = styled(BackgroundImage)`
  background-image: url(${Background});
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: center;
  align-items: center;
`;

const MainDiv = styled.div`
  width: 100%;
  grid-column: 3 / span 2;
  background: white;
  padding: 45px;
`;

const ExtendedForm = styled(Form)``;

const ExtendedInput = styled(Input)``;

const HiddenInput = styled.input`
  display: none;
`;

const ExtendedBtn = styled(Button)`
  margin-top: 50px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  onChange: any;
  address: string;
  name: string;
  submitFn: any;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  onChange,
  address,
  name,
  submitFn,
  pickedAddress
}) => (
  <>
    <Header title="addPlace" backTo="/" />
    <Container>
      <MainDiv>
        <ExtendedForm submitFn={submitFn}>
          <ExtendedInput
            name="name"
            onChange={onChange}
            type="text"
            placeholder="장소이름"
            value={name}
            required
          />
          <ExtendedInput
            name="address"
            onChange={onChange}
            type="text"
            placeholder="주소"
            value={address}
            required
          />
          <SLink to="/find-address">지도에서 주소 찾기</SLink>
          {pickedAddress && (
            <>
              <HiddenInput type="submit" />
              <ExtendedBtn onClick={submitFn} value="확인" type="button" />
            </>
          )}
        </ExtendedForm>
      </MainDiv>
    </Container>
  </>
);

export default AddPlacePresenter;
