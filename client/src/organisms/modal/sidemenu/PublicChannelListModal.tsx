import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getPublicChannelList, inviteChannelMember } from 'api/channelApi';
import { searchWorkspaceMemberList } from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import UserInfo from 'molecules/userInfo/UserInfo';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { currentChannelNum } from 'recoil/atom';
import { colors } from 'shared/color';
import { channelListTypes } from 'types/channel/contentType';
import {
  inviteMembersType,
  workspaceMemberListType,
  workspaceMemberType,
} from 'types/workspace/workspaceTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);

  ${(props) =>
    props.isOpen &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 350px;
  padding: 25px;
  background-color: ${colors.white};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ChannelBox = styled.div`
  height: 30vh;
  overflow: scroll;
`;

export const ChannelWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${colors.gray50};
  }
`;

const PublicChannelListModal = ({
  isOpen,
  onClose,
}: workspaceMemberListType) => {
  const [publicChannelList, setPublicChannelList] = useState([]);
  // const inputRef = useRef<HTMLInputElement>(null);
  const { workspaceId, channelId } = useParams();
  const setCurrentChannelMemberNum = useSetRecoilState(currentChannelNum);

  useEffect(() => {
    if (isOpen) {
      getPublicChannels();
    }
  }, [isOpen]);

  const getPublicChannels = useCallback(async () => {
    const { data } = await getPublicChannelList(workspaceId!);
    setPublicChannelList(data.channelGetResponseDTOList);
    console.log(data);
  }, [workspaceId]);

  const inviteUserApi = useCallback(
    async (body: inviteMembersType) => {
      await inviteChannelMember(channelId!, body);
      const newMember = body.emailList.length;
      setCurrentChannelMemberNum((prev) => prev + newMember);
      exitModal();
    },
    [channelId]
  );

  const registChannel = () => {
    const body = {
      // emailList: email,
    };
    // inviteUserApi(body);
  };

  const exitModal = () => {
    setPublicChannelList([]);
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>공개된 채널</Text>
          <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
        </Header>
        {/* <InputBox
          label="채널"
          placeholder="채널명을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        /> */}
        <ChannelBox>
          {publicChannelList.map((channel: channelListTypes) => (
            <ChannelWrapper key={channel.id}>
              <Text size={16}>{channel.name}</Text>
              <Button
                width="70"
                height="35"
                text="참가하기"
                onClick={registChannel}
              />
            </ChannelWrapper>
          ))}
        </ChannelBox>
      </Container>
    </Modal>
  );
};

export default PublicChannelListModal;
