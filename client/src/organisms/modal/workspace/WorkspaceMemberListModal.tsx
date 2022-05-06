import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchWorkspaceMemberList } from 'api/workspaceApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { useDebounce } from 'hooks/useHooks';
import InputBox from 'molecules/inputBox/InputBox';
import UserInfo from 'molecules/userInfo/UserInfo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
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
  background-color: ${(props) => props.theme.bgColor};
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
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const WorkspaceMemberListModal = ({
  isOpen,
  onClose,
}: workspaceMemberListType) => {
  const [workspaceMemberList, setWorkspaceMemberList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce<string>(searchKeyword, 500);
  const [sequence, setSequence] = useState(1);
  const [target, setTarget] = useState<any>(null);
  const [endCheck, setEndCheck] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const sequenceRef = useRef(sequence);
  sequenceRef.current = sequence;

  const endCheckRef = useRef(endCheck);
  endCheckRef.current = endCheck;
  const inputRef = useRef<HTMLInputElement>(null);
  const { workspaceId } = useParams();

  const handleDirectMessage = (email: string) => {
    console.log(`${email}로 개인메시지 보내는 링크`);
  };

  const handleSearchUser = useCallback(
    async (keyword: string) => {
      const { data } = await searchWorkspaceMemberList(
        workspaceId!,
        keyword,
        sequenceRef.current
      );
      setWorkspaceMemberList(data.workspaceMemberGetResponseDTOList);
      console.log(data);
    },
    [workspaceId]
  );

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setSearchKeyword(keyword);
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleSearchUser('');
    }
  }, [isOpen, handleSearchUser]);

  useEffect(() => {
    console.log(debouncedValue);
    handleSearchUser(debouncedValue);
  }, [debouncedValue]);

  const exitModal = () => {
    inputRef.current!.value = '';
    setWorkspaceMemberList([]);
    onClose();
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>워크스페이스 멤버</Text>
          <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
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
              <UserInfo
                name={member.name}
                email={member.email}
                nickname={member.nickname}
                profileImage={member.profileImage}
              />
            </UserInfoWrapper>
          ))}
        </UserBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceMemberListModal;
