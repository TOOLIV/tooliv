import styled from '@emotion/styled';
import React, { useState } from 'react';
import Info from '../../../molecules/info/Info';

const InfoBox = styled.div`
  display: flex;

  & > div {
    margin-right: 40px;
  }
`;
const InfoSection = () => {
  const [userNum, setUserNum] = useState(2300);

  return (
    <InfoBox>
      <Info label="도메인" value="meeting.ssafy.com" />
      <Info label="회원 수" value={`총 ${String(userNum)}명`} />
    </InfoBox>
  );
};

export default InfoSection;
