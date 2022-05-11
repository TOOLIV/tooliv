/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import Logo from '../../atoms/common/Logo';
import { useEffect, useRef, useState } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  appThemeMode,
  channelContents,
  channelNotiList,
  DMList,
  stompClient,
  wsList,
} from 'recoil/atom';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
import { connect } from 'services/wsconnect';
import Avatar from 'atoms/profile/Avatar';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import UserDropdown from 'organisms/modal/user/UserDropdown';
import UserConfigModal from 'organisms/modal/user/UserConfigModal';
import { getChannels, getDMList } from 'api/chatApi';
import { useNavigate } from 'react-router-dom';
import { DMInfoType } from 'types/channel/chatTypes';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import { getWorkspaceList } from 'api/workspaceApi';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setRecoil } from 'recoil-nexus';

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
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  const [dmList, setDmList] = useRecoilState<DMInfoType[]>(DMList);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workspaceList, setWorkspaceList] =
    useRecoilState<workspaceListType[]>(wsList);
  // const [client, setClient] = useRecoilState<Stomp.Client | null>(stompClient);
  // const [notiList, setNotiList] = useRecoilState<channelNotiType[]>(channelNotiList);
  const navigate = useNavigate();
  // const baseURL = localStorage.getItem('baseURL');
  // let sockJS = baseURL
  //   ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  //   : // 로컬에서 테스트시 REACT_APP_TEST_URL, server 주소는 REACT_APP_BASE_SERVER_URL
  //     new SockJS(`${process.env.REACT_APP_TEST_URL}/chatting`);

  // let client: Stomp.Client = Stomp.over(sockJS);

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

  // useEffect(() => {
  //   // if (!isLoading) {
  //   //   const baseURL = localStorage.getItem('baseURL');
  //   //   let sockJS = baseURL
  //   //     ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  //   //     : // 로컬에서 테스트시 REACT_APP_TEST_URL, server 주소는 REACT_APP_BASE_SERVER_URL
  //   //       new SockJS(`${process.env.REACT_APP_TEST_URL}/chatting`);

  //   //   let client: Stomp.Client = Stomp.over(sockJS);
  //     // setClient(client);
  //     // client.connect(
  //     //   {
  //     //     Authorization: `Bearer ${userInfo.accessToken}`,
  //     //   },
  //     //   (frame) => {
  //     //     console.log('Connect success');
  //     //   },
  //     //   (frame) => {
  //     //     console.log('connect error');
  //     //   }
  //     // );
  //     // connect(userInfo.accessToken, setContents, userInfo.userId);
  //   }
  // }, [isLoading]);

  // useEffect(() => {
  // if (!isLoading) {
  // const baseURL = localStorage.getItem('baseURL');
  // let sockJS = baseURL
  //   ? new SockJS(`${JSON.parse(baseURL).url}/chatting`)
  //   : // 로컬에서 테스트시 REACT_APP_TEST_URL, server 주소는 REACT_APP_BASE_SERVER_URL
  //     new SockJS(`${process.env.REACT_APP_TEST_URL}/chatting`);
  // let client: Stomp.Client = Stomp.over(sockJS);
  //   if (client) {
  //     client.connect(
  //       {
  //         Authorization: `Bearer ${userInfo.accessToken}`,
  //       },
  //       (frame) => {
  //         client.subscribe(`/sub/chat/${userInfo.userId}`, (response) => {
  //           // const notiList = getRecoil(channelNotiList);
  //           // const workspaceList = getRecoil(wsList);
  //           const link = window.location.href.split('/');
  //           // 현재 채널, 워크스페이스 아이디
  //           const channelId = link[link.length - 1];
  //           const workspaceId = link[link.length - 2];
  //           const content = JSON.parse(response.body);
  //           const recChannelId = content.channelId;
  //           let updateWorkspaceId: string = '';
  //           const type = content.type;
  //           if (type === 'DELETE') {
  //             const index = content.chatId;
  //             setContents((prev) => [
  //               ...prev.slice(0, index),
  //               content,
  //               ...prev.slice(index + 1),
  //             ]);
  //           } else if (type === 'UPDATE') {
  //           } else {
  //             if (channelId === recChannelId) {
  //               // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 같으면
  //               setContents((prev) => [...prev, content]);
  //             } else {
  //               // 현재 채널 아이디와 도착한 메시지의 채널 아이디가 다르면
  //               const newList: channelNotiType[] = notiList.map((noti) => {
  //                 if (
  //                   noti.workspaceId !== channelId &&
  //                   noti.channelId === recChannelId
  //                 ) {
  //                   updateWorkspaceId = noti.workspaceId!;
  //                   return { ...noti, notificationRead: false };
  //                 } else {
  //                   return noti;
  //                 }
  //               });
  //               // setRecoil(channelNotiList, newList);
  //               setNotiList(newList);
  //               if (workspaceId !== updateWorkspaceId) {
  //                 const newWSList: workspaceListType[] = workspaceList.map(
  //                   (workspace) => {
  //                     if (
  //                       workspace.id !== workspaceId &&
  //                       workspace.id === updateWorkspaceId
  //                     ) {
  //                       return { ...workspace, noti: false };
  //                     } else {
  //                       return workspace;
  //                     }
  //                   }
  //                 );
  //                 setRecoil(wsList, newWSList);
  //               }
  //             }
  //           }
  //         });
  //       },
  //       (frame) => {
  //         console.log('connect error');
  //       }
  //     );
  //   }
  //   // }
  // }, [client]);

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
