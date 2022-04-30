import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getChannelList, searchChannelMemberList } from 'api/channelApi';
import { createWorkspace } from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import FileUploader from 'molecules/uploader/FileUploader';
import UserBadge from 'molecules/userBadge/UserBadge';
import UserInfo from 'molecules/userInfo/UserInfo';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentWorkspace, userLog } from 'recoil/atom';
import { colors } from 'shared/color';
import { addMemberType, channelMemberType } from 'types/channel/contentType';
import { userBadgeTypes } from 'types/common/userTypes';
import { workspaceModalType } from 'types/workspace/workspaceTypes';
import { UserInfoWrapper } from './MemberListModal';
import { Title } from './WorkspaceModal';

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
  background-color: ${colors.white};
  border-radius: 30px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const UserBox = styled.div<{ userList: channelMemberType[] }>`
  display: ${(props) => (props.userList.length === 0 ? 'none' : 'block')};
  position: absolute;
  top: 115px;
  width: 380px;
  background-color: rgba(255, 255, 255, 0.7);
  height: 30vh;
  overflow: scroll;
`;
const ButtonBox = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 32px auto 0;
`;

const UserBadgeWrapper = styled.div`
  margin-top: 10px;
`;
const AddMemberModal = ({ isOpen, onClose, channelId }: addMemberType) => {
  const [userList, setUserList] = useState<channelMemberType[]>([]);
  const [userBadgeList, setUserBadgeList] = useState<userBadgeTypes[]>([]);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserList = () => {
    const keyword = inputRef.current?.value!;
    if (keyword) setKeyword(keyword);
  };

  const userListApi = async (keyword: string) => {
    const response = await searchChannelMemberList(channelId, keyword);
    console.log(response);
    const data = response.data.channelMemberGetResponseDTOList;
    if (data) {
      setUserList(data);
    }
    console.log(data);
  };

  const createUserBadge = (name: string, email: string) => {
    setUserBadgeList([
      ...userBadgeList,
      {
        name,
        email,
        onDelete: deleteUserBadge,
      },
    ]);
    setUserList([]);
    inputRef.current!.value = '';
  };

  const deleteUserBadge = (email: string) => {
    setUserBadgeList(userBadgeList.filter((data) => data.email !== email));
  };

  useEffect(() => {
    userListApi(keyword);
  }, [keyword]);

  const registMember = () => {
    console.log('멤버 추가');
  };

  console.log(userList);
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Title>
          <Text size={18}>멤버 초대</Text>
        </Title>
        <InputBox
          label="멤버 추가"
          placeholder="사용자 이름을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        />
        <UserBox userList={userList}>
          {userList.map((user: channelMemberType) => (
            <UserInfoWrapper
              key={user.email}
              onClick={() => createUserBadge(user.name, user.email)}
            >
              <UserInfo name={user.name} email={user.email} />
            </UserInfoWrapper>
          ))}
        </UserBox>
        <UserBadgeWrapper>
          {userBadgeList.map((data) => {
            return (
              <UserBadge
                key={data.email}
                name={data.name}
                email={data.email}
                onDelete={data.onDelete}
              />
            );
          })}
        </UserBadgeWrapper>
        <ButtonBox>
          <Button
            width="125"
            height="35"
            text="취소"
            bgColor="gray300"
            onClick={onClose}
          />
          <Button width="125" height="35" text="추가" onClick={registMember} />
        </ButtonBox>
      </Container>
    </Modal>
  );
};

export default AddMemberModal;
