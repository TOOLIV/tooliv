import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import DirectMessage from 'molecules/sidemenu/DirectMessage';
import SideHeader from 'organisms/header/SideHeader';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Friends from '../molecules/sidemenu/Friends';
import { currentChannel, currentWorkspace, isOpenSide } from '../recoil/atom';
import ChannelSection from '../organisms/sidemenu/channel/ChannelSection';
import WorkSpaceSection from '../organisms/sidemenu/workspace/WorkSpaceSection';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Container = styled(motion.div)`
  width: 280px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
  position: absolute;
  height: calc(100vh - 64px);
  padding: 16px 18px;
`;

const SideMenu = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: '-85%' },
  };

  const isOpen = useRecoilValue(isOpenSide);
  const [currentWorkspaceId, setCurrentWorkspaceId] =
    useRecoilState(currentWorkspace);
  const setCurrentChannelId = useSetRecoilState(currentChannel);
  const { workspaceId, channelId } = useParams();

  useEffect(() => {
    if (workspaceId && channelId) {
      setCurrentWorkspaceId(workspaceId);
      setCurrentChannelId(channelId);
    }
  }, []);

  // main과 구별하기 위해 useParams가 아닌 recoil value사용.
  // main은 workspaceId가 없음. but recoil에 main이라는 id로 저장
  return (
    <Container
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <SideHeader />
      <WorkSpaceSection />
      {isOpen && currentWorkspaceId === 'main' ? (
        <>
          <Friends />
        </>
      ) : (
        <>
          <ChannelSection />
          <DirectMessage />
        </>
      )}
    </Container>
  );
};

export default SideMenu;
