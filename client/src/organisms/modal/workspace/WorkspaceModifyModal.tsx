import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getChannelList } from 'api/channelApi';
import { createWorkspace, modifyWorkspace } from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import FileUploader from 'molecules/uploader/FileUploader';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentChannel,
  currentWorkspace,
  modifyWorkspaceName,
  userLog,
} from 'recoil/atom';
import { colors } from 'shared/color';
import {
  workspaceModalType,
  workspaceModifyModalType,
} from 'types/workspace/workspaceTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.7);
  /* display: flex;
  justify-content: center;
  align-items: center; */
  ${(props) =>
    props.isOpen &&
    css`
      /* display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0); */
      display: flex;
      justify-content: center;
      align-items: center;
    `}
`;

const Container = styled.div`
  width: 430px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.div`
  margin: 0 auto;
  margin-bottom: 16px;
`;

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
`;

const WorkspaceModifyModal = ({
  isOpen,
  onClose,
  workspaceName,
  thumbnailImage,
}: workspaceModifyModalType) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File>();
  const inputWorkspaceRef = useRef<HTMLInputElement>(null);
  const setModifyWorkspaceName = useSetRecoilState(modifyWorkspaceName);

  const onChange = () => {
    setName(inputWorkspaceRef.current?.value!);
  };

  const handleSetImg = (file: FileList) => {
    setFile(file[0]);
  };
  const { workspaceId } = useParams();
  const modWorkspace = async () => {
    const formData = new FormData();
    const id = workspaceId;
    formData.append('multipartFile', file!);
    formData.append(
      'modifyWorkspaceRequestDTO',
      new Blob(
        [
          JSON.stringify({
            id,
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
        const response = await modifyWorkspace(formData);
        console.log(response);
        setModifyWorkspaceName(name);
        // const workspaceId = response.data.id;
        // const channelList = await getChannelList(workspaceId);
        // const channelId = channelList.data.channelGetResponseDTOList[0].id;
        // setCurrentWorkspace(workspaceId);
        // setCurrentChannel(channelId);
        // setUserLogList({
        //   ...userLogList,
        //   [workspaceId]: channelId,
        // });
        // navigate(`${workspaceId}/${channelId}`);
        inputWorkspaceRef.current!.value = '';
        setFile(undefined);
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
          <Text size={18}>워크스페이스 수정</Text>
        </Title>
        <InputBox
          label="워크스페이스명"
          placeholder={workspaceName}
          ref={inputWorkspaceRef}
          onChange={onChange}
        />
        <FileUploader
          file={file!}
          onChange={handleSetImg}
          thumbnailImage={thumbnailImage}
        />
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
            text="수정"
            onClick={modWorkspace}
            disabled={inputWorkspaceRef.current?.value === ''}
          />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceModifyModal;