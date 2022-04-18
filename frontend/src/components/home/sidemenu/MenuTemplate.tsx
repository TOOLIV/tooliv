import styled from '@emotion/styled';
import React from 'react';
import { SideMenuProps } from '../../../types/sidemenu';

const Container = styled.div`
    border-radius: 0 50px 0 0;
    padding: 16px 24px 12px 24px;
    width: 280px;
    box-sizing: border-box;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 16px;
`;

const MenuTemplate = ({title, ...props}:SideMenuProps) => {
    return (
        <Container>
            <Title>
                {title}
            </Title>
        </Container>
    );
};

export default MenuTemplate;