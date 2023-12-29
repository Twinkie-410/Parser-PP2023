import './App.css';
import {Routes, Route} from "react-router-dom"
import Main from './components/pages/Main/Main';
import MyProfile from './components/pages/Profile/MyProfile';

function App() {
  return (
    <>
      <Routes>

        <Route path='*' element={<Main />} />
        <Route path='/myprofile' element={<MyProfile />} />

      </Routes>
    </>
  );
}

export default App;
