import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';
import MenuTemplate from '../../atoms/sidemenu/MenuTemplate';
import { isOpenSide } from '../../recoil/atom';
import { labelType } from '../../types/common/labelType';

export const TopContainer = styled.div`
  display: flex;
  padding: 16px 18px 16px 18px;
  /* width: 280px; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChannelsContainer = styled.div`
  padding-left: 14px;
  padding-bottom: 18px;
`;

const ChannelContainer = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 8px;
  transition: 0.3s;
  cursor: pointer;
  /* 선택된 채널만 */
  &:nth-of-type(1) {
    background-color: ${(props) => props.theme.lightPointColor};
    border-radius: 10px 0 0 10px;
    border-right: 4px solid ${(props) => props.theme.pointColor};
  }

  &:hover {
    background-color: ${(props) => props.theme.lightPointColor};
    border-radius: 10px 0 0 10px;
    border-right: none;
  }
`;
export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = () => {
  const navigate = useNavigate();
  const dummyData: labelType[] = [
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
    <ChannelsContainer>
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
  );
};

export default Channels;
