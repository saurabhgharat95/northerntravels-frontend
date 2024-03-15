import { useEffect, useState } from "react";
import { Footer, Navbar, Sidebar } from "../components/CommonImport";
import { FETCH_COUNTRY_API,ADD_COUNTRY_API,DELETE_COUNTRY_API,UPDATE_COUNTRY_API } from "../utils/constants";

import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const CountryMaster = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [countryName, setCountryName] = useState("");
  const [countries, setCountries] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const fetchCountries = async()=>{
    try{
      let url = FETCH_COUNTRY_API
     
      let response = await axios.post(url)
      console.log('response',response.data.data)
      if(response){
        if(response.status==200){
          setCountries(response.data.data)
        }
      }
    }
    catch(e){
      console.log('e',e);
    }
  }

  const addCountry = async()=>{
    try{
      let url = ADD_COUNTRY_API
      let body = {
        "countryName":countryName
      }
      let response = await axios.post(url,body)
      console.log('response',response)
      if(response){
        if(response.status==200){
          toast.success(response.data.message, {
            position: "top-right"
          });
          
          setShowModal(false);
          console.log('showModal',showModal);
          setCountryName('')
          fetchCountries()
        }
      }
    }
    catch(e){
      console.log('e',e);
    }
  }
  const updateCountry = async()=>{
    try{
      let url = UPDATE_COUNTRY_API
      let body = {
        "countryName":countryName,
        "id":updateId
      }
      let response = await axios.post(url,body)
      console.log('response',response)
      if(response){
        if(response.status==200){
          toast.success(response.data.message, {
            position: "top-right"
          });
          
          setShowModal(false);
          console.log('showModal',showModal);
          setCountryName('')
          fetchCountries()
        }
      }
    }
    catch(e){
      console.log('e',e);
    }
  }
  const deleteCountry = async(id)=>{
    try{
      let url = DELETE_COUNTRY_API
      let body = {
        "id":id
      }
      let response = await axios.post(url,body)
      console.log('response',response)
      if(response){
        if(response.status==200){
          toast.success(response.data.message, {
            position: "top-right"
          });
          
          setShowModal(false);
          console.log('showModal',showModal);
          setCountryName('')
          fetchCountries()
        }
      }
    }
    catch(e){
      console.log('e',e);
    }
  }

  const modalStyle = {
    display: showModal ? 'block' : 'none',
    opacity:showModal ? '1' : '0',
    transition: showModal?'opacity 0.15s linear':''
  };
  const openModal = (countryName,updateId) =>{
    console.log('in',countryName);
    setShowModal(true)
    setCountryName(countryName)
    setUpdate(true)
    setUpdateId(updateId)
  }
  useEffect(()=>{
    fetchCountries()
  },[])
  return (
    <div className="container-scroller">
      <Navbar setSidebarOpen={setSidebarOpen}></Navbar>
      <div className="container-fluid page-body-wrapper">
        <Sidebar isSidebarOpen={isSidebarOpen}></Sidebar>
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Countries Master {console.log('aaa',modalStyle)}</h4>
                <div className="float-right">
                  <button
                    className="btn btn-primary btn-sm"
                    // data-bs-toggle="modal"
                    // data-bs-target="#countryModal"
                    onClick={() => setShowModal(true)}
                  >
                    Add Country 
                  </button>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div className="row">
                  <div className="col-12">
                    <div className="table-responsive">
                      <div
                        id="order-listing_wrapper"
                        className="dataTables_wrapper dt-bootstrap5 no-footer"
                      >
                        <div className="row">
                          <div className="col-sm-12 col-md-6">
                            <div
                              className="dataTables_length"
                              id="order-listing_length"
                            >
                              <label>
                                Show{" "}
                                <select
                                  name="order-listing_length"
                                  aria-controls="order-listing"
                                  className="form-select form-select-sm"
                                >
                                  <option value="5">5</option>
                                  <option value="10">10</option>
                                  <option value="15">15</option>
                                  <option value="-1">All</option>
                                </select>{" "}
                                entries
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                            <div
                              id="order-listing_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                <input
                                  type="search"
                                  className="form-control"
                                  placeholder="Search"
                                  aria-controls="order-listing"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="row dt-row">
                          <div className="col-sm-12">
                            <table
                              id="order-listing"
                              className="table dataTable no-footer"
                              aria-describedby="order-listing_info"
                            >
                              <thead>
                                <tr>
                                  <th
                                    className="sorting sorting_asc"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-sort="ascending"
                                    aria-label="Order #: activate to sort column descending"
                                    style={{ width: "107.016px" }}
                                  >
                                    Sr. No.
                                  </th>
                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Purchased On: activate to sort column ascending"
                                    style={{ width: "171.375px" }}
                                  >
                                    Country
                                  </th>
                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Customer: activate to sort column ascending"
                                    style={{ width: "127.391px" }}
                                  >
                                    Status
                                  </th>
                                  <th
                                    className="sorting"
                                    tabindex="0"
                                    aria-controls="order-listing"
                                    rowspan="1"
                                    colspan="1"
                                    aria-label="Ship to: activate to sort column ascending"
                                    style={{ width: "116.672px" }}
                                  >
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {countries && countries.map((country,index)=>(
                                  <tr className="odd">
                                  <td className="sorting_1">{index+1}</td>
                                  <td>{country.countryName}</td>
                                  <td>
                                    <label className={`badge ${country.status=='1'?'badge-success':'badge-danger'}`}>
                                    {country.status=='1'?'Active':'Inactive'}
                                    </label>
                                  </td>
                                  <td>
                                    <ion-icon
                                      name="trash-outline"
                                      color="danger"
                                      style={{ marginRight: "10px" }}
                                      onClick={()=>deleteCountry(country.id)}
                                    ></ion-icon>
                                    <ion-icon
                                      onClick={()=> openModal(country.countryName,country.id)}
                                      name="create-outline"
                                      color="primary"
                                    ></ion-icon>
                                  </td>
                                  </tr>
                                ))}
                               
                              
                              </tbody>
                            </table>
                            
                            <div
                              style={modalStyle}
                              // className={`modal ${showModal?' show':'fade'}`}
                              className="modal fade"
                              id="countryModal"
                              tabindex="-1"
                              aria-labelledby="exampleModalLabel"
                              // style={{ display: "none" }}
                              aria-hidden="true"
                              data-backdrop="false"
                            >
                              <div
                                className="modal-dialog modal-md"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLabel"
                                    >
                                      {isUpdate?'Edit':'Add'} Country
                                    </h5>
                                    <button
                                      type="button"
                                      className="close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                      onClick={handleCloseModal}
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <form >
                                  <div className="modal-body">
                                    

                                    
                                    <div className="form-group">
                                      <label>Country Name</label>
                                      <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="Enter Country Name"
                                        aria-label="Username"
                                        value={countryName}
                                        onChange={(e)=>{
                                          setCountryName(e.target.value)
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                      onClick={()=>{
                                        {isUpdate?updateCountry():addCountry()}
                                      }}
                                    >
                                      Submit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-light"
                                      data-bs-dismiss="modal"
                                      onClick={handleCloseModal}
                                    >
                                      Cancel
                                    </button>
                                   
                                  </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                           
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 col-md-5">
                            <div
                              className="dataTables_info"
                              id="order-listing_info"
                              role="status"
                              aria-live="polite"
                            >
                              Showing 1 to 10 of 10 entries
                            </div>
                          </div>
                          <div className="col-sm-12 col-md-7">
                            <div
                              className="dataTables_paginate paging_simple_numbers"
                              id="order-listing_paginate"
                            >
                              <ul className="pagination">
                                <li
                                  className="paginate_button page-item previous disabled"
                                  id="order-listing_previous"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="previous"
                                    tabindex="-1"
                                    className="page-link"
                                  >
                                    Previous
                                  </a>
                                </li>
                                <li className="paginate_button page-item active">
                                  <a
                                    href="https://demo.bootstrapdash.com/skydash/themes/vertical-default-light/pages/tables/data-table.html#"
                                    aria-controls="order-listing"
                                    role="link"
                                    aria-current="page"
                                    data-dt-idx="0"
                                    tabindex="0"
                                    className="page-link"
                                  >
                                    1
                                  </a>
                                </li>
                                <li
                                  className="paginate_button page-item next disabled"
                                  id="order-listing_next"
                                >
                                  <a
                                    aria-controls="order-listing"
                                    aria-disabled="true"
                                    role="link"
                                    data-dt-idx="next"
                                    tabindex="-1"
                                    className="page-link"
                                  >
                                    Next
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
            </div>
          </div>
          <Footer></Footer>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default CountryMaster;
