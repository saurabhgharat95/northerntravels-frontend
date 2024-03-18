import { useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";
import ComponentSelector from "./ComponentSelector";
const AddQuotation = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState(1);
  const tabNames = [
    { id: 1, name: "Basic Details" },
    { id: 2, name: "Accommodation Details" },
    { id: 3, name: "Hotel Details" },
    { id: 4, name: "Itinerary" },
    { id: 5, name: "Markup" },
  ];
  const openFormTab = (tabId) => {
    setSelectedTab(tabId);
  };
  const selectForm = (action, selectedTab) => {
    switch (selectedTab) {
      case 1:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          setSelectedTab(2);
        }
        break;
      case 2:
        if (action == "prev") {
          setSelectedTab(1);
        } else {
          setSelectedTab(3);
        }
        break;

      case 3:
        if (action == "prev") {
          setSelectedTab(2);
        } else {
          setSelectedTab(4);
        }
        break;

      case 4:
        if (action == "prev") {
          setSelectedTab(3);
        } else {
          setSelectedTab(5);
        }
        break;

      case 5:
        if (action == "prev") {
          setSelectedTab(4);
        } else {
          setSelectedTab(5);
        }
        break;
    }
  };
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
                  <h4 className="card-title">Add Quotation </h4>
                  <div
                    role="application"
                    className="wizard clearfix"
                    id="steps-uid-0"
                  >
                    <div className="steps clearfix">
                      <ul role="tablist">
                        {tabNames &&
                          tabNames.map((tab) => (
                            <li
                              key={tab.id}
                              role="tab"
                              className="current"
                              aria-disabled="false"
                              aria-selected="true"
                              onClick={() => openFormTab(tab.id)}
                            >
                              <a
                                id="steps-uid-0-t-0"
                                href="#steps-uid-0-h-0"
                                aria-controls="steps-uid-0-p-0"
                              >
                                <span className="number">{tab.id}.</span>{" "}
                                {tab.name}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <ComponentSelector selectedTab={selectedTab} />
                      {/* {selectedTab && selectedTab == 1 ? (
                        <BasicDetailsForm></BasicDetailsForm>
                      ) : selectedTab == 2 ? (
                        <AccommodationDetailsForm></AccommodationDetailsForm>
                      ) : selectedTab == 3 ? (
                        <HotelDetailsForm></HotelDetailsForm>
                      ) : selectedTab == 4 ? (
                        <ItineraryForm></ItineraryForm>
                      ) : (
                        <MarkupForm></MarkupForm>
                      )} */}
                    </div>
                    <div className="actions clearfix">
                      <ul role="menu" aria-label="Pagination">
                        <li aria-disabled="true">
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              selectForm("prev", selectedTab);
                            }}
                          >
                            Previous
                          </button>
                        </li>
                        <li aria-hidden="false" aria-disabled="false">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              selectForm("next", selectedTab);
                            }}
                          >
                            Next
                          </button>
                        </li>
                        <li aria-hidden="true" style={{ display: "none" }}>
                          <a href="#finish" role="menuitem">
                            Finish
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};
export default AddQuotation;
