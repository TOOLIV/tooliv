import styled from '@emotion/styled';
import FindUserSection from '../organisms/admin/userManagement/FindUserSection';
import InfoSection from '../organisms/admin/userManagement/InfoSection';

const Header = styled.div`
  margin-bottom: 40px;
`;
const UserAuthPage = () => {
  return (
    <div>
      <Header>
        <InfoSection />
      </Header>
      <FindUserSection />
    </div>
  );
};

export default UserAuthPage;
