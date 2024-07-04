import { Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "./enums/app-routes.enum";
import MainLayout from "./layouts/main-layout/main-layout";
import { StarsPage } from "./pages/stars/stars.page";
import { StarsWarsPage } from "./pages/starswars/starswars.page";
import { VehiclesPage } from "./pages/vehicles/vehicles.page";
import { FilmsPage } from "./pages/films/films.page";

function App() {
  return (
    <div className="container-fluid px-0 main-app-container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<StarsWarsPage />}></Route>
          <Route
            path={APP_ROUTES.APP_MANAGEMENT.STARS}
            element={<StarsPage />}
          ></Route>
          <Route
            path={APP_ROUTES.APP_MANAGEMENT.FILMS}
            element={<FilmsPage />}
          ></Route>
          <Route
            path={APP_ROUTES.APP_MANAGEMENT.VEHICLES}
            element={<VehiclesPage />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
