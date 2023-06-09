import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Carriers } from "../pages/Carriers";
import { AppNavigation } from "./shared/AppNavigation";
import { Grommet } from "grommet";
import { Toaster } from "react-hot-toast";
import { Ports } from "../pages/Ports";
import { Warehouses } from "../pages/Warehouses";
import { Port } from "../pages/Port";
import { Carrier } from "../pages/Carrier";
import { customTheme } from "../styles/grommet-theme";
import { AppFooter } from "./shared/AppFooter";
import { Warehouse } from "../pages/Warehouse";

const App = () => (
  <Router>
    <Grommet full theme={{ ...customTheme }}>
      <AppNavigation />
      <Routes>
        <Route path='/carrier/:carrierId' element={<Carrier />} />
        <Route path='/warehouse/:warehouseId' element={<Warehouse />} />
        <Route path='/port/:portId/carriers' element={<Carriers />} />
        <Route path='/port/:portId/warehouses' element={<Warehouses />} />
        <Route path='/port/:portId' element={<Port />} />
        <Route path='/' element={<Ports />} />
      </Routes>
      <AppFooter />
    </Grommet>

    {/*  GLOBAL TOASTER: UI popup notifs  */}
    <Toaster position='bottom-center' reverseOrder={false} />
  </Router>
);

export default App;
