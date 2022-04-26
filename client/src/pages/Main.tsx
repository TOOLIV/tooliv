import Message from 'molecules/chat/Message';
import React from 'react';

const Main = () => {
  return (
    <div>
      <Message sender="Tooliv" contents="test" roomId="1" type="test" />
    </div>
  );
};

export default Main;
