/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import styled from '../../typed-components';
import BackgroundImage from '../../Components/BackgroundImageDiv';
import Background from '../../static/editProfile.jpg';
import Input from '../../Components/Input/index';
import Form from '../../Components/Form/index';
import Button from '../../Components/Button';
import PhotoInput from '../../Components/PhotoInput/index';

const Container = styled(BackgroundImage)`
  background-image: url(${Background});
  display: grid;
  grid-template-columns: repeat(6, 1fr);
`;

const MainDiv = styled.div`
  grid-column: 3 / span 2;
  width: 100%;
  height: 75%;
  background: white;
  box-shadow: 7px 8px 13px 4px #000000;
  border: 1px solid black;
  border-radius: 15px;
  @media screen and (max-width: 600px) {
    grid-column: 2 / span 4;
  }
`;

const ExtendedForm = styled(Form)`
  padding: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ExtendedInput = styled(Input)`
  @media screen and (max-width: 600px) {
    height: 30px;
    font-size: 10pt;
  }
`;

const ExtendedBtn = styled(Button)`
  margin-top: 10%;
`;

interface IProps {
  onChange: any;
  isLoading: boolean;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto: string;
  submitFn: any;
  uploading: boolean;
  fileChange: any;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  onChange,
  isLoading,
  email,
  firstName,
  lastName,
  profilePhoto,
  submitFn,
  uploading,
  fileChange
}) => {
  return (
    <Container>
      <MainDiv>
        <ExtendedForm submitFn={submitFn}>
          <PhotoInput
            uploading={uploading}
            fileUrl={profilePhoto}
            onChange={fileChange}
          />
          <ExtendedInput
            name="lastName"
            onChange={onChange}
            type="text"
            placeholder="성"
            required
            value={lastName}
            className="style"
          />
          <ExtendedInput
            name="firstName"
            onChange={onChange}
            type="text"
            placeholder="이름"
            required
            value={firstName}
            className="style"
          />
          <ExtendedInput
            name="email"
            onChange={onChange}
            type="text"
            placeholder="이메일"
            required
            value={email}
            className="style"
          />
          <HiddenInput type="submit" />
          <ExtendedBtn
            className="class"
            onClick={null}
            type="submit"
            value={isLoading ? 'Loading' : 'Edit Account'}
          />
        </ExtendedForm>
      </MainDiv>
    </Container>
  );
};

export default EditAccountPresenter;
