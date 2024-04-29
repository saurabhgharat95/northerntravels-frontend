import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");


  const navItems = [
    { path: "/", label: "Dashboard", icon: "home-outline" },
    {
      path: "/quotations",
      label: "Quotation Management",
      icon: "document-text-outline",
    },
    {
      path: "/maintain-rooms",
      label: "Hotel Room Management",
      icon: "business-outline",
    },
    { path: "/tours", label: "Tour Management", icon: "map-outline" },
    { path: "/leads", label: "Lead Management", icon: "people-outline" },
    {
      label: "Masters",
      icon: "list-outline",
      subItems: [
        { path: "/countries", label: "Countries", icon: "earth-outline" },
        { path: "/states",label: "State / Location",icon: "location-outline"},
        { path: "/transit-pts", label: "Transit points", icon: "location-outline" },
        { path: "/destinations", label: "Destinations", icon: "compass-outline" },
        { path: "/hotel-type", label: "Hotel Type", icon: "business-outline" },
        { path: "/halting-dest", label: "Halting Destinations", icon: "location-outline" },
        { path: "/hotels", label: "Hotels", icon: "business-outline" },
        { path: "/cars", label: "Vehicles", icon: "car-sport-outline" },
        { path: "/meal-types", label: "Meal Type", icon: "restaurant-outline" },
        { path: "/room-types", label: "Room Type", icon: "business-outline" },
      ],
    },
  ];
  const subMenuPaths = [
    "/countries",
    "/states",
    ,
    "/transit-pts",
    "/destinations",
    "/hotel-type",
    "/halting-dest",
    "/hotels",
    "/cars",
    "/meal-types",
    "/room-types",
  ];
  useEffect(() => {
    // Find the nav-link that matches the current URL pathname
    const currentPath = location.pathname;
    setActiveItem(currentPath);
  }, [location]);
  return (
    // <div>
    //   <nav
    //     className="sidebar sidebar-offcanvas"
    //     id="sidebar"
    //     style={{width:props.isSidebarOpen?"260px":"86px"}}
    //   >
    //     <ul className="nav">
    //       <li className="nav-item">
    //         <a className="nav-link" href="/">
    //           <i className="menu-icon">
    //             <ion-icon name="home-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Dashboard</span>
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" onClick={()=>navigate('/quotations')} >
    //           <i className="menu-icon">
    //             <ion-icon name="document-text-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Quotation Management</span>
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link"  onClick={()=>navigate('/maintain-rooms')}>
    //           <i className="menu-icon">
    //             <ion-icon name="business-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Hotel Room Management</span>
    //         </a>
    //       </li>

    //       <li className="nav-item">
    //         <a className="nav-link"  onClick={()=>navigate('/tours')}>
    //           <i className="menu-icon">
    //             <ion-icon name="map-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Tour Management</span>
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link"  onClick={()=>navigate('/leads')}>
    //           <i className="menu-icon">
    //             <ion-icon name="people-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Lead Management</span>
    //         </a>
    //       </li>

    //        <li className="nav-item">
    //         <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
    //           <i className="menu-icon">
    //             <ion-icon name="list-outline"></ion-icon>
    //           </i>
    //           <span className="menu-title">Masters</span>
    //           <i className="menu-arrow"></i>
    //         </a>
    //         <div className="collapse" id="ui-basic">
    //           <ul className="nav flex-column sub-menu">
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/countries')} >Countries</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/states')} >State / Location</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/transit-pts')} >Transit points </a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/destinations')} >Destinations</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/hotel-type')} >Hotel Type</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/halting-dest')} >Halting Destinations</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/hotels')} >Hotels</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/cars')} >Vehicles</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/meal-types')} >Meal Type</a></li>
    //             <li className="nav-item"> <a className="nav-link" onClick={()=>navigate('/room-types')} >Room Type</a></li>
    //           </ul>
    //         </div>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>
    <div>
      <nav
        className="sidebar sidebar-offcanvas"
        id="sidebar"
        style={{ width: props.isSidebarOpen ? "260px" : "86px" }}
      >
        <ul className="nav" >
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`nav-item ${activeItem === item.path ? "active" : ""}`}
              
            >
              {item.subItems ? (
                <>
                  <a
                    className="nav-link"
                    data-toggle="collapse"
                    href={`#${item.label.replace(/\s/g, "-")}`}
                    aria-expanded={
                      subMenuPaths
                        ? subMenuPaths.includes(activeItem)
                          ? "true"
                          : "false"
                        : "false"
                    }
                    aria-controls={item.label.replace(/\s/g, "-")}
                  >
                    <i className="menu-icon">
                      <ion-icon name={item.icon}></ion-icon>
                    </i>
                    <span className="menu-title">{item.label}</span>
                    <i className="menu-arrow"></i>
                  </a>
                  <div
                    className={`collapse ${
                      subMenuPaths
                        ? subMenuPaths.includes(activeItem)
                          ? "show"
                          : ""
                        : ""
                    }`}
                    id={item.label.replace(/\s/g, "-")}
                  >
                    <ul className="nav flex-column sub-menu" >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="nav-item">
                          <a
                            className={`nav-link ${
                              activeItem === subItem.path ? "active" : ""
                            }`}
                            onClick={(event) => {
                              event.preventDefault();
                              event.stopPropagation();
                              navigate(subItem.path);
                            }}
                            href=""
                          >
                            <ion-icon  name={subItem.icon}></ion-icon>
                           <span className="ml-2">{subItem.label}</span> 
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <a
                  className={`nav-link ${
                    activeItem === item.path ? "active" : ""
                  }`}
                  onClick={(e) => {
                    navigate(item.path);
                    e.preventDefault();
                  }}
                  href="#"
                >
                  <i className="menu-icon">
                    <ion-icon name={item.icon}></ion-icon>
                  </i>
                  <span className="menu-title">{item.label}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
