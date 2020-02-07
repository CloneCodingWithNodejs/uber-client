/* eslint-disable react/prop-types */
import React from 'react';
import styled from '../../typed-components';

const Container = styled.input`
  font-size: 13pt;
  width: 100%;
  height: 45px;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  margin-bottom: 30px;
  padding: 10px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12),
    inset 0 1px 2px rgba(0, 0, 0, 0.24);
`;

interface IProps {
  placeholder?: string;
  required?: boolean;
  type: string;
  value?: string;
  name: string;
  onChange: any;
  disabled?: boolean;
}

const Input: React.SFC<IProps> = ({
  placeholder,
  type,
  required,
  name,
  value,
  onChange,
  disabled
}) => {
  if (required) {
    return (
      <Container
        name={name}
        type={type}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }
  return (
    <Container
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
