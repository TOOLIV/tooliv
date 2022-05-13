import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Text from 'atoms/text/Text';
import ChannelExitModal from 'organisms/modal/channel/sidemenu/ChannelExitModal';
import { createRef, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { channelNotiList } from 'recoil/atom';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { channelNotiType, channelsType } from 'types/channel/contentType';
import Icons from '../../atoms/common/Icons';
import Label from '../../atoms/common/Label';
import ChannelLabel from '../../atoms/label/Label';
export const TopContainer = styled.div`
  display: flex;
  padding: 16px 0;
  /* width: 280px; */
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminContainer = styled.div`
  padding-left: 14px;
  padding-bottom: 18px;
`;

export const AdminItem = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 6px;
`;

const ChannelContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: 0 16px 0 8px;
  transition: 0.3s;
  position: relative;
  cursor: pointer;
  box-sizing: content-box;
  background-color: ${(props) => props.isSelected && props.theme.hoverColor};
  border-radius: ${(props) => props.isSelected && `10px 0 0 10px`};
  border-right: ${(props) =>
    props.isSelected && `4px solid ${props.theme.darkPointColor}`};

  ${(props) =>
    css`
      &:hover {
        background-color: ${props.theme.hoverColor};
        border-radius: 10px 0 0 10px;
        border-right: 4px solid ${props.theme.hoverColor};
      }
    `}
`;

const ChannelsWrapper = styled.div`
  margin-bottom: 10px;
`;

export const SideWrapper = styled.div`
  margin-right: 10px;
`;

const AdminFunc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userCode } = useRecoilValue(user);
  return (
    <AdminContainer>
      <ChannelsWrapper>
        {userCode === 'ADMIN' ? (
          <ChannelContainer
            isSelected={location.pathname.includes('auth')}
            onClick={() => navigate('admin/auth')}
          >
            <AdminItem>
              <SideWrapper>
                <Icons icon="personGroup" width="21" height="21" />
              </SideWrapper>
              <Text size={14}>회원 관리</Text>
            </AdminItem>
          </ChannelContainer>
        ) : null}
        <ChannelContainer
          isSelected={location.pathname.includes('manage')}
          onClick={() => navigate('admin/manage')}
        >
          <AdminItem>
            <SideWrapper>
              <Icons icon="addPerson" width="21" height="21" />
            </SideWrapper>
            <Text size={14}>회원 추가</Text>
          </AdminItem>
        </ChannelContainer>
      </ChannelsWrapper>
    </AdminContainer>
  );
};

export default AdminFunc;
