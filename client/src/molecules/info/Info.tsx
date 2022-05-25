import styled from '@emotion/styled';
import Label from '../../atoms/label/Label';
import Text from '../../atoms/text/Text';
import { infoTypes } from '../../types/common/infoTypes';

const Layout = styled.div`
  width: fit-content;
`;
const Info = ({ label, value }: infoTypes) => {
  return (
    <Layout>
      <Label label={label} />
      <Text size={18}>{value}</Text>
    </Layout>
  );
};

export default Info;
