import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import DirectMessage from 'molecules/sidemenu/DirectMessage';
import SideHeader from 'organisms/header/SideHeader';
import { useRecoilValue } from 'recoil';
import Friends from '../../molecules/sidemenu/Friends';
import { currentWorkspace, isOpenSide } from '../../recoil/atom';
import ChannelSection from './channel/ChannelSection';
import WorkSpaceSection from './workspace/WorkSpaceSection';

const Container = styled(motion.div)`
  width: 280px;
  margin-top: 24px;
  background-color: ${(props) => props.theme.sideBgColor};
  border-radius: 0 50px 0 0;
  position: absolute;
  height: calc(100vh - 64px);
  padding: 16px 18px;
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
