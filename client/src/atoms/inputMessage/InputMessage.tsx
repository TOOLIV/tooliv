import styled from '@emotion/styled';
import { inputMessageTypes } from '../../types/common/inputTypes';
import { statusColor } from '../input/Input';

const Message = styled.span<{ status: string }>`
  color: ${(props) => statusColor[props.status]};
  cursor: default;
  font-size: 12px;
`;

const InputMessage = ({ status = 'default', message }: inputMessageTypes) => {
  return <Message status={status}>{message}</Message>;
};

export default InputMessage;
