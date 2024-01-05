import './App.css';
import React, { useEffect } from 'react';
import {Routes, Route} from "react-router-dom"
import Main from './components/pages/Main/Main';
import MyProfile from './components/pages/Profile/MyProfile';
import Advertisement from './components/pages/Advertisement/Advertisement';
import Register from './components/pages/Register/Register';
import { userPageSlice } from './store/reducers/GetUserPage';
import { useAppDispatch, useAppSelector } from './store/hooks/redux';
import { getUserList } from './store/actionCreators/UserAPI';
import EditProfile from './components/pages/Profile/EditProfile';

function App() {
  return (
    <>
      <Routes>
        
        <Route path='/' element={<Main />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/advertisement' element={<Advertisement/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/editprofile' element={<EditProfile/>} />
        
      </Routes>
    </>
  );
}

export default App;

