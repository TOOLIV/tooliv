import styled from '@emotion/styled';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Nav from '../components/home/Nav';
import Workspace from '../components/home/sidemenu/Workspace';

const SideMenuContainer = styled.div`
    margin-top: 24px;
    background-color: #F4F4F4;
    border-radius: 0 50px 0 0;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: calc(100vh-64px);
`;

const Home = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('meeting')
    }

    return (
        <>
            <Nav />
            <Container>
                <SideMenuContainer>
                    <Workspace />
                </SideMenuContainer>
                <Outlet />
            </Container>
        </>
    );
};

export default Home;