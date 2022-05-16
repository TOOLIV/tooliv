import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { searchChannelMemberList } from 'api/channelApi';
import { createDMRoom } from 'api/chatApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { useDebounce } from 'hooks/useHooks';
import InputBox from 'molecules/inputBox/InputBox';
import UserInfo from 'molecules/userInfo/UserInfo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DMList, dmName } from 'recoil/atom';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { DMInfoType } from 'types/channel/chatTypes';
import {
  channelMemberListType,
  channelMemberType,
} from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 140px;
  z-index: 1;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
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

const ChannelMemberListModal = ({
  isOpen,
  onClick,
  onClose,
}: channelMemberListType) => {
  const [dmList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const [channelMemberList, setChannelMemberList] = useState<
    channelMemberType[]
  >([]);
  const setDirectName = useSetRecoilState<string>(dmName);
  const userInfo = useRecoilValue(user);
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce<string>(searchKeyword, 500);
  const [sequence, setSequence] = useState(1);
  const [target, setTarget] = useState<any>(null);
  const [endCheck, setEndCheck] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const sequenceRef = useRef(sequence);
  sequenceRef.current = sequence;

  const endCheckRef = useRef(endCheck);
  endCheckRef.current = endCheck;
  const inputRef = useRef<HTMLInputElement>(null);

  const { workspaceId, channelId } = useParams();

  const handleDirectMessage = (member: channelMemberType) => {
    let flag = true;

    dmList.forEach((dm) => {
      if (dm.receiverEmail === member.email) {
        navigate(`/direct/${workspaceId}/${dm.channelId}`);
        console.log(member);
        setDirectName(member.nickname);
        flag = false;
      }
    });
    if (flag) {
      createDMRoom(member.email).then((res) => {
        const {
          data: { roomId },
        } = res;

        setDmList([
          ...dmList,
          {
            receiveName: member.name,
            channelId: roomId,
            notificationRead: false,
            statusCode: member.statusCode,
            profileImage: member.profileImage,
            receiverEmail: member.email,
            senderEmail: userInfo.email,
          },
        ]);
        setDirectName(member.name);
        navigate(`/direct/${workspaceId}/${roomId}`);
      });
    }
  };

  const searchChannelMember = useCallback(
    async (keyword: string) => {
      if (!endCheckRef.current) {
        try {
          const response = await searchChannelMemberList(
            channelId!,
            keyword,
            sequenceRef.current
          );
          const data = response.data.channelMemberGetResponseDTOList;
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
    },
    [channelId, sequence]
  );

  const searchUserList = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setSearchKeyword(keyword);
  }, []);

  const handleAddMemberClick = () => {
    onClose();
    onClick();
  };

  const initModal = useCallback(() => {
    setSequence(1);
    setEndCheck(false);
    setChannelMemberList([]);
  }, []);

  useEffect(() => {
    // 키워드 입력시 초기화 (안할 경우 이전 데이터가 남아있어 오류)
    if (channelId && isOpen) {
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
          <Text size={18}>채널 멤버</Text>
          <Icons
            icon="addPerson"
            width="32"
            height="32"
            onClick={handleAddMemberClick}
          />
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
              onClick={() => handleDirectMessage(member)}
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

export default ChannelMemberListModal;
