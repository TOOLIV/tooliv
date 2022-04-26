import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { useRecoilState } from 'recoil';
import Channels from '../../molecules/sidemenu/Channels';
import Friends from '../../molecules/sidemenu/Friends';
import WorkSpaces from '../../molecules/sidemenu/WorkSpaces';
import { isOpenSide } from '../../recoil/atom';
import WorkSpaceSection from './workspace/WorkSpaceSection';

const Container = styled(motion.div)`
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
  /* position: fixed; */
`;

const SideMenu = () => {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: '-85%' },
  };

  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);

  return (
    <Container
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      variants={variants}
    >
      <WorkSpaceSection />
      {isOpen && (
        <>
          <Channels />
          <Friends />
        </>
      )}
    </Container>
  );
};

export default SideMenu;
