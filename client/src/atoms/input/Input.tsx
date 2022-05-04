import styled from '@emotion/styled';
import React, { forwardRef } from 'react';
import { useRecoilValue } from 'recoil';
import { appThemeMode } from 'recoil/atom';
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
  border: none;
`;

const InputText = styled.input<{ status: string; mode: string }>`
  width: 100%;
  padding: 10px 16px;
  border: ${(props) =>
    props.mode === 'dark' ? 'none' : `1px solid ${statusColor[props.status]}`};
  border-radius: 5px;
  outline: none;
  font-size: 14px;
  margin-bottom: 4px;
  background-color: ${(props) =>
    props.mode === 'dark' ? props.theme.sideBgColor : 'none'};
  color: ${(props) => props.theme.textColor};
  &:focus {
    border: 1px solid ${colors.gray700};
  }
`;

const Input = forwardRef<HTMLInputElement, inputTypes>(
  ({ placeholder, status, type, onChange, onKeyPress }, ref) => {
    const mode = useRecoilValue(appThemeMode);

    return (
      <Container>
        <InputText
          placeholder={placeholder}
          status={status}
          mode={mode}
          onChange={onChange}
          onKeyDown={onKeyPress}
          autoComplete="on"
          type={type}
          ref={ref}
        />
      </Container>
    );
  }
);

export default Input;
