import styled from '@emotion/styled';
import Icons from 'atoms/common/Icons';
import Label from 'atoms/label/Label';
import Text from 'atoms/text/Text';
import React, { useState } from 'react';
import { colors } from 'shared/color';
import { channelRadioTypes } from 'types/channel/contentType';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChannelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;
const ChannelBtn = styled.div`
  input[type='radio']:checked + label {
    border: 2px solid ${(props) => props.theme.pointColor};
    background-color: ${(props) => props.theme.bgColor};
    /* background-color: #c4c4c4; */
  }
`;

const ChannelLabel = styled.label`
  width: 160px;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  cursor: pointer;
`;

const RadioBtn = styled.input<{ checked?: boolean }>`
  display: none;
`;

const InfoMsg = styled.div`
  text-align: center;
`;

const ChannelRadio = ({ value, onChange }: channelRadioTypes) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <Container>
      <Label label="채널 종류" />
      <ChannelWrapper>
        <ChannelBtn>
          <RadioBtn
            type="radio"
            id="basic"
            value="CHAT"
            name="channel"
            checked={value === 'CHAT'}
            onChange={handleChange}
          />
          <ChannelLabel htmlFor="basic">
            <Icons icon="solidPerson" width="60" height="60" />
            <Text size={16}>채팅 채널</Text>
          </ChannelLabel>
        </ChannelBtn>
        <ChannelBtn>
          <RadioBtn
            type="radio"
            id="meeting"
            value="VIDEO"
            name="channel"
            checked={value === 'VIDEO'}
            onChange={handleChange}
          />
          <ChannelLabel htmlFor="meeting">
            <Icons icon="monitor" width="60" height="60" />
            <Text size={16}>화상 채널</Text>
          </ChannelLabel>
        </ChannelBtn>
      </ChannelWrapper>
      <InfoMsg>
        {value === 'CHAT' ? (
          <Text size={10}>
            채팅 채널에서는 인원에 상관없이 누구나 초대하여 대화를 시작할 수
            있습니다.
          </Text>
        ) : (
          <Text size={10}>
            화상 채널에서는 최대 8명까지 초대가 가능하며, 일반 및 화상채팅이
            가능합니다.
          </Text>
        )}
      </InfoMsg>
    </Container>
  );
};

export default ChannelRadio;
