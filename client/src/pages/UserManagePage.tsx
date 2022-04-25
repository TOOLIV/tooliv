import React, { useRef } from 'react';
import InputBox from '../molecules/inputBox/InputBox';
import CreateUserSection from '../organisms/admin/userCreation/CreateUserSection';
import HandleUserSection from '../organisms/admin/userCreation/HandleUserSection';

const UserManagePage = () => {
  return (
    <>
      <CreateUserSection />
      <HandleUserSection />
    </>
  );
};

export default UserManagePage;
