import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import { forwardRef } from 'react';
import { colors } from 'shared/color';
import {
  channelDropdownType,
  channelHeaderDropdownType,
} from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 30px;
  left: 100px;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 180px;
  padding: 15px 0;
  background-color: ${colors.white};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

const ChannelHeaderDropdown = forwardRef<
  HTMLDivElement,
  channelHeaderDropdownType
>(({ isOpen, onClick, onClose }, ref) => {
  const handleOpenModifyModal = () => {
    onClick();
    onClose();
  };
  return (
    <Modal isOpen={isOpen} ref={ref}>
      <Container>
        <ListItem onClick={handleOpenModifyModal}>
          <Text size={14} pointer>
            채널 수정하기
          </Text>
        </ListItem>
      </Container>
    </Modal>
  );
});

export default ChannelHeaderDropdown;
