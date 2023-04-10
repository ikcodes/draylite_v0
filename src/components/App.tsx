import "../styles/App.css";
import { BrowserRouter as Router, Route, Link, useParams, Routes } from "react-router-dom";
import { Carriers } from "./carriers/Carriers";
import { AppNavigation } from "./shared/AppNavigation";
import { Grommet } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Toaster } from "react-hot-toast";
import { Ports } from "./ports/Ports";
import { Warehouses } from "./warehouses/Warehouses";

const App = () => (
  <>
    <Router>
      <Grommet full theme={hpe}>
        <AppNavigation />
        <Routes>
          <Route path='/port/:portId/carriers' element={<Carriers />} />
          <Route path='/port/:portId/warehouses' element={<Warehouses />} />
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
