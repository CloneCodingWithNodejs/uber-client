import styled from '../../typed-components';
import React from 'react';

const Container = styled.div<{ mine: boolean }>`
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${(props) =>
    props.mine ? props.theme.googleColor : props.theme.blackColor};
  padding: 30px;
  color: white;
  font-weight: bold;
  align-self: ${(props) => (props.mine ? 'flex-end' : 'flex-start')};
  border-radius: 20px;
  border-bottom-right-radius: ${(props) => (props.mine ? '5px' : '20px')};
  border-bottom-left-radius: ${(props) => (props.mine ? '20px' : '5px')};
`;

interface IProps {
  text: string;
  mine: boolean;
}

const Message: React.FC<IProps> = ({ text, mine }) => {
  return <Container mine={mine}>{text}</Container>;
};

export default Message;
