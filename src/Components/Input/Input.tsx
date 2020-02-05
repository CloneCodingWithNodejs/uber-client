/* eslint-disable react/prop-types */
import React from 'react';
import styled from '../../typed-components';

const Container = styled.input`
  border: none;
  border-bottom: 2px solid grey;
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
`;

interface IProps {
  placeholder?: string;
  type: string;
  required?: boolean;
  value: string;
  name: string;
  onChange: any;
}

const Input: React.SFC<IProps> = ({
  placeholder,
  type,
  required,
  name,
  value,
  onChange
}) => (
  <Container
    name={name}
    type={type}
    required={required}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
  />
);

export default Input;
