import "./navbar.scss";

export const Navbar = () => {
  return (
    <div className="container-fluid  nav-bar-container">
      <span>STAR WARS</span>
      <div className="d-flex align-items-center">
        <span className="c3crm-bell mr-4 pointer"></span>
        <div className="profile-container">
          <span className="c3crm-user-circle mr-2"></span>
          <span> Manoj Kumar V</span>
        </div>
      </div>
    </div>
  );
};
