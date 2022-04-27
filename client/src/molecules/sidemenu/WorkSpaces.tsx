import styled from '@emotion/styled';
import { getWorkspaceList } from 'api/workspaceApi';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { workspaceListType } from 'types/workspace/workspaceTypes';
import Icons from '../../atoms/common/Icons';
import MenuTemplate from '../../atoms/sidemenu/MenuTemplate';
import WorkSpace from '../../atoms/sidemenu/WorkSpace';
import { isOpenSide } from '../../recoil/atom';
import { labelType } from '../../types/common/labelType';
import { SideWrapper } from './Channels';

const TopContainer = styled.div`
  display: flex;
  border-radius: 0 50px 0 0;
  padding: 16px 18px 16px 18px;
  width: 280px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WorkSpaceContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  /* width: 100%; */
  padding: 0 24px 22px 24px;
  border-bottom: ${(props) => props.isOpen && '1px solid #ffffff'};
`;

const WorkSpaces = () => {
  const [isOpen, setIsOpen] = useRecoilState<boolean>(isOpenSide);
  const [workspaceList, setWorkspaceList] = useState<workspaceListType[]>([]);

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
  }, []);

  return (
    <>
      <TopContainer>
        <MenuTemplate title="워크 스페이스" />
        <Icons
          icon={isOpen ? 'anglesLeft' : 'anglesRight'}
          onClick={onClickSide}
        />
      </TopContainer>
      <WorkSpaceContainer isOpen={isOpen}>
        {workspaceList.map((workspace) => (
          <WorkSpace key={workspace.id} {...workspace} />
        ))}
        <Icons icon="plus" />
      </WorkSpaceContainer>
    </>
  );
};

export default WorkSpaces;
