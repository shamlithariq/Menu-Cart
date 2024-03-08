import React from 'react';
import { Routes, Route } from 'react-router-dom';

import MenuList from '../pages/MenuList';

const PageRoutes = () => {
    return (   
        <Routes >
          <Route path="/menuList" element={<MenuList />} />
        </Routes >
    )}

export default PageRoutes;