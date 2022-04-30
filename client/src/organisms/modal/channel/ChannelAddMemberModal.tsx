import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchNotChannelMemberList } from 'api/channelApi';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import UserBadge from 'molecules/userBadge/UserBadge';
import UserInfo from 'molecules/userInfo/UserInfo';
import { useEffect, useRef, useState } from 'react';
import { colors } from 'shared/color';
import { addMemberType, channelMemberType } from 'types/channel/contentType';
import { userBadgeTypes } from 'types/common/userTypes';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 80px;

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 600px;
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

const UserBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 15vh;
  overflow: scroll;
  margin-bottom: 10px;
`;

const ButtonBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  margin-left: auto;
`;

const UserBadgeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  height: 18vh;
  overflow: scroll;
`;

const BadgeBox = styled.div`
  margin: 5px;
`;

const UserInfoWrapper = styled.div`
  width: fit-content;
  padding: 10px;
  border-radius: 8px;

  cursor: pointer;
  &:hover {
    background-color: ${colors.gray50};
  }
`;

const ChannelAddMemberModal = ({
  isOpen,
  onClose,
  channelId,
}: addMemberType) => {
  const [userList, setUserList] = useState<channelMemberType[]>([]);
  const [userBadgeList, setUserBadgeList] = useState<userBadgeTypes[]>([]);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const searchUserList = () => {
    const keyword = inputRef.current?.value!;
    if (keyword) setKeyword(keyword);
  };

  const userListApi = async (keyword: string) => {
    const response = await searchNotChannelMemberList(channelId, keyword);
    console.log(response);
    const data = response.data.channelMemberGetResponseDTOList;
    if (data) {
      setUserList(
        data.filter((user: channelMemberType) =>
          userBadgeList.find((badge) => badge.email !== user.email)
        )
      );
    }
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
    if (channelId) userListApi(keyword);
  }, [keyword]);

  const registMember = () => {
    console.log('멤버 추가');
  };

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>멤버 초대</Text>
          <Icons icon="xMark" width="32" height="32" onClick={onClose} />
        </Header>
        <InputBox
          label="검색"
          placeholder="이름을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        />
        <UserBox>
          {userList.map((user: channelMemberType) => (
            <UserInfoWrapper
              key={user.email}
              onClick={() => createUserBadge(user.name, user.email)}
            >
              <UserInfo name={user.name} email={user.email} />
            </UserInfoWrapper>
          ))}
        </UserBox>
        <Label label="추가 멤버 목록" />
        <UserBadgeWrapper>
          {userBadgeList.map((data) => {
            return (
              <BadgeBox>
                <UserBadge
                  key={data.email}
                  name={data.name}
                  email={data.email}
                  onDelete={data.onDelete}
                />
              </BadgeBox>
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

export default ChannelAddMemberModal;
