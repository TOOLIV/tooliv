import styled from '@emotion/styled';
import { getTotalUserNum } from 'api/adminApi';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Info from '../../../molecules/info/Info';

const InfoBox = styled.div`
  display: flex;
  gap: 30px;
`;
const InfoSection = () => {
  const baseURL = localStorage.getItem('baseURL');
  let domain = '';
  if (baseURL) {
    const JUrl = JSON.parse(baseURL!);
    domain = JUrl['url'];
  } else {
    domain = window.location.host;
  }
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    getUserNum();
  }, []);

  const getUserNum = async () => {
    const response = await getTotalUserNum();
    setTotalUser(response.data.totalUsers);
  };

  return (
    <InfoBox>
      <Info label="도메인" value={domain} />
      <Info label="회원 수" value={`총 ${totalUser}명`} />
    </InfoBox>
  );
};

export default InfoSection;
