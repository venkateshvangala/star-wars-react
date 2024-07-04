import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../../shared/navbar/navbar";
import "./main-layout.scss";
import { APP_ROUTES } from "../../enums/app-routes.enum";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="row no-gutters content-container ">
        <>
          <div className="container-fluid app-filters-container p-0 mb-3">
            <ul className="d-flex align-items-center">
              <li>
                <NavLink
                  to={APP_ROUTES.APP_MANAGEMENT.STAR_WAR}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <span>Stars</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={APP_ROUTES.APP_MANAGEMENT.STARS}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <span>Planets</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={APP_ROUTES.APP_MANAGEMENT.FILMS}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <span>Films</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={APP_ROUTES.APP_MANAGEMENT.VEHICLES}
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <span>Vehicle</span>
                </NavLink>
              </li>
            </ul>
            <div className="container-fluid px-0 mt-3">
              <Outlet />
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default MainLayout;
