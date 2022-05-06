import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchNotChannelMemberList } from 'api/channelApi';
import {
  inviteWorkspaceMember,
  searchNotWorkspaceMemberList,
} from 'api/workspaceApi';
import Button from 'atoms/common/Button';
import Icons from 'atoms/common/Icons';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';
import { useDebounce } from 'hooks/useHooks';
import InputBox from 'molecules/inputBox/InputBox';
import UserBadge from 'molecules/userBadge/UserBadge';
import UserInfo from 'molecules/userInfo/UserInfo';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentChannelNum } from 'recoil/atom';
import { colors } from 'shared/color';
import { userBadgeTypes } from 'types/common/userTypes';
import {
  addWorkspaceMemberType,
  inviteMembersBadgeType,
  inviteMembersType,
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
  width: 600px;
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
  display: flex;
  flex-wrap: wrap;
  height: 30vh;
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
  align-content: flex-start;
  flex-wrap: wrap;
  height: 18vh;
  overflow: scroll;
`;

const BadgeBox = styled.div`
  padding: 5px;
  height: fit-content;
`;

const UserInfoWrapper = styled.div`
  width: 50%;
  height: fit-content;
  padding: 10px;
  border-radius: 8px;
  overflow: hidden;
  word-break: nowrap;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const WorkspaceAddMemberModal = forwardRef<
  HTMLDivElement,
  addWorkspaceMemberType
>(({ isOpen, onClose }, ref) => {
  const [userList, setUserList] = useState<workspaceMemberType[]>([]);
  const [userBadgeList, setUserBadgeList] = useState<inviteMembersBadgeType[]>(
    []
  );
  const [inviteUserList, setInviteUserList] = useState<string[]>([]);
  const [keyword, setKeyword] = useState('');
  const debouncedValue = useDebounce<string>(keyword, 500);
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

  const setCurrentChannelMemberNum = useSetRecoilState(currentChannelNum);

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    console.log(keyword);
    setKeyword(keyword);
    setSequence(1);
    setEndCheck(false);
    setUserList([]);
  }, []);

  const userListApi = useCallback(
    async (keyword: string) => {
      if (!endCheckRef.current) {
        console.log('들어옴?');
        console.log(keyword);
        console.log(sequenceRef.current);
        const response = await searchNotWorkspaceMemberList(
          workspaceId!,
          keyword,
          sequenceRef.current
        );
        console.log(response);
        const data = response.data.workspaceMemberGetResponseDTOList;
        console.log(data);
        if (data.length === 0) {
          setIsLoaded(false);
          setEndCheck(true);
          return;
        }
        if (data) {
          const list = data.filter((user: workspaceMemberType) => {
            return userBadgeList.find((badge) => badge.email === user.email)
              ? false
              : true;
          });
          setUserList((prev) => [...prev, ...list]);
          setSequence((prev) => prev + 1);
        }
      }
    },
    [workspaceId, userBadgeList]
  );

  useEffect(() => {
    setUserList([]);
  }, [workspaceId, userListApi]);

  useEffect(() => {
    console.log(debouncedValue);
    userListApi(debouncedValue);
  }, [debouncedValue]);

  const deleteUserBadge = useCallback(
    (email: string) => {
      setUserBadgeList(userBadgeList.filter((data) => data.email !== email));
      setInviteUserList(inviteUserList.filter((data) => data !== email));
    },
    [userBadgeList, inviteUserList]
  );

  const createUserBadge = useCallback(
    (name: string, email: string) => {
      setUserBadgeList([
        ...userBadgeList,
        {
          name,
          email,
        },
      ]);
      setInviteUserList([...inviteUserList, email]);
    },
    [inviteUserList, userBadgeList]
  );

  const exitModal = useCallback(() => {
    inputRef.current!.value = '';
    setUserBadgeList([]);
    setInviteUserList([]);
    setUserList([]);
    onClose();
  }, [onClose]);

  const registMember = () => {
    const body = {
      emailList: inviteUserList,
    };
    inviteUserApi(body);
  };

  const inviteUserApi = useCallback(
    async (body: inviteMembersType) => {
      try {
        await inviteWorkspaceMember(workspaceId!, body);
        // const newMember = body.emailList.length;
        // setCurrentChannelMemberNum((prev) => prev + newMember);
        exitModal();
      } catch (error) {
        console.log(error);
      }
    },
    [workspaceId]
  );

  useEffect(() => {
    let observer: any;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await userListApi(debouncedValue);
      observer.observe(entry.target);
    }
  };

  return (
    <Modal isOpen={isOpen}>
      <Container ref={ref}>
        <Header>
          <Text size={18}>워크스페이스 멤버 초대</Text>
          <Icons icon="xMark" width="32" height="32" onClick={exitModal} />
        </Header>
        <InputBox
          label="검색"
          placeholder="이름을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        />
        <UserBox>
          {userList.map((user: workspaceMemberType) => (
            <UserInfoWrapper
              key={user.email}
              onClick={() => createUserBadge(user.name, user.email)}
            >
              <UserInfo
                name={user.name}
                email={user.email}
                nickname={user.nickname}
                profileImage={user.profileImage}
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
        <Label label="추가 멤버 목록" />
        <UserBadgeWrapper>
          {userBadgeList.map((data) => {
            return (
              <BadgeBox key={data.email}>
                <UserBadge
                  name={data.name}
                  email={data.email}
                  onDelete={deleteUserBadge}
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
            onClick={exitModal}
          />
          <Button width="125" height="35" text="추가" onClick={registMember} />
        </ButtonBox>
      </Container>
    </Modal>
  );
});

export default WorkspaceAddMemberModal;
