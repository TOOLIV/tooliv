import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/sidemenu/Label';
import MenuTemplate from '../../atoms/sidemenu/MenuTemplate';
import { isOpenSide } from '../../recoil/atom';
import { sideMenuType } from '../../types/sidemenu/sideMenuType';

export const TopContainer = styled.div`
  display: flex;
  padding: 16px 18px 16px 18px;
  /* width: 280px; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelsContainer = styled.div<{ isOpen: boolean }>`
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
  padding-bottom: 16px;
`;

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 24px;
  height: 30px;
  padding-left: 8px;
  transition: 0.3s;
  /* 선택된 채널만 */
  &:nth-of-type(1) {
    background-color: ${(props) => props.theme.pointColor};
    border-radius: 10px 0 0 10px;
    border-right: 4px solid ${(props) => props.theme.secondPointColor};
  }
  &:hover {
    background-color: ${(props) => props.theme.lightPointColor};
    border-radius: 10px 0 0 10px;
    border-right: 4px solid ${(props) => props.theme.secondPointColor};
  }
`;
export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const navigate = useNavigate();
  const dummyData: sideMenuType[] = [
    {
      id: '0',
      name: '1. 공지사항',
    },
    {
      id: '1',
      name: '2. 잡담',
    },
  ];
  return (
    <>
      <TopContainer>
        <MenuTemplate title="채널" />
        <Icons icon="plus" />
      </TopContainer>
      <ChannelsContainer isOpen={isOpen}>
        {dummyData.map((channel) => (
          <ChannelContainer
            key={channel.id}
            onClick={() => navigate('/meeting/0/0')}
          >
            <SideWrapper>
              <Icons icon="lock" />
            </SideWrapper>
            <Label {...channel} />
          </ChannelContainer>
        ))}
      </ChannelsContainer>
    </>
  );
};

export default Channels;
