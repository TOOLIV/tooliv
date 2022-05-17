import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { updateUserStatus } from 'api/userApi';
import Icons from 'atoms/common/Icons';
import Avatar from 'atoms/profile/Avatar';
import Text from 'atoms/text/Text';
import isElectron from 'is-electron';
import { BulrContainer } from 'organisms/meeting/video/ScreenShareModal';
import { forwardRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { memberStatus } from 'recoil/atom';
import { user } from 'recoil/auth';
import { userDropdownType } from 'types/common/userTypes';
import { electronAlert } from 'utils/electronAlert';

const Modal = styled.div<{ isOpen: boolean }>`
  display: none;
  position: absolute;
  top: 55px;
  right: 15px;
  z-index: 10;
  ${(props) =>
    props.isOpen &&
    css`
      display: block;
    `}
`;

const Container = styled.div`
  width: 250px;
  padding: 10px 0;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  /* box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.06); */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ListItem = styled.div<{ divide?: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  ${(props) =>
    props.divide &&
    css`
      border-bottom: 1px solid ${props.theme.borderColor};
    `};

  &:hover {
    background-color: ${(props) => props.theme.dropdownHoverColor};
  }
`;

const UserItem = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
`;

const User = styled.div`
  margin-left: 10px;
`;

const IconItem = styled.div`
  margin-right: 10px;
  height: 20px;
`;

const UserDropdown = forwardRef<HTMLDivElement, userDropdownType>(
  ({ isOpen, onClose, openProfileConfig, openResetPwd }, ref) => {
    const [userInfo, setUserInfo] = useRecoilState(user);
    const [membersStatus, setMembersStatus] = useRecoilState(memberStatus);
    const navigate = useNavigate();
    const [isBulr, setIsBulr] = useState(false);

    const logout = () => {
      const resetUserInfo = async () => {
        await changeStatus('OFFLINE');
        localStorage.removeItem('user');
        setUserInfo({
          accessToken: '',
          email: '',
          name: '',
          nickname: '',
          userId: '',
          profileImage: '',
          statusCode: '',
          userCode: '',
        });
      };
      setIsBulr(true);
      isElectron()
        ? electronAlert
            .alertConfirm({
              title: '로그아웃 확인',
              text: '로그아웃 하시겠습니까?',
              icon: 'warning',
            })
            .then((result) => {
              if (result.isConfirmed) {
                resetUserInfo();
              }
              setIsBulr(false);
            })
        : /* 여기에 웹에서 쓸 alert 넣어주세요 */
          console.log('');

      /* -------------------------  */
    };

    const changeStatus = async (statusCode: string) => {
      const body = {
        statusCode,
      };

      const response = await updateUserStatus(body);
      console.log(response);
      setUserInfo({ ...userInfo, statusCode });
      onClose();
    };

    const handleUserConfig = () => {
      openProfileConfig();
      onClose();
    };

    const handleAdminPage = () => {
      navigate('admin');
      onClose();
    };

    const handleResetPwd = () => {
      openResetPwd();
      onClose();
    };

    useEffect(() => {
      setMembersStatus({
        ...membersStatus,
        [userInfo.email]: userInfo.statusCode,
      });
    }, [userInfo]);

    return (
      <Modal isOpen={isOpen} ref={ref}>
        {isBulr && <BulrContainer />}
        <Container>
          <UserItem>
            <Avatar
              size="36"
              src={userInfo.profileImage}
              status={userInfo.statusCode}
            />
            <User>
              <Text size={16}>{userInfo.name}</Text>
              <Text size={14}>{userInfo.email}</Text>
            </User>
          </UserItem>
          <ListItem onClick={() => changeStatus('ONLINE')}>
            <IconItem>
              <Icons icon="online" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              온라인
            </Text>
          </ListItem>
          <ListItem onClick={() => changeStatus('AWAY')}>
            <IconItem>
              <Icons icon="later" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              다른 용무 중
            </Text>
          </ListItem>
          {/* <ListItem>
            <IconItem>
              <Icons icon="remove" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              방해 금지
            </Text>
          </ListItem> */}
          <ListItem onClick={() => changeStatus('OFFLINE')} divide>
            <IconItem>
              <Icons icon="offline" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              오프라인
            </Text>
          </ListItem>
          <ListItem onClick={handleUserConfig}>
            <IconItem>
              <Icons icon="solidPerson" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              계정 설정
            </Text>
          </ListItem>
          <ListItem onClick={handleResetPwd}>
            <IconItem>
              <Icons icon="modify" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              비밀번호 변경
            </Text>
          </ListItem>
          <ListItem onClick={handleAdminPage}>
            <IconItem>
              <Icons icon="setting" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              관리자 설정
            </Text>
          </ListItem>
          <ListItem onClick={logout}>
            <IconItem>
              <Icons icon="exit" width="20" height="20" />
            </IconItem>
            <Text size={16} pointer>
              로그아웃
            </Text>
          </ListItem>
        </Container>
      </Modal>
    );
  }
);

export default UserDropdown;
