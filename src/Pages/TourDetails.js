import { useState, useEffect, useRef } from "react";
import {
  Footer,
  Navbar,
  Sidebar,
  axios,
  ShimmerTable,
} from "../components/CommonImport";
import { FETCH_TOUR_DETAILS_API } from "../utils/constants";
import { getDateFormatted } from "../utils/helpers";
import { useParams, useNavigate } from "react-router-dom";

import NoData from "../components/NoData";
import Loader from "../components/Loader";

const TourDetails = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [tourDetails, setTourDetails] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchTourDetails = async (id) => {
    try {
      let url = FETCH_TOUR_DETAILS_API;
      let body = {
        id: id,
      };
      let response = await axios.post(url, body);
      if (response) {
        if (response.status == 200) {
          let tourDetails = response.data.data;
          setTourDetails(tourDetails);
        }
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (id) {
      fetchTourDetails(id);
    }
  }, []);
  return (
    <>
      <div className="container-scroller">
        <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
        <div className="container-fluid page-body-wrapper">
          <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="card">
                <div className="card-body">
                  <ol className="breadcrumb">
                    <li
                      className="breadcrumb-item"
                      onClick={() => navigate("/tours")}
                    >
                      Tour Management
                    </li>

                    <li className="breadcrumb-item font-weight-bold text-primary">
                      Tour Details
                    </li>
                  </ol>
                  <h4 className="card-title mt-1 ml-1">
                    {tourDetails && tourDetails?.tourName?.includes("tour")
                      ? tourDetails.tourName
                      : tourDetails.tourName + " tour"}
                  </h4>
                  <div className="row">
                    <div className="col-sm-6">
                      <p>
                        Country : <span className="value">India</span>
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <p>
                        State / Location : <span>Punjab</span>
                      </p>
                    </div>
                    <div className="col-sm-12">
                      <p>
                        Transit Points : <span></span>

                      </p>
                    </div>
                    <div className="col-sm-12">
                      <p>
                        Visiting Locations : <span></span>
                      </p>
                    </div>
                    <div className="col-sm-12">
                      <p>
                        Add On Services: <span></span>
                      </p>
                    </div>
                    <div className="col-sm-12">
                      <p>
                        Transportation: <span></span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TourDetails;
