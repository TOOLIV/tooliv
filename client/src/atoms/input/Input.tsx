import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
import { colors } from '../../shared/color';
import { colorObjTypes } from '../../types/common/colorsTypes';
import { inputTypes } from '../../types/common/inputTypes';

const statusColor: colorObjTypes = {
  default: colors.gray500,
  error: colors.error,
  success: colors.blue100,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  color: ${colors.gray400};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
`;
const InputText = styled.input<{ status: string }>`
  width: 470px;
  padding: 10px 16px;
  border: 1px solid ${(props) => statusColor[props.status]};
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  margin-bottom: 4px;
`;

const Message = styled.span<{ status: string }>`
  color: ${(props) => statusColor[props.status]};
  cursor: default;
  font-size: 12px;
`;

const Input = forwardRef<HTMLInputElement, inputTypes>(
  ({ label, placeholder, message, status = 'default', onChange }, ref) => {
    return (
      <Container>
        <Label htmlFor="input">{label}</Label>
        <InputText
          id="input"
          placeholder={placeholder}
          status={status}
          onChange={onChange}
          ref={ref}
        />
        <Message status={status}>{message}</Message>
      </Container>
    );
  }
);

export default Input;
