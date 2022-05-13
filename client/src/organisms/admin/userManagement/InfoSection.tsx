import styled from '@emotion/styled';
import { getTotalUserNum } from 'api/adminApi';
import React, { useEffect, useState } from 'react';
import Info from '../../../molecules/info/Info';

const InfoBox = styled.div`
  display: flex;

  & > div {
    margin-right: 40px;
  }
`;
const InfoSection = () => {
  const baseURL = localStorage.getItem('baseURL');
  const domain = JSON.parse(baseURL!);
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
      <Info label="도메인" value={domain['url']} />
      <Info label="회원 수" value={`총 ${totalUser}명`} />
    </InfoBox>
  );
};

export default InfoSection;
