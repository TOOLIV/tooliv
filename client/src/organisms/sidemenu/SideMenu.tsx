import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import DirectMessage from 'molecules/sidemenu/DirectMessage';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Channels from '../../molecules/sidemenu/Channels';
import Friends from '../../molecules/sidemenu/Friends';
import WorkSpaces from '../../molecules/sidemenu/WorkSpaces';
import { currentWorkspace, isOpenSide } from '../../recoil/atom';
import ChannelSection from './channel/ChannelSection';
import WorkSpaceSection from './workspace/WorkSpaceSection';

const Container = styled(motion.div)`
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
  position: absolute;
  height: calc(100vh - 64px);
  /* position: fixed; */
`;

const SideMenu = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: '-85%' },
  };

  const isOpen = useRecoilValue(isOpenSide);
  // const { workspaceId } = useParams();
  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  return (
    <Container
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
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
