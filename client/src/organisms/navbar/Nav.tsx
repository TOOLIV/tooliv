/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import Logo from '../../atoms/common/Logo';
import { useEffect, useRef, useState } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appThemeMode, channelContents, channelNotiList } from 'recoil/atom';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
import { connect } from 'services/wsconnect';
import Avatar from 'atoms/profile/Avatar';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import UserDropdown from 'organisms/modal/user/UserDropdown';
import UserConfigModal from 'organisms/modal/user/UserConfigModal';
import { getChannels } from 'api/chatApi';
import { useNavigate } from 'react-router-dom';

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
  const { accessToken, email } = useRecoilValue(user);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userInfo = useRecoilValue(user);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);

  const navigate = useNavigate();
  useEffect(() => {
    getChannels(email).then((res) => {
      const {
        data: { notificationChannelList },
      } = res;
      console.log(notificationChannelList);
      setNotiList(notificationChannelList);
      connect(accessToken, setContents, notificationChannelList, setNotiList);
    });
  }, []);

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
            <Avatar size="42" src={userInfo.profileImage} />
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
