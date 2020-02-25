import React from 'react';

interface IState {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const ChatPresenter: React.FC<IState> = ({ count, setCount }) => {
  return (
    <div>
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      ></button>
    </div>
  );
};

export default ChatPresenter;
