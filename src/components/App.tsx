import "../styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Carriers } from "../pages/Carriers-NOT-USED";
import { AppNavigation } from "./shared/AppNavigation";
import { Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Toaster } from "react-hot-toast";
import { Ports } from "../pages/Ports";
import { Warehouses } from "../pages/Warehouses";
import { Port } from "../pages/Port";
import { Carrier } from "../pages/Carrier";

const App = () => (
  <>
    <Router>
      <Grommet full theme={hpe}>
        <AppNavigation />
        <Routes>
          {/* Edit individual carrier */}
          <Route path='/carrier/:carrierId' element={<Carrier />} />
          <Route path='/port/:portId/carriers' element={<Carriers />} />
          <Route path='/port/:portId/warehouses' element={<Warehouses />} />
          <Route path='/port/:portId' element={<Port />} />
          {/* View all things organized by port */}
          <Route path='/' element={<Ports />} />
        </Routes>
      </Grommet>
      {/* 
          GLOBAL TOASTER
        ======================
          UX notifs all pop up from here. 
          Use toast.succes(message) OR toast.error(message) 
      */}
      <Toaster position='bottom-center' reverseOrder={false} />
    </Router>
  </>
);

export default App;
