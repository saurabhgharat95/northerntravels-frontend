import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import LoginPage from "./Pages/LoginPage";
import CountryMasterPage from "./Pages/CountryMaster";
import StateMaster from "./Pages/StateMaster";
import TransitPointMaster from "./Pages/TransitPointMaster";
import DestinationMaster from "./Pages/DestinationMaster";
import HotelTypeMaster from "./Pages/HotelTypeMaster";
import HaltingDestinationMaster from "./Pages/HaltingDestinationMaster";
import HotelMaster from "./Pages/HotelMaster";
import CarMaster from "./Pages/CarMaster";
import TransportationMaster from "./Pages/TransportationMaster";
import MealTypeMaster from "./Pages/MealTypeMaster";
import RoomTypeMaster from "./Pages/RoomTypeMaster";
import QuotationManagement from "./Pages/QuotationManagement";
import LeadManagement from "./Pages/LeadManagement";
import AddQuotation from "./Pages/AddQuotation";
import HotelRoomManagement from "./Pages/HotelRoomManagement";
import TourManagement from "./Pages/TourManagement";
import AddTourForm from "./Pages/AddTourForm";
import TourDetails from "./Pages/TourDetails";
import UserManagement from "./Pages/UserManagement";
import UserForm from "./Pages/UserForm";
import PrivateRoute from "./components/PrivateRoute";
import UserDetails from "./Pages/UserDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path={`/login`} element={<LoginPage />} />
        <Route
          exact
          path={`/`}
          element={<PrivateRoute Component={Homepage} />}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/`}
          element={<PrivateRoute Component={Homepage} />}
        />
        <Route
          exact
          path={`/countries`}
          element={<PrivateRoute Component={CountryMasterPage} />}
        />
        <Route
          exact
          path={`/states`}
          element={<PrivateRoute Component={StateMaster} />}
        />
        <Route
          exact
          path={`/transit-pts`}
          element={<PrivateRoute Component={TransitPointMaster} />}
        />
        <Route
          exact
          path={`/destinations`}
          element={<PrivateRoute Component={DestinationMaster} />}
        />
        <Route
          exact
          path={`/hotel-type`}
          element={<PrivateRoute Component={HotelTypeMaster} />}
        />
        <Route
          exact
          path={`/halting-dest`}
          element={<PrivateRoute Component={HaltingDestinationMaster} />}
        />
        <Route
          exact
          path={`/hotels`}
          element={<PrivateRoute Component={HotelMaster} />}
        />
        <Route
          exact
          path={`/cars`}
          element={<PrivateRoute Component={CarMaster} />}
        />
        <Route
          exact
          path={`/transportations`}
          element={<PrivateRoute Component={TransportationMaster} />}
        />
        <Route
          exact
          path={`/meal-types`}
          element={<PrivateRoute Component={MealTypeMaster} />}
        />
        <Route
          exact
          path={`/room-types`}
          element={<PrivateRoute Component={RoomTypeMaster} />}
        />
        <Route
          exact
          path={`/quotations`}
          element={<PrivateRoute Component={QuotationManagement} />}
        />
        <Route
          exact
          path={`/leads`}
          element={<PrivateRoute Component={LeadManagement} />}
        />
        <Route
          exact
          path={`/add-quotation`}
          element={<PrivateRoute Component={AddQuotation} />}
        />
        <Route
          exact
          path={`/edit-quotation/:id?`}
          element={<PrivateRoute Component={AddQuotation} />}
        />
        <Route
          exact
          path={`/maintain-rooms`}
          element={<PrivateRoute Component={HotelRoomManagement} />}
        />
        <Route
          exact
          path={`/tours`}
          element={<PrivateRoute Component={TourManagement} />}
        />
        <Route
          exact
          path={`/add-tour`}
          element={<PrivateRoute Component={AddTourForm} />}
        />
        <Route
          exact
          path={`/edit-tour/:id?`}
          element={<PrivateRoute Component={AddTourForm} />}
        />
        <Route
          exact
          path={`/tour-details/:id?`}
          element={<PrivateRoute Component={TourDetails} />}
        />
        <Route
          exact
          path={`/users`}
          element={<PrivateRoute Component={UserManagement} />}
        />
        <Route
          exact
          path={`/add-user`}
          element={<PrivateRoute Component={UserForm} />}
        />
        <Route
          exact
          path={`/edit-user/:id?`}
          element={<PrivateRoute Component={UserForm} />}
        />
        <Route
          exact
          path={`/user/:id?`}
          element={<PrivateRoute Component={UserDetails} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
