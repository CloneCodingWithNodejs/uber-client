import React from 'react';
import {
  getChat,
  userProfile,
  sendMessageVariables,
  sendMessage
} from '../../types/api';
import Message from '../../Components/Message';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Form from '../../Components/Form';
import '../../static/css/chatScroll.css';
import Header from '../../Components/Header';
import { MutationFunction } from 'react-apollo';

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  overflow-x: hidden;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  chatLoading: boolean;
  chatData: getChat;
  userData: userProfile;
  userLoading: boolean;
  messageText: string;
  setMessageText: any;
  sendMessageMutation: MutationFunction<sendMessage, sendMessageVariables>;
  chatId: number;
}

const ChatPresenter: React.FC<IProps> = ({
  chatLoading,
  chatData: { GetChat: { chat = null } = {} } = {},
  userData: { GetMyProfile: { user = null } = {} } = {},
  userLoading,
  messageText,
  setMessageText,
  sendMessageMutation,
  chatId
}) => {
  return (
    <Container>
      <Header title="chat" />
      <Chat id="style-5">
        {chat &&
          user &&
          chat.messages &&
          chat.messages.map((message) => {
            if (message) {
              return (
                <Message
                  key={message.id}
                  mine={user.id === message.userId}
                  text={message.text}
                />
              );
            } else {
              return <div>메세지가 없습니다</div>;
            }
          })}
      </Chat>
      <InputCont>
        <Form
          submitFn={() => {
            sendMessageMutation({
              variables: {
                text: messageText,
                chatId
              }
            });
            setMessageText('');
          }}
        >
          <Input
            type="text"
            value={messageText}
            placeholder="메세지를 입력하세요"
            onChange={(event) => {
              setMessageText(event.target.value);
            }}
            name="messageText"
          />
        </Form>
      </InputCont>
    </Container>
  );
};

export default ChatPresenter;
