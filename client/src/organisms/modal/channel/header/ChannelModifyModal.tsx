import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { modifyChannel } from 'api/channelApi';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { modifyChannelName } from 'recoil/atom';
import { colors } from 'shared/color';
import { channelModifyModalType } from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 30px;
  left: 100px;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
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

const ButtonBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-left: auto;
`;

const ChannelModifyModal = ({
  isOpen,
  onClose,
  channelName,
}: channelModifyModalType) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { channelId } = useParams();
  const setModifyChannelName = useSetRecoilState(modifyChannelName);

  const onChange = () => {
    setName(inputRef.current?.value!);
  };
  const modChannelName = useCallback(async () => {
    try {
      const body = {
        id: channelId!,
        name,
      };
      await modifyChannel(body);
      setModifyChannelName(name);
      exitModal();
    } catch (error) {
      console.log(error);
    }
  }, [channelId, name]);

  const exitModal = () => {
    inputRef.current!.value = '';
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>채널 이름 변경</Text>
          <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
        </Header>
        <InputBox
          label="채널명"
          placeholder={channelName}
          ref={inputRef}
          onChange={onChange}
        />
        <ButtonBox>
          <Button
            width="85"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={exitModal}
          />
          <Button
            width="85"
            height="35"
            text="수정"
            disabled={inputRef.current?.value === ''}
            onClick={modChannelName}
          />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default ChannelModifyModal;
