import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ChannelExitModal from 'organisms/modal/channel/sidemenu/ChannelExitModal';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { channelNotiList } from 'recoil/atom';
import { colors } from 'shared/color';
import { channelNotiType, channelsType } from 'types/channel/contentType';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';
import ChannelLabel from '../../atoms/label/Label';
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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ChannelContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 220px;
  height: 30px;
  padding: 0 16px 0 8px;
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

const ChannelsWrapper = styled.div`
  margin-bottom: 10px;
`;

export const Noti = styled.div`
  font-size: 10px;
  color: ${colors.gray700};
`;

export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = ({
  normalChannelList,
  videoChannelList,
  onClick,
}: channelsType) => {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [clickChannelId, setClickChannelId] = useState('');
  const exitModalRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { channelId } = useParams();
  const itemEls = useRef(new Array());
  const map = new Map(notiList.map((el) => [el.channelId, el]));

  useEffect(() => {
    console.log(itemEls);
  }, [itemEls]);
  const handleClickOutside = ({ target }: any) => {
    if (exitModalOpen && !exitModalRef.current?.contains(target)) {
      setExitModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [exitModalOpen]);

  const handleClickModal = (id: string) => {
    setClickChannelId(id);
    setExitModalOpen(true);
  };

  return (
    <ChannelsContainer ref={exitModalRef}>
      <ChannelsWrapper>
        <ChannelLabel label="일반 채널" />
        {normalChannelList.map((channel) => (
          <ChannelContainer
            key={channel.id}
            isSelected={channel.id === channelId}
          >
            <NotiWrapper onClick={() => onClick(channel.id)}>
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
            <HoverIcon ref={(element) => itemEls.current.push(element)}>
              <Icons icon="menu" onClick={() => handleClickModal(channel.id)} />
            </HoverIcon>
          </ChannelContainer>
        ))}
      </ChannelsWrapper>
      <ChannelsWrapper>
        <ChannelLabel label="화상 채널" />
        {videoChannelList.map((channel) => (
          <ChannelContainer
            key={channel.id}
            isSelected={channel.id === channelId}
          >
            <NotiWrapper onClick={() => onClick(channel.id)}>
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
            <HoverIcon ref={(element) => itemEls.current.push(element)}>
              <Icons icon="menu" onClick={() => handleClickModal(channel.id)} />
            </HoverIcon>
          </ChannelContainer>
        ))}
      </ChannelsWrapper>
      <ChannelExitModal isOpen={exitModalOpen} channelId={clickChannelId} />
    </ChannelsContainer>
  );
};

export default Channels;
