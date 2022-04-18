import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('meeting');
    }
    return (
        <div onClick={onClick}>
            Main
        </div>
    );
};

export default Main;