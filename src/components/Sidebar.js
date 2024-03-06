const Sidebar = (props) => {
  console.log(props.isSidebarOpen)
  return (
    <div>
      <nav
        className="sidebar sidebar-offcanvas"
        id="sidebar"
        style={{width:props.isSidebarOpen?"260px":"86px"}}
      >
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link" href="index.html">
              <i className="menu-icon">
                <ion-icon name="home-outline"></ion-icon>
              </i>
              <span className="menu-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="menu-icon">
                <ion-icon name="document-text-outline"></ion-icon>
              </i>
              <span className="menu-title">Quotation Management</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="menu-icon">
                <ion-icon name="business-outline"></ion-icon>
              </i>
              <span className="menu-title">Hotel Room Management</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="menu-icon">
                <ion-icon name="car-outline"></ion-icon>
              </i>
              <span className="menu-title">Transport Management</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="menu-icon">
                <ion-icon name="map-outline"></ion-icon>
              </i>
              <span className="menu-title">Tour Management</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="menu-icon">
                <ion-icon name="people-outline"></ion-icon>
              </i>
              <span className="menu-title">Lead Management</span>
            </a>
          </li>
         
           <li className="nav-item">
            <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
              <i className="menu-icon">
                <ion-icon name="list-outline"></ion-icon>
              </i>
              <span className="menu-title">Masters</span>
              <i className="menu-arrow"></i>
            </a>
            <div className="collapse" id="ui-basic">
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <a className="nav-link" href="/countries">Countries</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/dropdowns.html">State / Location</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Start / End point </a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Destinations</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Hotel Type</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Halting Destinations</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Hotels</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Car</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Transportation</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Pickup / Drop point</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Meal Type</a></li>
                <li className="nav-item"> <a className="nav-link" href="pages/ui-features/typography.html">Room Type</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Sidebar;
