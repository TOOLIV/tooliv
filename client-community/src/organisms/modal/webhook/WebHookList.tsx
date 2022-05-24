import styled from '@emotion/styled';
import { getWebHookList } from 'api/chatApi';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { colors } from 'shared/color';
import WebHook, { webhookResponseDTOList } from './WebHook';

const WebHookListContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const BlankContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.gray400};
`;
const WebHookContainer = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid ${colors.gray400};
  color: ${(props) => props.theme.textColor};
  .name {
    width: 25%;
  }
  .webhookid {
    width: 75%;
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const WebHookList = () => {
  const [webHookList, setWebHookList] = useState([]);
  const { channelId } = useParams();
  useEffect(() => {
    getWebHookList(channelId!).then((res) => {
      setWebHookList(res.data.webhookResponseDTOList);
    });
  }, [channelId]);

  return (
    <WebHookListContainer>
      {webHookList.length > 0 ? (
        <>
          <WebHookContainer>
            <div className="name">webhook 이름</div>
            <div className="webhookid">webhook id</div>
          </WebHookContainer>
          <List>
            {webHookList.map((webHook: webhookResponseDTOList) => (
              <WebHook webHook={webHook} key={webHook.webhookId} />
            ))}
          </List>
        </>
      ) : (
        <BlankContainer>
          <div>등록된 webhook이 없습니다.</div>
        </BlankContainer>
      )}
    </WebHookListContainer>
  );
};

export default WebHookList;
