import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { createChannel } from 'api/channelApi';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import ChannelRadio from 'molecules/radio/channelRadio/ChannelRadio';
import VisibilityRadio from 'molecules/radio/visibiltyRadio/VisibilityRadio';
import React, { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { channelNotiList, currentChannel } from 'recoil/atom';
import { sub, unsub } from 'services/wsconnect';
import { colors } from 'shared/color';
import { channelNotiType } from 'types/channel/contentType';
import { workspaceModalType } from 'types/workspace/workspaceTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  width: 430px;
  padding: 25px 50px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 16px;
`;

const RadioBtn = styled.div`
  margin-top: 16px;
`;
const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 32px auto 0;
`;

const ChannelModal = ({ isOpen, onClose }: workspaceModalType) => {
  const inputChannelRef = useRef<HTMLInputElement>(null);
  const [channelCode, setChannelCode] = useState('CHAT');
  const [privateYn, setPrivateYn] = useState(false);
  const setCurrentChannelId = useSetRecoilState(currentChannel);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const registChannel = async () => {
    const name = inputChannelRef.current?.value!;

    try {
      if (!name) {
        alert('채널명을 입력해주세요.');
        inputChannelRef.current?.focus();
      }

      if (name) {
        const body = {
          name,
          privateYn,
          channelCode,
          description: 'test',
          workspaceId: workspaceId!,
        };
        const response = await createChannel(body);
        console.log(response);
        const channelId = response.data.id;
        setCurrentChannelId(channelId);
        setNotiList([
          ...notiList,
          { channelId, workspaceId, notificationRead: false },
        ]);
        // 구독 풀고
        unsub();
        // 다시 구독 (바로 메시지 전송할 수 있게)
        sub();
        navigate(`${workspaceId}/${channelId}`);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChannelCode = (value: string) => {
    setChannelCode(value);
  };
  const handleVisibility = (value: boolean) => {
    setPrivateYn(value);
  };

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Title>
          <Text size={18}>채널 생성</Text>
        </Title>
        <InputBox
          label="채널명"
          placeholder="채널명을 입력해주세요."
          ref={inputChannelRef}
        />
        <RadioBtn>
          <ChannelRadio value={channelCode} onChange={handleChannelCode} />
        </RadioBtn>
        <RadioBtn>
          <VisibilityRadio value={privateYn} onChange={handleVisibility} />
        </RadioBtn>
        <ButtonBox>
          <Button
            width="160"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={onClose}
          />
          <Button width="160" height="35" text="생성" onClick={registChannel} />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default ChannelModal;
