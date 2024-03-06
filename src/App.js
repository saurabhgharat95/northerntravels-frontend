import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import CountryMasterPage from './Pages/CountryMaster';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={`/`} element={<Homepage/>}/>
      <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Homepage />} />
      <Route exact path={`/login`} element={<LoginPage/>}/>
      <Route exact path={`/countries`} element={<CountryMasterPage/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
