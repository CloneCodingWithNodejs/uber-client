import React, { useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import ChatPresenter from './ChatPresenter';
import { useQuery, useMutation } from 'react-apollo';
import {
  getChat,
  getChatVariables,
  userProfile,
  sendMessage,
  sendMessageVariables
} from '../../types/api';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import { USER_PROFILE } from '../../sharedQueries/sharedQueries2';
import { SubscribeToMoreOptions } from 'apollo-boost';

// const [count, setCount] = useState(0);
//   useEffect(() => {
//     document.title = `너는 클릭을 ${count}번했구나!!`;
//   });

const ChatContainer: React.FC<any> = (props) => {
  if (!props.match.params.chatId) {
    props.history.push({ pathname: '/' });
  }

  const [messageText, setMessageText] = React.useState<string>('');

  const chatId = parseInt(props.match.params.chatId);

  const { data: chatData, loading: chatLoading, subscribeToMore } = useQuery<
    getChat,
    getChatVariables
  >(GET_CHAT, { variables: { chatId } });

  const { data: userData, loading: userLoading } = useQuery<userProfile>(
    USER_PROFILE
  );

  const [sendMessageMutation] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE
  );

  useEffect(() => {
    scrollToBottom();
  });

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: 'style-5'
    });
  };

  const subscribeToMoreOptions: SubscribeToMoreOptions = {
    document: SUBSCRIBE_TO_MESSAGES,
    updateQuery: (prev, { subscriptionData }) => {
      const {
        data: { MessageSubscription }
      } = subscriptionData;

      const {
        GetChat: {
          chat: { messages }
        }
      } = prev;

      if (messages.length > 0) {
        const newMessageId = MessageSubscription.id;
        const latestMessageId = messages[messages.length - 1].id;

        if (newMessageId === latestMessageId) {
          return;
        }
      }

      const newObject = Object.assign({}, prev, {
        GetChat: {
          ...prev.GetChat,
          chat: {
            ...prev.GetChat.chat,
            messages: [
              ...prev.GetChat.chat.messages,
              subscriptionData.data.MessageSubscription
            ]
          }
        }
      });

      return newObject;
    }
  };

  subscribeToMore(subscribeToMoreOptions);

  if (!chatLoading && !userLoading) {
    // 허용되지않은 사용자가 채팅방 입장시 홈으로 kick 함
    const { user } = userData!.GetMyProfile;
    const { driverId, passengerId } = chatData!.GetChat!.chat!;
    if (user!.id !== driverId && user!.id !== passengerId) {
      props.history.push({ pathname: '/' });
    }
    return (
      <>
        <ChatPresenter
          chatData={chatData!}
          chatLoading={chatLoading}
          userLoading={userLoading}
          userData={userData!}
          messageText={messageText}
          setMessageText={setMessageText}
          sendMessageMutation={sendMessageMutation}
          chatId={chatId}
        />
      </>
    );
  } else {
    return <div />;
  }
};

export default ChatContainer;
