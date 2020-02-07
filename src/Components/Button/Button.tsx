/* eslint-disable react/prop-types */
import React from 'react';
import styled from '../../typed-components';

const Container = styled.input`
  width: 100%;
  background: #000000cf;
  color: white;
  text-transform: uppercase;
  padding: 15px 0;
  font-size: 16px;
  border: 0;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  &:active,
  &:focus {
    outline: none;
  }
  &:disabled {
    opacity: 0.8;
  }
`;

interface IProps {
  value: string;
  onClick: any;
  disabled?: boolean;
  type: string;
}

const Button: React.SFC<IProps> = ({
  value,
  onClick,
  disabled = false,
  type
}) => (
  <Container value={value} disabled={false} onClick={onClick} type={type} />
);

export default Button;
