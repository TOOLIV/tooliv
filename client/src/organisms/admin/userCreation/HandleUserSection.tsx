import { useRecoilState } from 'recoil';
import { deleteUser } from '../../../api/adminApi';
import UserBadge from '../../../molecules/userBadge/UserBadge';
import { userCreationList } from '../../../recoil/atom';

const HandleUserSection = () => {
  const [userList, setUserList] = useRecoilState(userCreationList);
  console.log(userList);
  const onDelete = (email: string) => {
    setUserList(userList.filter((data) => data.email !== email));
    // 회원삭제 기능 구현
    handleDeleteUser(email);
  };
  const handleDeleteUser = async (email: string) => {
    const response = await deleteUser(email);
    console.log(response);
  };

  return (
    <>
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
    </>
  );
};

export default HandleUserSection;
