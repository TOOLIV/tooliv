/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import Logo from '../../atoms/common/Logo';
import { useEffect, useRef, useState } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appThemeMode, channelContents, channelNotiList } from 'recoil/atom';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
import { connect } from 'services/wsconnect';
import Icons from 'atoms/common/Icons';
import Avatar from 'atoms/profile/Avatar';
import DarkModeToggle from 'react-dark-mode-toggle';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import UserDropdown from 'organisms/modal/user/UserDropdown';
import UserConfigModal from 'organisms/modal/user/UserConfigModal';
import { getChannels } from 'api/chatApi';

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
`;
const MidContainer = styled.div`
  width: 430px;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
`;
const Nav = () => {
  const { accessToken, email } = useRecoilValue(user);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileConfigOpen, setProfileConfigOpen] = useState(false);

  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
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

  const handleDarkMode = () => {
    if (mode === 'dark') {
      setMode('light');
    } else {
      setMode('dark');
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openProfileConfig = () => {
    setProfileConfigOpen(true);
  };
  const closeProfileConfig = () => {
    setProfileConfigOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: any) => {
    if (dropdownOpen && !dropdownRef.current?.contains(target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <NavContainer>
      <LeftContainer>
        <Logo />
        <Text size={18}>TOOLIV</Text>
      </LeftContainer>
      <MidContainer>
        <InputBox label="" placeholder="검색" />
      </MidContainer>
      <RightContainer>
        {/* <DarkModeToggle
          onChange={handleDarkMode}
          checked={mode === 'dark'}
          size={80}
        /> */}
        <DarkModeSwitch
          checked={mode === 'dark'}
          onChange={handleDarkMode}
          size={30}
        />
        <AvatarWrapper onClick={() => setDropdownOpen(!dropdownOpen)}>
          <Avatar size="32" />
        </AvatarWrapper>
      </RightContainer>
      <UserDropdown
        isOpen={dropdownOpen}
        onClose={closeDropdown}
        openProfileConfig={openProfileConfig}
        ref={dropdownRef}
      />
      <UserConfigModal
        isOpen={profileConfigOpen}
        onClose={closeProfileConfig}
      />
    </NavContainer>
  );
};

export default Nav;
