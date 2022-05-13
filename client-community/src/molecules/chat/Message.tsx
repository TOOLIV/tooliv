import styled from '@emotion/styled';
import { getUserInfo } from 'api/userApi';
import Time from 'atoms/chat/Time';
import UpdateChatModal from 'organisms/modal/channel/chat/UpdateChatModal';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { fDateTime, fToNow } from 'utils/formatTime';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { user } from 'recoil/auth';
import { deleteChat, deleteDM } from 'services/wsconnect';
import Label from '../../atoms/common/Label';
import Avatar from '../../atoms/profile/Avatar';
import { colors } from '../../shared/color';
import { contentTypes } from '../../types/channel/contentType';
import { SideWrapper } from '../sidemenu/Channels';
import File from './File';
import mainSrc from '../../assets/img/logo.svg';
import { memberStatus, searchIndex, searchResults } from 'recoil/atom';

const Container = styled.div<{ isSearched?: boolean }>`
  width: 100%;
  border-radius: 10px;
  /* border: 1px solid ${colors.gray200}; */
  border: 1px solid ${(props) => props.theme.borderColor};
  border: ${(props) =>
    props.isSearched && `3px solid ${props.theme.pointColor}`};
  padding: 16px;
  margin: 16px 0;
  transition: 0.3s;
  &:hover {
    background-color: ${colors.lightGray};
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  padding: 16px;
  padding-left: 30px;
  line-height: 1.2;
  color: ${(props) => props.theme.textColor};
  display: flex;
`;

const Img = styled.img`
  max-width: 300px;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
`;

const Message = forwardRef<HTMLDivElement, contentTypes>(
  (
    {
      channelId,
      chatId,
      sendTime,
      contents,
      deleted,
      updated,
      type,
      files,
      email,
      originFiles,
      isSearched,
    },
    ref
  ) => {
    const [thumbnailImage, setThumbnailImage] = useState('');
    const [isUpdatModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [nickname, setNickname] = useState('');
    const membersStatus = useRecoilValue(memberStatus);
    const userInfo = useRecoilValue(user);
    const fileTypes = ['.bmp', '.gif', '.jpg', '.png', '.jpeg', '.jfif'];
    const location = useLocation();

    const checkType = (file: string) => {
      const fileLen = file.length;
      const lastDot = file.lastIndexOf('.');
      const fileExt = file.substring(lastDot, fileLen).toLowerCase();
      if (fileTypes.includes(fileExt)) {
        return true;
      } else {
        return false;
      }
    };

    useEffect(() => {
      getUserProfile();
    }, [email]);

    const getUserProfile = async () => {
      if (type === 'home') {
        setThumbnailImage(mainSrc);
        setNickname('TOOLIV');
      } else {
        const response = await getUserInfo(email);
        setThumbnailImage(response.data.profileImage);
        setNickname(response.data.nickname);
      }
    };

    const deleteMessage = () => {
      if (location.pathname.includes('/direct')) {
        deleteDM(channelId, chatId);
      } else {
        deleteChat(channelId, chatId);
      }
    };
    const handelModal = () => {
      setIsUpdateModalOpen((prev) => !prev);
    };
    return (
      <>
        <Container isSearched={isSearched} ref={ref}>
          <ProfileContainer>
            <LeftWrapper>
              <SideWrapper>
                <Avatar
                  src={thumbnailImage}
                  status={membersStatus[email]}
                  size="32"
                />
              </SideWrapper>
              <SideWrapper>
                <Label name={nickname} size="16px" />
              </SideWrapper>
              {sendTime && <Time time={sendTime} />}
            </LeftWrapper>
            {email === userInfo.email && !deleted && (
              <SideWrapper>
                <RightWrapper onClick={deleteMessage}>
                  {/* <div onClick={handelModal}>수정</div> */}
                  {/* <Icons icon="delete" color="gray500" onClick={deleteMessage} /> */}
                  <svg
                    fill={colors.gray500}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                  </svg>
                </RightWrapper>
              </SideWrapper>
            )}
          </ProfileContainer>
          {deleted ? (
            <ContentContainer>(삭제된 메시지)</ContentContainer>
          ) : (
            <ContentContainer
              dangerouslySetInnerHTML={{ __html: contents }}
            ></ContentContainer>
          )}
          {files && originFiles && files.length > 0 && (
            <ContentContainer>
              {files.map((file, i) =>
                checkType(file) ? (
                  <Img key={file} src={file}></Img>
                ) : (
                  <File key={file} name={originFiles[i]} url={file} />
                )
              )}
            </ContentContainer>
          )}
        </Container>
        <UpdateChatModal
          isOpen={isUpdatModalOpen}
          onClose={handelModal}
          contents={contents}
          channelId={channelId}
          chatId={chatId}
          email={email}
        />
      </>
    );
  }
);
export default Message;
