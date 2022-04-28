import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { colors } from '../../shared/color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 76px;
  padding: 12px 40px;
  border-bottom: 1px solid ${colors.gray100};
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Header = () => {
  return (
    <Container>
      <Text size={18}>채널명</Text>
      <Members>
        <Icons icon="solidPerson" width="24" height="24" />
        <Text size={16}>6</Text>
      </Members>
    </Container>
  );
};

export default Header;
