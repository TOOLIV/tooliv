import styled from '@emotion/styled';
import { searchChannelMemberList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import ChannelAddMemberModal from 'organisms/modal/channel/ChannelAddMemberModal';
import ChannelMemberListModal from 'organisms/modal/channel/ChannelMemberListModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentChannelNum } from 'recoil/atom';
import { colors } from '../../shared/color';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 76px;
  padding: 12px 40px;
  position: relative;
  border-bottom: 1px solid ${colors.gray100};
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 5px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray100};
  }
`;
const ChannelHeader = () => {
  const { channelId } = useParams();
  const [channelName, setChannelName] = useState('');
  const [channelMemberNum, setChannelMemberNum] = useState(0);
  const [memeberListOpen, setMemberListOpen] = useState(false);
  const [addMemeberOpen, setAddMemberOpen] = useState(false);

  const [currentChannelMemberNum, setCurrentChannelMemberNum] =
    useRecoilState(currentChannelNum);

  useEffect(() => {
    console.log(currentChannelMemberNum);
    if (currentChannelMemberNum === 0) {
      getChannelInfo();
    }
  }, []);

  useEffect(() => {
    if (currentChannelMemberNum !== 0) {
      setChannelMemberNum(currentChannelMemberNum);
    }
  }, [currentChannelMemberNum]);

  useEffect(() => {
    if (channelId) {
      console.log(channelId);
      getChannelInfo();
    }
  }, [channelId]);

  const getChannelInfo = async () => {
    try {
      // channelId로 channel명 및 명수 받아오는 api 있으면 좋을듯
      const { data } = await searchChannelMemberList(channelId!, '');
      setChannelName(data.channelName);
      setChannelMemberNum(data.channelMemberGetResponseDTOList.length);
      setCurrentChannelMemberNum(data.channelMemberGetResponseDTOList.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddMemberModalOpen = () => {
    setAddMemberOpen(true);
  };
  const closeMemberList = () => {
    setMemberListOpen(false);
  };

  const closeAddMemberModal = () => {
    setAddMemberOpen(false);
  };

  return (
    <Container>
      <Text size={18}>{channelName}</Text>
      <Members
        onClick={() => {
          setMemberListOpen(!memeberListOpen);
        }}
      >
        <Icons
          icon="solidPerson"
          width="28"
          height="28"
          color={memeberListOpen ? 'blue100' : 'gray500'}
        />
        <Text size={16} color={memeberListOpen ? 'blue100' : 'gray500'} pointer>
          {String(channelMemberNum)}
        </Text>
      </Members>
      <ChannelMemberListModal
        isOpen={memeberListOpen}
        onClick={handleAddMemberModalOpen}
        onClose={closeMemberList}
      />

      <ChannelAddMemberModal
        isOpen={addMemeberOpen}
        onClose={closeAddMemberModal}
        channelId={channelId!}
      />
    </Container>
  );
};

export default ChannelHeader;
