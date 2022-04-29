import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { colors } from 'shared/color';
import { channelsType } from 'types/channel/contentType';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';

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

const ChannelContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 8px;
  transition: 0.3s;
  cursor: pointer;
  /* 선택된 채널만 */
  background-color: ${(props) => props.isSelected && props.theme.pointColor};
  border-radius: ${(props) => props.isSelected && `10px 0 0 10px`};
  border-right: ${(props) =>
    props.isSelected && `4px solid ${props.theme.pointColor}`};
  ${(props) =>
    !props.isSelected &&
    css`
      &:hover {
        background-color: ${colors.lightPrimary};

        border-radius: 10px 0 0 10px;
        border-right: none;
      }
    `}
`;

export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const Channels = ({ channelList, onClick }: channelsType) => {
  const { channelId } = useParams();
  return (
    <ChannelsContainer>
      {channelList.map((channel) => (
        <ChannelContainer
          key={channel.id}
          onClick={() => onClick(channel.id)}
          isSelected={channel.id === channelId}
        >
          <SideWrapper>
            {channel.privateYn ? (
              <Icons icon="lock" />
            ) : (
              <Icons icon="public" />
            )}
          </SideWrapper>
          <Label {...channel} />
        </ChannelContainer>
      ))}
    </ChannelsContainer>
  );
};

export default Channels;
