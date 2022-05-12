import Label from '../../atoms/label/Label';
import Text from '../../atoms/text/Text';
import { infoTypes } from '../../types/common/infoTypes';
import { Layout } from '../inputBox/InputBox';

const Info = ({ label, value }: infoTypes) => {
  return (
    <Layout>
      <Label label={label} />
      <Text size={18}>{value}</Text>
    </Layout>
  );
};

export default Info;
