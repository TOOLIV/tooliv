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
  width: 450px;
  padding: 25px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 30px;
  border: 1px solid ${(props) => props.theme.borderColor};
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
  height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;
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
  const [workspaceMemberList, setWorkspaceMemberList] = useState<
    workspaceMemberType[]
  >([]);
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
    // console.log(`${email}??? ??????????????? ????????? ??????`);
  };

  const handleSearchUser = useCallback(
    async (keyword: string) => {
      if (!endCheckRef.current) {
        const response = await searchWorkspaceMemberList(
          workspaceId!,
          keyword,
          sequenceRef.current
        );
        const data = response.data.workspaceMemberGetResponseDTOList;

        if (data.length === 0) {
          setIsLoaded(false);
          setEndCheck(true);
          return;
        }
        setWorkspaceMemberList((prev) => [...prev, ...data]);
        setSequence((prev) => prev + 1);
      }
    },

    [workspaceId]
  );

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setSearchKeyword(keyword);
  }, []);

  // useEffect(() => {
  //   if (isOpen) {
  //     handleSearchUser('');
  //   }
  // }, [isOpen, handleSearchUser]);

  useEffect(() => {
    if (workspaceId && isOpen) {
      initModal();
      handleSearchUser(debouncedValue);
    }
  }, [debouncedValue]);

  const exitModal = () => {
    inputRef.current!.value = '';
    setWorkspaceMemberList([]);
    onClose();
  };

  const initModal = useCallback(() => {
    setSequence(1);
    setEndCheck(false);
    setWorkspaceMemberList([]);
  }, []);

  useEffect(() => {
    // ????????? ????????? ????????? (?????? ?????? ?????? ???????????? ???????????? ??????)
    if (isOpen) {
      initModal();
      handleSearchUser(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    // ????????? ????????? ????????? ???????????? api??????
    if (isOpen) {
      let observer: any;
      // ???????????? ???????????? ????????? ??????
      if (target) {
        observer = new IntersectionObserver(onIntersect, {
          threshold: 0.2,
        });
        observer.observe(target);
      }
      return () => observer && observer.disconnect();
    }
    // ????????? ????????? ?????? ?????????
    else {
      initModal();
      inputRef.current!.value = '';
      setSearchKeyword('');
    }
  }, [target, isOpen, debouncedValue]);

  // ???????????? ???????????? ????????? ???????????? ??????
  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await handleSearchUser(debouncedValue);
      observer.observe(entry.target);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>?????????????????? ??????</Text>
          <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
        </Header>
        <InputBox
          label="??????"
          placeholder="????????? ??????????????????."
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
                statusCode={member.statusCode}
              />
            </UserInfoWrapper>
          ))}
          <div
            ref={setTarget}
            style={{
              width: '100vw',
              height: '5px',
            }}
          ></div>
        </UserBox>
      </Container>
    </Modal>
  );
};

export default WorkspaceMemberListModal;
