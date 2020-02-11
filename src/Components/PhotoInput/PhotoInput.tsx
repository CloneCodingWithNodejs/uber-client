/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from '../../typed-components';

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 35px;
  justify-content: center;
`;

const Image = styled.label`
  cursor: pointer;
  height: 80px;
  width: 80px;
  border: 2px solid black;
  border-radius: 50%;
  font-size: 28px;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  width: 0px;
  height: 0px;
`;

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: any;
}
const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => (
  <Container>
    <Input id="photo" type="file" accept="image/*" onChange={onChange} />
    <Image htmlFor="photo">
      {uploading && '⏰'}
      {!uploading && <img src={fileUrl} />}
    </Image>
  </Container>
);
export default PhotoInput;
