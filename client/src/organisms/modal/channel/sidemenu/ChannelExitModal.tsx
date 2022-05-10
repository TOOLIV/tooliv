import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { deleteChannelMember } from 'api/channelApi';
import Icons from 'atoms/common/Icons';
import Text from 'atoms/text/Text';
import { forwardRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { currentChannelNum, currentWorkspace, userLog } from 'recoil/atom';
import { user } from 'recoil/auth';
import { colors } from 'shared/color';
import { exitChannelModalType } from 'types/channel/contentType';

const Modal = styled.div<{ isOpen: boolean; top: number; left: number }>`
  display: none;
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  /* left: 20px; */

  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 130px;
  padding: 5px 0;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div`
  padding: 5px 30px 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const ChannelExitModal = ({
  isOpen,
  channelId,
  top,
  left,
}: exitChannelModalType) => {
  const { workspaceId } = useParams();
  const { email } = useRecoilValue(user);
  const setCurrentWorkspaceId = useSetRecoilState(currentWorkspace);
  const setCurrentChannelMemberNum = useSetRecoilState(currentChannelNum);
  const [userLogList, setUserLogList] = useRecoilState(userLog);
  const navigate = useNavigate();
  const exitChannel = async () => {
    await deleteChannelMember(channelId!, email);
    setCurrentChannelMemberNum((prev) => prev - 1);
    setCurrentWorkspaceId('main');

    if (workspaceId) {
      let log = JSON.parse(JSON.stringify(userLogList));
      delete log[workspaceId];
      setUserLogList(log);
    }
    navigate('/main');
  };

  console.log(top, left);

  return (
    <Modal isOpen={isOpen} top={top} left={left}>
      <Container>
        <ListItem onClick={() => exitChannel()}>
          <Icons color="secondary" icon="xMark" />
          <Text color="secondary" size={14} pointer>
            채널 나가기
          </Text>
        </ListItem>
      </Container>
    </Modal>
  );
};
export default ChannelExitModal;
