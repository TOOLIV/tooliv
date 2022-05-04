/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import InputBox from 'molecules/inputBox/InputBox';
import { useNavigate } from 'react-router-dom';
import Logo from '../../atoms/common/Logo';
import { useEffect } from 'react';
import { user } from 'recoil/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appThemeMode, channelContents, channelNotiList } from 'recoil/atom';
import { channelNotiType, contentTypes } from 'types/channel/contentType';
import { connect } from 'services/wsconnect';
import Icons from 'atoms/common/Icons';
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
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;
`;
const InputContainer = styled.div`
  width: 430px;
`;
const Nav = () => {
  const navigate = useNavigate();
  const { accessToken, email } = useRecoilValue(user);
  const [contents, setContents] =
    useRecoilState<contentTypes[]>(channelContents);
  const [mode, setMode] = useRecoilState(appThemeMode);
  const [notiList, setNotiList] =
    useRecoilState<channelNotiType[]>(channelNotiList);
  useEffect(() => {
    getChannels(email).then((res) => {
      const {
        data: { notificationChannelList },
      } = res;
      const newList = notificationChannelList.map((channel: string) => {
        return { id: channel, readYn: true };
      });
      setNotiList(newList);
      connect(
        accessToken,
        email,
        setContents,
        newList,
        setNotiList,
        notificationChannelList
      );
    });
  }, []);

  return (
    <NavContainer>
      <LogoContainer>
        <Logo />
        <Text size={18}>TOOLIV</Text>
      </LogoContainer>
      <InputContainer>
        <InputBox label="" placeholder="검색" />
      </InputContainer>
      {mode === 'light' ? (
        <Icons icon="sun" onClick={() => setMode('dark')} />
      ) : (
        <Icons icon="night" onClick={() => setMode('light')} />
      )}
      {/* <div onClick={() => navigate('admin/auth')}>관리</div>
      <div onClick={() => navigate('login')}>로그인</div>
      <div onClick={() => navigate('join')}>회원가입</div> */}
    </NavContainer>
  );
};

export default Nav;
