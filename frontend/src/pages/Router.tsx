import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Main from './Main';
import Meeting from './Meeting';

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} >
                        <Route path='' element={<Main />} />
                        <Route path='/meeting' element={<Meeting />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default AppRouter;