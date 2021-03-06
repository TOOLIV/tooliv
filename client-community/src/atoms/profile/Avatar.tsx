import styled from '@emotion/styled';
import { avatarTypes } from '../../types/common/avatarTypes';
import { ReactComponent as AvatarIcon } from '../../assets/img/user.svg';
import { colors } from 'shared/color';

const Container = styled.div`
  position: relative;
  height: fit-content;
  cursor: pointer;
`;
const Image = styled.img<{ size?: string }>`
  border-radius: 50%;
  width: ${(props) => (props.size ? `${props.size}px` : '20px')};
  height: ${(props) => (props.size ? `${props.size}px` : '20px')};
`;

const Status = styled.div<{ status: string }>`
  border-radius: 50%;
  border: 1px solid
    ${(props) => (props.status === 'OFFLINE' ? 'white' : 'black')};
  width: 10px;
  height: 10px;
  background-color: ${(props) =>
    props.status === 'ONLINE'
      ? '#03C75A'
      : props.status === 'AWAY'
      ? '#f5ab00'
      : 'black'};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Avatar = ({ src, size = '24', status, onClick }: avatarTypes) => {
  return (
    <Container onClick={onClick && onClick}>
      {src ? (
        <Image src={src} size={size} alt="profile" />
      ) : (
        <AvatarIcon width={size} height={size} fill={colors.gray500} />
      )}
      {status ? <Status status={status} /> : null}
    </Container>
  );
};

export default Avatar;
