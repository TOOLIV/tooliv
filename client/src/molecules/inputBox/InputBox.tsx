import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import Icons from '../../atoms/common/Icons';
import Input from '../../atoms/input/Input';
import InputMessage from '../../atoms/inputMessage/InputMessage';
import { inputBoxTypes } from '../../types/common/inputTypes';
import Label from '../../atoms/label/Label';

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputBox = forwardRef<HTMLInputElement, inputBoxTypes>(
  ({ label, placeholder, message, status = 'default', onChange }, ref) => {
    return (
      <Layout>
        <Label label={label} />
        <Input
          placeholder={placeholder}
          status={status}
          onChange={onChange}
          ref={ref}
        />
        {status !== 'default' ? (
          <MessageContainer>
            {status !== 'default' ? (
              <Icons
                icon={status === 'success' ? 'check' : 'alert'}
                color={status === 'success' ? 'blue100' : 'red700'}
              />
            ) : null}
            <InputMessage status={status} message={message} />
          </MessageContainer>
        ) : null}
      </Layout>
    );
  }
);

export default InputBox;