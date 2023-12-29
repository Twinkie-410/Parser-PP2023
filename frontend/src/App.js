import './App.css';
import {Routes, Route} from "react-router-dom"
import Main from './components/pages/Main/Main';
import MyProfile from './components/pages/Profile/MyProfile';
import Advertisement from './components/pages/Advertisement/Advertisement';

function App() {
  return (
    <>
      <Routes>

        <Route path='*' element={<Main />} />
        <Route path='/myprofile' element={<MyProfile />} />
        <Route path='/advertisement' element={<Advertisement/>} />
        
      </Routes>
    </>
  );
}

export default App;
