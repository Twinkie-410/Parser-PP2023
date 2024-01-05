import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom"
import Main from './components/pages/Main/Main';
import MyProfile from './components/pages/Profile/MyProfile';
import Advertisement from './components/pages/Advertisement/Advertisement';
import Register from './components/pages/Register/Register';
import EditProfile from './components/pages/Profile/EditProfile';
import AddAdvertisment from './components/pages/Advertisement/AddAdvertisment';

function App() {
  return (
    <>
      <Routes>
        
        <Route path='/' element={<Main />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/advertisement' element={<Advertisement/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/editprofile' element={<EditProfile/>} />
        <Route path='/addadvertisement' element={<AddAdvertisment/>} />

        
      </Routes>
    </>
  );
}

export default App;

