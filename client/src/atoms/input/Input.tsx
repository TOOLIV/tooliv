import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
import { colors } from '../../shared/color';
import { colorObjTypes } from '../../types/common/colorsTypes';
import { inputTypes } from '../../types/common/inputTypes';

export const statusColor: colorObjTypes = {
  default: colors.gray400,
  error: colors.error,
  success: colors.blue100,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputText = styled.input<{ status: string }>`
  /* width: 470px; */
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${(props) => statusColor[props.status]};
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  margin-bottom: 4px;

  &:focus {
    border: 1px solid ${colors.gray700};
  }
`;

const Input = forwardRef<HTMLInputElement, inputTypes>(
  ({ placeholder, status, type, onChange }, ref) => {
    return (
      <Container>
        <InputText
          placeholder={placeholder}
          status={status}
          onChange={onChange}
          autoComplete="on"
          type={type}
          ref={ref}
        />
      </Container>
    );
  }
);

export default Input;
