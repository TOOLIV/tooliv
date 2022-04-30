import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchWorkspaceMemberList } from 'api/workspaceApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import UserInfo from 'molecules/userInfo/UserInfo';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { colors } from 'shared/color';
import {
  channelMemberListType,
  channelMemberType,
} from 'types/channel/contentType';
import {
  workspaceMemberListType,
  workspaceMemberType,
} from 'types/workspace/workspaceTypes';

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

const UserBox = styled.div`
  height: 30vh;
  overflow: scroll;
`;

export const UserInfoWrapper = styled.div`
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.gray50};
  }
`;

const WorkspaceMemberListModal = ({
  isOpen,
  onClose,
}: workspaceMemberListType) => {
  const [workspaceMemberList, setWorkspaceMemberList] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { workspaceId } = useParams();

  const handleDirectMessage = (email: string) => {
    console.log(`${email}로 개인메시지 보내는 링크`);
  };

  const searchUserList = () => {
    const keyword = inputRef.current?.value!;
    handleSearchUser(keyword);
  };

  const handleSearchUser = async (keyword: string) => {
    const { data } = await searchWorkspaceMemberList(workspaceId!, keyword);
    setWorkspaceMemberList(data.workspaceMemberGetResponseDTOList);
    console.log(data);
  };

  useEffect(() => {
    console.log('들어옴?');
    handleSearchUser('');
  }, [workspaceId]);

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>워크스페이스 멤버</Text>
          <Icons icon="xMark" width="32" height="32" onClick={onClose} />
        </Header>
        <InputBox
          label="검색"
          placeholder="이름을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        />
        <UserBox>
          {workspaceMemberList.map((member: workspaceMemberType) => (
            <UserInfoWrapper
              key={member.email}
              onClick={() => handleDirectMessage(member.email)}
            >
              <UserInfo name={member.name} email={member.email} />
            </UserInfoWrapper>
          ))}
        </UserBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceMemberListModal;
