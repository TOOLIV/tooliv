import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import { createWorkspace } from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import FileUploader from 'molecules/uploader/FileUploader';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentChannel, currentWorkspace, userLog } from 'recoil/atom';
import { colors } from 'shared/color';
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
  padding: 25px;
  background-color: ${colors.white};
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const WorkspaceModal = ({ isOpen, onClose }: workspaceModalType) => {
  const [file, setFile] = useState<File>();
  const inputWorkspaceRef = useRef<HTMLInputElement>(null);
  const setCurrentWorkspace = useSetRecoilState(currentWorkspace);
  const setCurrentChannel = useSetRecoilState(currentChannel);
  const [userLogList, setUserLogList] = useRecoilState(userLog);

  const handleSetImg = (file: FileList) => {
    setFile(file[0]);
  };

  const navigate = useNavigate();

  const registWorkspace = async () => {
    const formData = new FormData();
    const name = inputWorkspaceRef.current?.value!;

    formData.append('multipartFile', file!);
    formData.append(
      'registerWorkspaceRequestDTO',
      new Blob(
        [
          JSON.stringify({
            name,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );
    try {
      if (!name) {
        alert('워크스페이스명을 입력해주세요.');
        inputWorkspaceRef.current?.focus();
      }

      if (name) {
        const response = await createWorkspace(formData);
        console.log(response);
        const workspaceId = response.data.id;
        const channelList = await getChannelList(workspaceId);
        const channelId = channelList.data.channelGetResponseDTOList[0].id;
        // setIsWorkspaceCreate(true);
        // setIsChannelCreate(true);
        setCurrentWorkspace(workspaceId);
        setCurrentChannel(channelId);
        navigate(`${workspaceId}/${channelId}`);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Title>
          <Text size={18}>워크스페이스 생성</Text>
        </Title>
        <InputBox
          label="워크스페이스명"
          placeholder="워크스페이스명을 입력해주세요."
          ref={inputWorkspaceRef}
        />
        <FileUploader onChange={handleSetImg} />
        <ButtonBox>
          <Button
            width="125"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={onClose}
          />
          <Button
            width="125"
            height="35"
            text="생성"
            onClick={registWorkspace}
          />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceModal;
