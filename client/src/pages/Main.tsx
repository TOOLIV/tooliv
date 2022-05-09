import Message from 'molecules/chat/Message';
import React from 'react';
const Main = () => {
  return (
    <div>
      <Message
        chatId="0"
        sender="Tooliv"
        sendTime="0"
        contents="test"
        channelId="1"
        type="test"
        email="aaa"
      />
    </div>
  );
};

export default Main;
