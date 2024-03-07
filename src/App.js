import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import CountryMasterPage from './Pages/CountryMaster';
import StateMaster from './Pages/StateMaster';
import StartEndPointMaster from './Pages/StartEndPointMaster';
import DestinationMaster from './Pages/DestinationMaster';
import HotelTypeMaster from './Pages/HotelTypeMaster';
import HaltingDestinationMaster from './Pages/HaltingDestinationMaster';
import HotelMaster from './Pages/HotelMaster';
import CarMaster from './Pages/CarMaster';
import TransportationMaster from './Pages/TransportationMaster';
import PickupDropMaster from './Pages/PickupDropMaster';
import MealTypeMaster from './Pages/MealTypeMaster';
import RoomTypeMaster from './Pages/RoomTypeMaster';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={`/`} element={<Homepage/>}/>
      <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Homepage />} />
      <Route exact path={`/login`} element={<LoginPage/>}/>
      <Route exact path={`/countries`} element={<CountryMasterPage/>}/>
      <Route exact path={`/states`} element={<StateMaster/>}/>
      <Route exact path={`/start-end-pts`} element={<StartEndPointMaster/>}/>
      <Route exact path={`/destinations`} element={<DestinationMaster/>}/>
      <Route exact path={`/hotel-type`} element={<HotelTypeMaster/>}/>
      <Route exact path={`/halting-dest`} element={<HaltingDestinationMaster/>}/>
      <Route exact path={`/hotels`} element={<HotelMaster/>}/>
      <Route exact path={`/cars`} element={<CarMaster/>}/>
      <Route exact path={`/transportations`} element={<TransportationMaster/>}/>
      <Route exact path={`/pickup-drop-pts`} element={<PickupDropMaster/>}/>
      <Route exact path={`/meal-types`} element={<MealTypeMaster/>}/>
      <Route exact path={`/room-types`} element={<RoomTypeMaster/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
