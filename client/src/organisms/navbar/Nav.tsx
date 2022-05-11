/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import Logo from '../../atoms/common/Logo';
import { useEffect, useRef, useState } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  appThemeMode,
  channelNotiList,
  chatMember,
  DMList,
  dmMember,
  memberStatus,
  wsList,
} from 'recoil/atom';
import { channelNotiType } from 'types/channel/contentType';
import Avatar from 'atoms/profile/Avatar';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import UserDropdown from 'organisms/modal/user/UserDropdown';
import UserConfigModal from 'organisms/modal/user/UserConfigModal';
import { getChannels, getDMList } from 'api/chatApi';
import { useNavigate } from 'react-router-dom';
import { DMInfoType } from 'types/channel/chatTypes';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import { getWorkspaceList } from 'api/workspaceApi';
import {
  statusType,
  usersStatusType,
  userStatusInfoType,
} from 'types/common/userTypes';
import { getUserStatus } from 'api/userApi';
import { useInterval } from 'hooks/useInterval';

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
const MidContainer = styled.div`
  width: 430px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  width: 8vw;
  justify-content: space-between;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  /* cursor: pointer; */
`;
const Nav = () => {
  const userInfo = useRecoilValue(user);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const [dMList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const setWorkspaceList = useSetRecoilState<workspaceListType[]>(wsList);
  const [dmMemberList, setDmMemberList] = useRecoilState<string[]>(dmMember);
  const [chatMemberList, setChatMemberList] =
    useRecoilState<string[]>(chatMember);
  const [membersStatus, setMembersStatus] =
    useRecoilState<userStatusInfoType>(memberStatus);
  const navigate = useNavigate();

  const getSideInfo = async () => {
    const chaRes = await getChannels(userInfo.email);
    const dmRes = await getDMList(userInfo.email);
    const wsRes = await getWorkspaceList();

    const {
      data: { notificationChannelList },
    } = chaRes;
    const {
      data: { directInfoDTOList },
    } = dmRes;
    const {
      data: { workspaceGetResponseDTOList },
    } = wsRes;
    setDmList(directInfoDTOList);
    // setStatus()
    console.log(directInfoDTOList);

    setNotiList([...notificationChannelList, ...directInfoDTOList]);

    const notiWorkspace = notiList.filter((noti) => {
      if (!noti.notificationRead) {
        return noti;
      }
      return null;
    });
    const map = new Map(notiWorkspace.map((el) => [el.workspaceId, el]));
    const newWSList = workspaceGetResponseDTOList.map((dto: any) => {
      if (map.get(dto.id)) {
        return { ...dto, noti: false };
      } else {
        return { ...dto, noti: true };
      }
    });
    setWorkspaceList(newWSList);
  };

  useEffect(() => {
    setIsLoading(true);
    getSideInfo().then(() => {
      setIsLoading(false);
    });
  }, []);

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
    console.log(body);
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

  return (
    <NavContainer>
      <LeftContainer onClick={() => navigate('/')}>
        <Logo />
        <Text size={18} pointer>
          TOOLIV
        </Text>
      </LeftContainer>
      <MidContainer>
        <InputBox label="" placeholder="검색" />
      </MidContainer>
      <RightContainer>
        <DarkModeSwitch
          checked={mode === 'dark'}
          onChange={handleDarkMode}
          size={25}
        />
        <DropdownWrapper ref={dropdownRef}>
          <AvatarWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
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
          />
        </DropdownWrapper>
      </RightContainer>
      <UserConfigModal
        isOpen={profileConfigOpen}
        onClose={closeProfileConfig}
      />
    </NavContainer>
  );
};

export default Nav;
