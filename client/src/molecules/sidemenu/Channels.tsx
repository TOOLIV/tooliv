import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import ChannelExitModal from 'organisms/modal/channel/sidemenu/ChannelExitModal';
import { createRef, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelNotiList, isTutorial } from 'recoil/atom';
import { colors } from 'shared/color';
import { channelNotiType, channelsType } from 'types/channel/contentType';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';
import ChannelLabel from '../../atoms/label/Label';
import { toast } from 'react-toastify';
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
  color: ${(props) => props.theme.notiColor};
`;

export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = ({
  normalChannelList,
  videoChannelList,
  onClick,
  listNum,
}: channelsType) => {
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [clickChannelId, setClickChannelId] = useState('');
  const exitModalRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { channelId } = useParams();
  const map = new Map(notiList.map((el) => [el.channelId, el]));
  const refArray = useRef<HTMLDivElement[]>([]);
  const isTutorialOpen = useRecoilValue(isTutorial);

  const handleClickModal = (id: string, index: number) => {
    setClickChannelId(id);
    setExitModalOpen(true);
    setTop(refArray.current[index].getBoundingClientRect().top - 70);
    setLeft(refArray.current[index].getBoundingClientRect().left + 40);
  };

  return (
    <ChannelsContainer>
      <ChannelsWrapper>
        <ChannelLabel label="일반 채널" />
        {isTutorialOpen ? (
          <ChannelContainer isSelected={false}>
            <NotiWrapper onClick={() => {}}>
              <InnerContainer>
                <SideWrapper>
                  <Icons icon="public" />
                </SideWrapper>
                <Text size={12}>일반 채팅방</Text>
                {/* <Label {...channel} /> */}
              </InnerContainer>
            </NotiWrapper>
            <HoverIcon onClick={() => {}}>
              <Icons icon="menu" />
            </HoverIcon>
          </ChannelContainer>
        ) : (
          normalChannelList.map((channel, i) => (
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
                {map.get(channel.id)?.notificationRead && <Noti>●</Noti>}
              </NotiWrapper>
              <HoverIcon
                onClick={
                  i !== 0
                    ? () => handleClickModal(channel.id, i)
                    : () => toast.error('해당 채널은 나갈 수 없습니다.')
                }
                ref={(ref) => {
                  if (ref !== null) refArray.current[i] = ref; // took this from your guide's example.
                }}
              >
                <Icons icon="menu" />
              </HoverIcon>
            </ChannelContainer>
          ))
        )}
      </ChannelsWrapper>
      <ChannelsWrapper>
        <ChannelLabel label="화상 채널" />
        {videoChannelList.map((channel, i) => (
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
              {map.get(channel.id)?.notificationRead && <Noti>●</Noti>}
            </NotiWrapper>
            <HoverIcon
              onClick={() => handleClickModal(channel.id, i + listNum)}
              ref={(ref) => {
                if (ref !== null) refArray.current[i + listNum] = ref; // took this from your guide's example.
              }}
            >
              <Icons icon="menu" />
            </HoverIcon>
          </ChannelContainer>
        ))}
      </ChannelsWrapper>
      <ChannelExitModal
        isOpen={exitModalOpen}
        onClose={() => setExitModalOpen(false)}
        channelId={clickChannelId}
        top={top}
        left={left}
      />
    </ChannelsContainer>
  );
};

export default Channels;
