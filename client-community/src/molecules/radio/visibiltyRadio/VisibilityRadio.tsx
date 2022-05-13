import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';
import React, { useState } from 'react';
import { colors } from 'shared/color';
import { visibilityRadioTypes } from 'types/channel/contentType';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
const VisibilityBtn = styled.div`
  input[type='radio']:checked + label {
    border: 2px solid ${(props) => props.theme.pointColor};
    background-color: ${(props) => props.theme.bgColor};
    /* background-color: #c4c4c4; */
  }
`;
const VisibleLabel = styled.label`
  width: 160px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;

const RadioBtn = styled.input<{ checked?: boolean }>`
  display: none;
`;

const VisibilityType = ({ value, onChange }: visibilityRadioTypes) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    value === 'public' ? onChange(false) : onChange(true);
  };

  return (
    <Container>
      <Label label="공개 여부" />
      <ChannelWrapper>
        <VisibilityBtn>
          <RadioBtn
            type="radio"
            id="public"
            value="public"
            name="visibilty"
            checked={value === false}
            onChange={handleChange}
          />
          <VisibleLabel htmlFor="public">
            <Icons icon="public" width="16" height="16" />
            <Text size={14}>공개</Text>
          </VisibleLabel>
        </VisibilityBtn>
        <VisibilityBtn>
          <RadioBtn
            type="radio"
            id="private"
            value="private"
            name="visibilty"
            checked={value === true}
            onChange={handleChange}
          />
          <VisibleLabel htmlFor="private">
            <Icons icon="lock" width="16" height="16" />
            <Text size={14}>비공개</Text>
          </VisibleLabel>
        </VisibilityBtn>
      </ChannelWrapper>
    </Container>
  );
};

export default VisibilityType;
