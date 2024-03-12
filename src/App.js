import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage';
import LoginPage from './Pages/LoginPage';
import CountryMasterPage from './Pages/CountryMaster';
import StateMaster from './Pages/StateMaster';
import TransitPointMaster from './Pages/TransitPointMaster';
import DestinationMaster from './Pages/DestinationMaster';
import HotelTypeMaster from './Pages/HotelTypeMaster';
import HaltingDestinationMaster from './Pages/HaltingDestinationMaster';
import HotelMaster from './Pages/HotelMaster';
import CarMaster from './Pages/CarMaster';
import TransportationMaster from './Pages/TransportationMaster';
import MealTypeMaster from './Pages/MealTypeMaster';
import RoomTypeMaster from './Pages/RoomTypeMaster';
import QuotationManagement from './Pages/QuotationManagement';
import LeadManagement from './Pages/LeadManagement';
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route exact path={`/`} element={<Homepage/>}/>
      <Route exact path={`${process.env.PUBLIC_URL}/`} element={<Homepage />} />
      <Route exact path={`/login`} element={<LoginPage/>}/>
      <Route exact path={`/countries`} element={<CountryMasterPage/>}/>
      <Route exact path={`/states`} element={<StateMaster/>}/>
      <Route exact path={`/transit-pts`} element={<TransitPointMaster/>}/>
      <Route exact path={`/destinations`} element={<DestinationMaster/>}/>
      <Route exact path={`/hotel-type`} element={<HotelTypeMaster/>}/>
      <Route exact path={`/halting-dest`} element={<HaltingDestinationMaster/>}/>
      <Route exact path={`/hotels`} element={<HotelMaster/>}/>
      <Route exact path={`/cars`} element={<CarMaster/>}/>
      <Route exact path={`/transportations`} element={<TransportationMaster/>}/>
      <Route exact path={`/meal-types`} element={<MealTypeMaster/>}/>
      <Route exact path={`/room-types`} element={<RoomTypeMaster/>}/>
      <Route exact path={`/quotations`} element={<QuotationManagement/>}/>
      <Route exact path={`/leads`} element={<LeadManagement/>}/>
    </Routes>
   </BrowserRouter>
  );
}

export default App;
