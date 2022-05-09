import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import { forwardRef } from 'react';
import { colors } from 'shared/color';
import { channelDropdownType } from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 20px;
  left: 250px;
  z-index: 1;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 200px;
  padding: 15px 0;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const ChannelDropDown = forwardRef<HTMLDivElement, channelDropdownType>(
  (
    { isOpen, onClose, openCreateChannelModal, openPublicChannelListModal },
    ref
  ) => {
    const handleChannelCreateModal = () => {
      openCreateChannelModal();
      onClose();
    };
    const handlePublicChannelListModal = () => {
      openPublicChannelListModal();
      onClose();
    };
    return (
      <Modal isOpen={isOpen} ref={ref}>
        <Container>
          <ListItem onClick={handleChannelCreateModal}>
            <Text size={16} pointer>
              채널 생성하기
            </Text>
          </ListItem>
          <ListItem onClick={handlePublicChannelListModal}>
            <Text size={16} pointer>
              참여 가능한 채널 보기
            </Text>
          </ListItem>
        </Container>
      </Modal>
    );
  }
);

export default ChannelDropDown;
