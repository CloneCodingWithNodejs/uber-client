import React, { useState, useEffect } from 'react';
import ChatPresenter from './ChatPresenter';

const ChatContainer: React.FC<any> = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `너는 클릭을 ${count}번했구나!!`;
  });

  return <ChatPresenter count={count} setCount={setCount} />;
};

export default ChatContainer;
