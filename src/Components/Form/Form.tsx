/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from '../../typed-components';

interface IProps {
  submitFn: any;
  className?: string;
}

const StyleForm = styled.form``;

const Form: React.SFC<IProps> = ({ submitFn, className, children }) => (
  <StyleForm
    className={className}
    onSubmit={(e) => {
      e.preventDefault();
      submitFn();
    }}
  >
    {children}
  </StyleForm>
);

export default Form;
