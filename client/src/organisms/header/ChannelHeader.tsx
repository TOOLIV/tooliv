import styled from '@emotion/styled';
import { searchChannelMemberList } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import ChannelAddMemberModal from 'organisms/modal/channel/ChannelAddMemberModal';
import MemberListModal from 'organisms/modal/channel/MemberListModal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  const [channelMemberList, setChannelMemberList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [memeberListOpen, setMemberListOpen] = useState(false);
  const [addMemeberOpen, setAddMemberOpen] = useState(false);

  useEffect(() => {
    if (channelId) {
      console.log(channelId);
      getChannelInfo();
    }
  }, [channelId]);

  useEffect(() => {
    if (channelId) {
      searchChannelMember();
      console.log(channelId);
    }
  }, [keyword]);

  const getChannelInfo = async () => {
    try {
      const { data } = await searchChannelMemberList(channelId!, keyword);
      setChannelName(data.channelName);
      // setChannelMemberList(data.channelMemberGetResponseDTOList);
      setChannelMemberNum(data.channelMemberGetResponseDTOList.length);
    } catch (error) {
      console.log(error);
    }
  };

  const searchChannelMember = async () => {
    try {
      const { data } = await searchChannelMemberList(channelId!, keyword);
      setChannelMemberList(data.channelMemberGetResponseDTOList);
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

  const handleSearchChange = (keyword: string) => {
    setKeyword(keyword);
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
      <MemberListModal
        isOpen={memeberListOpen}
        memberList={channelMemberList}
        onClick={handleAddMemberModalOpen}
        onChange={handleSearchChange}
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
