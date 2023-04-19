import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Carriers } from "../pages/Carriers-NOT-USED";
import { AppNavigation } from "./shared/AppNavigation";
import { Box, Footer, Grommet, Main, Text } from "grommet";
import { Toaster } from "react-hot-toast";
import { Ports } from "../pages/Ports";
import { Warehouses } from "../pages/Warehouses";
import { Port } from "../pages/Port";
import { Carrier } from "../pages/Carrier";
import { customTheme } from "../styles/grommet-theme";

const App = () => (
  <>
    <Router>
      <Grommet full theme={{ ...customTheme }}>
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
        <Box>
          <Footer background='dark-2' justify='center' pad='small'>
            <Text textAlign='center' size='small'>
              © 2023 Gateway Logistics. All rights reserved.
            </Text>
          </Footer>
        </Box>
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
