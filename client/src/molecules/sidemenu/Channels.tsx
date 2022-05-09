import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ChannelExitModal from 'organisms/modal/channel/sidemenu/ChannelExitModal';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { channelNotiList } from 'recoil/atom';
import { colors } from 'shared/color';
import { channelNotiType, channelsType } from 'types/channel/contentType';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';

export const TopContainer = styled.div`
  display: flex;
  padding: 16px 0;
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

export const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const NotiWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChannelContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  padding: 0 16px 0 8px;
  width: 220px;
  transition: 0.3s;
  position: relative;
  cursor: pointer;
  box-sizing: content-box;
  background-color: ${(props) => props.isSelected && props.theme.hoverColor};
  border-radius: ${(props) => props.isSelected && `10px 0 0 10px`};
  border-right: ${(props) =>
    props.isSelected && `4px solid ${props.theme.darkPointColor}`};
  ${(props) =>
    css`
      &:hover {
        background-color: ${props.theme.hoverColor};
        border-radius: 10px 0 0 10px;
        border-right: 4px solid ${props.theme.hoverColor};
      }

      &:hover > div:last-child {
        display: block;
      }
    `}
`;

const HoverIcon = styled.div`
  display: none;
  position: relative;
`;

export const Noti = styled.div`
  font-size: 10px;
  color: ${colors.gray700};
`;

export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = ({ channelList, onClick }: channelsType) => {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { channelId } = useParams();
  const map = new Map(notiList.map((el) => [el.channelId, el]));
  return (
    <ChannelsContainer>
      {channelList.map((channel) => (
        <ChannelContainer
          key={channel.id}
          onClick={() => onClick(channel.id)}
          isSelected={channel.id === channelId}
        >
          <NotiWrapper>
            <InnerContainer>
              <SideWrapper>
                {channel.privateYn ? (
                  <Icons icon="lock" />
                ) : (
                  <Icons icon="public" />
                )}
              </SideWrapper>
              <Label
                {...channel}
                noti={map.get(channel.id)?.notificationRead}
              />
            </InnerContainer>
            {!map.get(channel.id)?.notificationRead && <Noti>●</Noti>}
          </NotiWrapper>
          <HoverIcon onClick={() => setExitModalOpen(!exitModalOpen)}>
            <Icons icon="menu" />
          </HoverIcon>
          <ChannelExitModal isOpen={exitModalOpen} />
        </ChannelContainer>
      ))}
    </ChannelsContainer>
  );
};

export default Channels;
