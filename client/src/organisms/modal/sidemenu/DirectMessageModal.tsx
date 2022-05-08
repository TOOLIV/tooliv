import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchChannelMemberList } from 'api/channelApi';
import { createDMRoom } from 'api/chatApi';
import { getUserList } from 'api/userApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { useDebounce } from 'hooks/useHooks';
import InputBox from 'molecules/inputBox/InputBox';
import UserInfo from 'molecules/userInfo/UserInfo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  channelMemberListType,
  channelMemberType,
} from 'types/channel/contentType';
import { userDirectMessageType } from 'types/common/userTypes';

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
  border: 1px solid ${(props) => props.theme.borderColor};
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
  height: 50vh;
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

const DirectMessageModal = ({ isOpen, onClose }: userDirectMessageType) => {
  const [channelMemberList, setChannelMemberList] = useState<
    channelMemberType[]
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

  const handleDirectMessage = (email: string) => {
    // console.log(`${email}로 개인메시지 보내는 링크`);
    createDMRoom(email).then((res) => {});
  };

  const searchChannelMember = useCallback(async (keyword: string) => {
    if (!endCheckRef.current) {
      try {
        const response = await getUserList(keyword, sequenceRef.current);
        const data = response.data.userInfoResponseDTOList;
        console.log(data);
        if (data.length === 0) {
          setIsLoaded(false);
          setEndCheck(true);
          return;
        }
        setChannelMemberList((prev) => [...prev, ...data]);
        setSequence((prev) => prev + 1);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setSearchKeyword(keyword);
  }, []);

  // useEffect(() => {
  //   if (isOpen) {
  //     inputRef.current!.value = '';
  //     searchChannelMember('');
  //   }
  // }, [isOpen, searchChannelMember]);

  const initModal = useCallback(() => {
    setSequence(1);
    setEndCheck(false);
    setChannelMemberList([]);
  }, []);

  useEffect(() => {
    // 키워드 입력시 초기화 (안할 경우 이전 데이터가 남아있어 오류)
    if (isOpen) {
      initModal();
      searchChannelMember(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    // 모달창 열리면 리스트 불러오는 api호출
    if (isOpen) {
      let observer: any;
      // 스크롤이 마지막에 도달할 경우
      if (target) {
        observer = new IntersectionObserver(onIntersect, {
          threshold: 0.2,
        });
        observer.observe(target);
      }
      return () => observer && observer.disconnect();
    }
    // 모달창 닫히면 검색 초기화
    else {
      initModal();
      inputRef.current!.value = '';
      setSearchKeyword('');
    }
  }, [target, isOpen, debouncedValue]);

  // 스크롤이 마지막에 도달시 호출되는 함수
  const onIntersect = async ([entry]: any, observer: any) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await searchChannelMember(debouncedValue);
      observer.observe(entry.target);
    }
  };
  return (
    <Modal isOpen={isOpen}>
      <Container>
        <Header>
          <Text size={18}>개인메시지</Text>
          <Icons icon="xMark" width="32" height="32" onClick={onClose} />
        </Header>
        <InputBox
          label="검색"
          placeholder="이름을 입력해주세요."
          ref={inputRef}
          onChange={searchUserList}
        />
        <UserBox>
          {channelMemberList.map((member: channelMemberType) => (
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

export default DirectMessageModal;
