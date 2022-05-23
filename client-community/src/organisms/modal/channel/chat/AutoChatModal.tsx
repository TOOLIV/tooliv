import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { addWorkspaceMemberType } from 'types/workspace/workspaceTypes';
import TimePicker from 'react-time-picker';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);
  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 600px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Time = styled.div`
  width: 300px;
`;
const AutoChatModal = forwardRef<HTMLDivElement, addWorkspaceMemberType>(
  ({ isOpen, onClose }, ref) => {
    const [value, setValue] = useState('10:00');
    const inputRef = useRef<HTMLInputElement>(null);

    const onChange = () => {
      setValue(value);
    };
    const exitModal = useCallback(() => {
      inputRef.current!.value = '';
      onClose();
    }, [onClose]);

    return (
      <Modal isOpen={isOpen}>
        <Container ref={ref}>
          <Header>
            <Text size={18}>예약 메시지</Text>
            <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
          </Header>
          <Time>
            <TimePicker value={value} onChange={onChange} disableClock={true} />
          </Time>
        </Container>
      </Modal>
    );
  }
);

export default AutoChatModal;
