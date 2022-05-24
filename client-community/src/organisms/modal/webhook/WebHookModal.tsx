import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import React, { useEffect, useRef, useState } from 'react';
import { colors } from 'shared/color';
import { webHookModalType } from 'types/channel/contentType';
import RegisterWebHook from './RegisterWebHook';
import WebHookList from './WebHookList';

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 16px; */
`;

const Description = styled.div`
  margin-bottom: 16px;
`;

const Menu = styled.div`
  display: flex;
`;

const SubMenu = styled.div<{ selected?: boolean }>`
  border-radius: 10px 10px 0 0;
  border: 1px solid ${colors.gray400};
  border: ${(props) => props.selected && 'none'};
  background-color: ${(props) => props.selected && colors.secondary};
  color: ${(props) => props.theme.textColor};
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
`;

const WebHookListContainer = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const WebHookModal = ({ isOpen, onClose, channelId }: webHookModalType) => {
  const [selectedMenu, setSelectedMenu] = useState({
    1: true,
    2: false,
  });

  const changeSubMenu = (subId: number) => {
    if (subId === 1) {
      setSelectedMenu({
        1: true,
        2: false,
      });
    } else {
      setSelectedMenu({
        1: false,
        2: true,
      });
    }
  };

  useEffect(() => {
    // bot 리스트 불러오는 코드
  }, []);

  if (!isOpen) return <></>;
  return (
    <BulrContainer>
      <Container>
        <div>
          <Header>
            <Text size={18}>WebHook</Text>
            <Icons icon="xMark" width="32" height="32" onClick={onClose} />
          </Header>
          <Description>
            <Text size={12}>등록한 WebHook 메세지를 받아볼 수 있습니다.</Text>
          </Description>
        </div>
        <Menu>
          <SubMenu selected={selectedMenu[1]} onClick={() => changeSubMenu(1)}>
            새 WebHook 등록
          </SubMenu>
          <SubMenu selected={selectedMenu[2]} onClick={() => changeSubMenu(2)}>
            등록된 WebHook목록
          </SubMenu>
        </Menu>
        {selectedMenu[1] && (
          <WebHookListContainer>
            <RegisterWebHook onClose={onClose} />
          </WebHookListContainer>
        )}
        {selectedMenu[2] && (
          <WebHookListContainer>
            <WebHookList />
          </WebHookListContainer>
        )}
      </Container>
    </BulrContainer>
  );
};

export default WebHookModal;
