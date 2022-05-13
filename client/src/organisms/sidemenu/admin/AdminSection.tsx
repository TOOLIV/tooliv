import styled from '@emotion/styled';
import AdminFunc from 'molecules/sidemenu/AdminFunc';
import { useRecoilValue } from 'recoil';
import { isOpenSide } from 'recoil/atom';

const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  padding-right: 16px;
`;

const AdminSection = () => {
  const isSideOpen = useRecoilValue<boolean>(isOpenSide);

  return (
    <Container isOpen={isSideOpen}>
      <AdminFunc />
    </Container>
  );
};

export default AdminSection;
