import styled from '@emotion/styled';
import Label from 'atoms/label/Label';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { deleteUser } from '../../../api/adminApi';
import UserBadge from '../../../molecules/userBadge/UserBadge';
import { userCreationList } from '../../../recoil/atom';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const HandleUserSection = () => {
  const [userList, setUserList] = useRecoilState(userCreationList);
  const onDelete = (email: string) => {
    setUserList(userList.filter((data) => data.email !== email));
    // 회원삭제 기능 구현
    handleDeleteUser(email);
  };
  const handleDeleteUser = async (email: string) => {
    await deleteUser(email);
  };

  useEffect(() => {
    // setUserList([]);
    console.log('test');
    return setUserList([]);
  }, []);

  return (
    <Container>
      <Label label="추가된 사용자" />
      <UserList>
        {userList.map((data) => {
          return (
            <UserBadge
              key={data.email}
              name={data.name}
              email={data.email}
              onDelete={onDelete}
            />
          );
        })}
      </UserList>
    </Container>
  );
};

export default HandleUserSection;
