import styled from '@emotion/styled';
import FindUserSection from '../organisms/admin/userManagement/FindUserSection';
import InfoSection from '../organisms/admin/userManagement/InfoSection';

const Header = styled.div`
  margin-bottom: 40px;
`;
const UserManagePage = () => {
  return (
    <div>
      <Header>
        <InfoSection />
      </Header>
      <FindUserSection />
    </div>
  );
};

export default UserManagePage;
