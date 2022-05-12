import styled from '@emotion/styled';
import { getChannelInfo, getChannelUserCode } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import ChannelAddMemberModal from 'organisms/modal/channel/header/ChannelAddMemberModal';
import ChannelHeaderDropdown from 'organisms/modal/channel/header/ChannelHeaderDropdown';
import ChannelMemberListModal from 'organisms/modal/channel/header/ChannelMemberListModal';
import ChannelModifyModal from 'organisms/modal/channel/header/ChannelModifyModal';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  currentChannelNum,
  currentWorkspace,
  dmName,
  modifyChannelName,
} from 'recoil/atom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 76px;
  padding: 12px 40px;
  /* position: relative; */
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Members = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0 5px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownWrapper = styled.div`
  width: fit-content;
`;
const MemberListWrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 10px;
`;
const ChannelHeader = () => {
  const { workspaceId, channelId } = useParams();
  const currentWorkspaceId = useRecoilValue(currentWorkspace);
  const [channelName, setChannelName] = useState('');
  const [channelMemberNum, setChannelMemberNum] = useState(0);
  const [channelCode, setChannelCode] = useState('');
  const [isMeeting, setIsMeeting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const [memberListOpen, setMemberListOpen] = useState(false);
  const [addMemeberOpen, setAddMemberOpen] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [directName, setDirectName] = useRecoilState<string>(dmName);

  const [currentChannelMemberNum, setCurrentChannelMemberNum] =
    useRecoilState(currentChannelNum);
  const modChannelName = useRecoilValue(modifyChannelName);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const memberListRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickDropdownOutside = ({ target }: any) => {
    if (dropdownOpen && !dropdownRef.current?.contains(target)) {
      setDropdownOpen(false);
    }
  };
  const handleClickMemberOutside = ({ target }: any) => {
    if (memberListOpen && !memberListRef.current?.contains(target)) {
      setMemberListOpen(false);
    }
  };

  useEffect(() => {
    const currentLocation = location.pathname.split('/')[1];
    if (currentLocation === 'meeting') {
      setIsMeeting(true);
    } else {
      setIsMeeting(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickDropdownOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickDropdownOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickMemberOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickMemberOutside);
    };
  }, [memberListOpen]);

  useEffect(() => {
    console.log(channelId);
    if (channelId) {
      if (location.pathname.includes('/direct')) {
        setChannelName(directName);
        setChannelMemberNum(2);
      } else {
        handleChannelInfo();
        getUserCode();
      }
    } else {
      setChannelName('홈');
      setUserCode('');
    }
  }, [channelId, modChannelName, currentChannelMemberNum]);

  const handleChannelInfo = async () => {
    try {
      const { data } = await getChannelInfo(channelId!);
      setChannelName(data.name);
      setChannelMemberNum(data.numOfPeople);
      setCurrentChannelMemberNum(data.numOfPeople);
      setChannelCode(data.channelCode);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserCode = async () => {
    const { data } = await getChannelUserCode(channelId!);
    setUserCode(data.channelMemberCode);
  };

  const handleAddMemberModalOpen = () => {
    setAddMemberOpen(true);
  };
  const handleModifyModalOpen = () => {
    setModifyModalOpen(true);
  };

  const closeMemberList = () => {
    setMemberListOpen(false);
  };

  const closeAddMemberModal = () => {
    setAddMemberOpen(false);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  const closeModifyModal = () => {
    setModifyModalOpen(false);
  };

  return (
    <Container>
      <DropdownWrapper ref={dropdownRef}>
        <Title
          onClick={
            userCode === 'CADMIN'
              ? () => setDropdownOpen(!dropdownOpen)
              : undefined
          }
        >
          <Text size={18}>{channelName}</Text>
          {userCode === 'CADMIN' && !location.pathname.includes('/direct') ? (
            <Icons icon="dropdown" />
          ) : null}
        </Title>
        <ChannelHeaderDropdown
          isOpen={dropdownOpen}
          onClick={handleModifyModalOpen}
          onClose={closeDropdown}
        />
      </DropdownWrapper>

      {currentWorkspaceId !== 'main' &&
      !location.pathname.includes('/direct') ? (
        <MemberListWrapper ref={memberListRef}>
          <Members
            onClick={() => {
              setMemberListOpen(!memberListOpen);
            }}
          >
            <Icons
              icon="solidPerson"
              width="28"
              height="28"
              color={memberListOpen ? 'blue100' : 'gray500'}
            />
            <Text
              size={16}
              color={memberListOpen ? 'blue100' : 'gray500'}
              pointer
            >
              {String(channelMemberNum)}
            </Text>
          </Members>
          {channelCode === 'VIDEO' && !isMeeting ? (
            <Icons
              icon="solidVideoOn"
              width="28"
              height="28"
              onClick={() => navigate(`meeting/${workspaceId}/${channelId}`)}
            />
          ) : null}
          <ChannelMemberListModal
            isOpen={memberListOpen}
            onClick={handleAddMemberModalOpen}
            onClose={closeMemberList}
          />
        </MemberListWrapper>
      ) : null}

      <ChannelAddMemberModal
        isOpen={addMemeberOpen}
        onClose={closeAddMemberModal}
        channelId={channelId!}
      />

      <ChannelModifyModal
        isOpen={modifyModalOpen}
        onClose={closeModifyModal}
        channelName={channelName}
      />
    </Container>
  );
};

export default ChannelHeader;
