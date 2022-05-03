import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { forwardRef } from 'react';
import { colors } from 'shared/color';
import {
  channelDropdownType,
  exitChannelModalType,
} from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 20px;
  left: 20px;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 130px;
  padding: 5px 0;
  background-color: ${colors.white};
  /* border-radius: 8px; */
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 5px 30px 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray100};
  }
`;

const ChannelExitModal = forwardRef<HTMLDivElement, exitChannelModalType>(
  ({ isOpen }, ref) => {
    return (
      <Modal isOpen={isOpen} ref={ref}>
        <Container>
          <ListItem>
            <Icons icon="xMark" />
            <Text size={14} pointer>
              채널 나가기
            </Text>
          </ListItem>
        </Container>
      </Modal>
    );
  }
);

export default ChannelExitModal;
