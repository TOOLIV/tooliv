import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { forwardRef } from 'react';
import { channelHeaderDropdownType } from 'types/channel/contentType';

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
  width: 130px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
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
          <Icons icon="modify" />
          <Text size={14} pointer>
            채널 수정하기
          </Text>
        </ListItem>
      </Container>
    </Modal>
  );
});

export default ChannelHeaderDropdown;
