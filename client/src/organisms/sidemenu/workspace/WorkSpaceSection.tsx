import styled from '@emotion/styled';
import { getWorkspaceList } from 'api/workspaceApi';
import Icons from 'atoms/common/Icons';
import MenuTemplate from 'atoms/sidemenu/MenuTemplate';
import WorkSpaces from 'molecules/sidemenu/WorkSpaces';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isCreateWorkspace, isOpenSide } from 'recoil/atom';
import { workspaceListType } from 'types/workspace/workspaceTypes';

const Container = styled.div<{ isOpen: boolean }>`
  width: 280px;
  padding: 16px 18px 16px 18px;
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const WorkSpaceSection = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const [workspaceList, setWorkspaceList] = useState<workspaceListType[]>([]);
  const isCreate = useRecoilValue(isCreateWorkspace);

  const onClickSide = () => {
    setIsOpen((prev) => !prev);
  };
  const handleWorkspace = async () => {
    const response = await getWorkspaceList();
    setWorkspaceList(response.data.workspaceGetResponseDTOList);
    console.log(response);
  };

  useEffect(() => {
    handleWorkspace();
  }, [isCreate]);

  return (
    <Container isOpen={isOpen}>
      <Header>
        <MenuTemplate title="워크 스페이스" />
        <Icons
          icon={isOpen ? 'anglesLeft' : 'anglesRight'}
          onClick={onClickSide}
        />
      </Header>
      <WorkSpaces workspaceList={workspaceList} />
    </Container>
  );
};

export default WorkSpaceSection;
