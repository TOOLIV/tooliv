/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import Logo from '../../atoms/common/Logo';
import { useCallback, useEffect, useRef, useState } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  appThemeMode,
  channelContents,
  chatMember,
  currentWorkspace,
  DMList,
  dmMember,
  isTutorial,
  memberStatus,
  searchIndex,
  searchResults,
} from 'recoil/atom';
import { contentTypes } from 'types/channel/contentType';
import Avatar from 'atoms/profile/Avatar';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import UserDropdown from 'organisms/modal/user/UserDropdown';
import UserConfigModal from 'organisms/modal/user/UserConfigModal';
import { searchChat } from 'api/chatApi';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DMInfoType } from 'types/channel/chatTypes';
import {
  statusType,
  usersStatusType,
  userStatusInfoType,
} from 'types/common/userTypes';
import { getUserStatus } from 'api/userApi';
import { useInterval } from 'hooks/useInterval';
import { useDebounce } from 'hooks/useHooks';
import ResetPwdModal from 'organisms/modal/user/ResetPwdModal';
import Swal from 'sweetalert2';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';

const NavContainer = styled.div`
  padding: 0px 20px;
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  .text {
    margin-left: 40px;
    font-weight: 600;
    font-size: 16px;
  }
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MidContainer = styled.div`
  width: 430px;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  width: 100px;
  margin-left: 20px;
`;

const Search = styled.div`
  width: 40px;
  cursor: pointer;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 65px;
  justify-content: space-between;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  /* cursor: pointer; */
`;
const TextWrapper = styled.div`
  display: flex;
`;
const Nav = () => {
  const userInfo = useRecoilValue(user);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState(false);
  const [resetPwdOpen, setResetPwdOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dMList = useRecoilValue<DMInfoType[]>(DMList);
  const [dmMemberList, setDmMemberList] = useRecoilState<string[]>(dmMember);
  const chatMemberList = useRecoilValue<string[]>(chatMember);
  const setMembersStatus = useSetRecoilState<userStatusInfoType>(memberStatus);
  const [searchList, setSearchList] = useRecoilState<number[]>(searchResults);
  const [searchedIndex, setSearchedIndex] = useRecoilState<number>(searchIndex);
  const setCurrentWorkSpaceId = useSetRecoilState(currentWorkspace);
  const isTutorialOpen = useRecoilValue(isTutorial);

  const contents = useRecoilValue<contentTypes[]>(channelContents);

  const { channelId } = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const debouncedValue = useDebounce<string>(keyword, 500);
  const [isBulr, setIsBulr] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSearchList([]);
    if (contents) {
      setSearchedIndex(contents.length - 1);
    }
  }, []);

  useEffect(() => {
    setKeyword('');
    inputRef.current!.value = '';
  }, [channelId]);

  useEffect(() => {
    // dm 리스트에서 유저 이메일 뽑아서 저장
    let list: string[] = [];
    dMList.forEach((data: DMInfoType) => {
      list.push(data.receiverEmail);
    });
    setDmMemberList(list);
  }, [dMList]);

  useEffect(() => {
    let list = [...dmMemberList, ...chatMemberList];
    let emailList = Array.from(new Set(list));
    const body = {
      emailList,
    };
    handleUsersStatus(body);
  }, [dmMemberList, chatMemberList]);

  const handleUsersStatus = async (body: usersStatusType) => {
    const response = await getUserStatus(body);
    const data = response.data.statusResponseDTOList;
    let status: userStatusInfoType = {};

    data.forEach((value: statusType) => {
      status[value.email] = value.statusCode;
    });
    status[userInfo.email] = userInfo.statusCode;
    setMembersStatus(status);
  };

  useInterval(() => {
    let list = [...dmMemberList, ...chatMemberList];
    let emailList = Array.from(new Set(list));
    const body = {
      emailList,
    };
    handleUsersStatus(body);
  }, 30000);

  // 다크모드/일반모드 설정
  const handleDarkMode = () => {
    if (mode === 'dark') {
      setMode('light');
    } else {
      setMode('dark');
    }
  };

  // 모달 state 변경
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openProfileConfig = () => {
    setProfileConfigOpen(true);
  };
  const closeProfileConfig = () => {
    setProfileConfigOpen(false);
  };

  const openResetPwd = () => {
    setResetPwdOpen(true);
  };
  const closeResetPwd = () => {
    setResetPwdOpen(false);
  };

  // 모달창 밖 클릭시 close
  useEffect(() => {
    // 클릭 요소 체크
    const handleClickOutside = ({ target }: any) => {
      if (dropdownOpen && !dropdownRef.current?.contains(target)) {
        setDropdownOpen(false);
      }
    };

    // 클릭이벤트 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const search = useCallback(() => {
    const keyword = inputRef.current?.value!;
    setKeyword(keyword);
  }, []);

  useEffect(() => {
    if (debouncedValue === '') {
      setSearchList([]);
    }

    if (channelId && debouncedValue !== '') {
      searchChat(debouncedValue, channelId).then((res) => {
        const {
          data: { chatSearchInfoDTOList },
        } = res;

        setSearchList(
          chatSearchInfoDTOList.map((c: any) => {
            return Number(c.chatId);
          })
        );
        setSearchedIndex(chatSearchInfoDTOList.length - 1);
      });
    }
  }, [debouncedValue]);

  // 미팅 화면에서 로고 클릭시 alert 띄어줌.
  const clickLogo = () => {
    if (location.pathname.includes('meeting')) {
      setIsBulr(true);
      Swal.fire({
        title: '현재 미팅에 참여중입니다.',
        text: '홈으로 이동하면 참여중인 미팅을 떠납니다. 정말 나가시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
      }).then((result) => {
        if (result.isConfirmed) {
          handleNavigateMain();
        }
        setIsBulr(false);
      });
    } else {
      handleNavigateMain();
    }
  };

  const handleNavigateMain = () => {
    setCurrentWorkSpaceId('main');
    navigate('/main');
  };

  return (
    <NavContainer>
      {isBulr && <BulrContainer />}
      <LeftContainer onClick={clickLogo}>
        <Logo />
        <TextWrapper>
          <Text size={18} pointer color="secondary">
            TOO
          </Text>
          <Text size={18} pointer color="third">
            L
          </Text>
          <Text size={18} pointer color="primary">
            IV
          </Text>
        </TextWrapper>
      </LeftContainer>
      <SearchContainer>
        <MidContainer>
          <InputBox
            label=""
            placeholder="현재 채널 내 검색"
            ref={inputRef}
            onChange={search}
          />
        </MidContainer>
        <SearchButtonContainer>
          {searchList.length > 0 && searchedIndex !== 0 && (
            <Search onClick={() => setSearchedIndex((prev) => --prev)}>
              이전
            </Search>
          )}

          {searchList.length > 0 && searchedIndex !== searchList.length - 1 && (
            <Search onClick={() => setSearchedIndex((prev) => ++prev)}>
              다음
            </Search>
          )}
        </SearchButtonContainer>
      </SearchContainer>

      <RightContainer>
        <DarkModeSwitch
          checked={mode === 'dark'}
          onChange={handleDarkMode}
          size={25}
        />
        <DropdownWrapper ref={dropdownRef}>
          <AvatarWrapper
            onClick={
              isTutorialOpen ? undefined : () => setDropdownOpen(!dropdownOpen)
            }
          >
            <Avatar
              size="32"
              src={userInfo.profileImage}
              status={userInfo.statusCode}
            />
          </AvatarWrapper>
          <UserDropdown
            isOpen={dropdownOpen}
            onClose={closeDropdown}
            openProfileConfig={openProfileConfig}
            openResetPwd={openResetPwd}
          />
        </DropdownWrapper>
      </RightContainer>
      <UserConfigModal
        isOpen={profileConfigOpen}
        onClose={closeProfileConfig}
      />
      <ResetPwdModal isOpen={resetPwdOpen} onClose={closeResetPwd} />
    </NavContainer>
  );
};

export default Nav;
