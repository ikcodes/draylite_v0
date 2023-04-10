import "../styles/App.css";
import { BrowserRouter as Router, Route, Link, useParams, Routes } from "react-router-dom";
import { Carriers } from "./carriers/Carriers";
import { Box, Grommet, Header, Nav, Text, Image, Avatar } from "grommet";
import { hpe } from "grommet-theme-hpe";
import { Toaster } from "react-hot-toast";
import { Ports } from "./ports/Ports";

const navItems = [
  {
    href: "/",
    label: "View All Ports",
  },
];

const App = () => (
  <>
    <Router>
      <Grommet full theme={hpe}>
        <Header background='dark-1' pad='small'>
          <Nav direction='row' align='left' gap='medium'>
            <Link to='/'>
              <Box direction='row'>
                <Box>
                  <Avatar size='medium' src='/favicon.ico' round='large' align='right' />
                </Box>
                <Box>
                  <Text
                    style={{
                      color: "white",
                      paddingLeft: 20,
                      paddingTop: 10,
                      fontSize: 20,
                      fontWeight: "bold",
                      letterSpacing: 1,
                    }}
                  >
                    Draylite
                  </Text>
                </Box>
              </Box>
            </Link>
            {/*
            {navItems.map((item) => (
              <Link to={item.href} key={item.label}>
                <Text style={{ paddingLeft: 37 }} color='white'>
                  {item.label}
                </Text>
              </Link>
            ))}
            */}
          </Nav>
        </Header>
        <Routes>
          <Route path='/port/:portId/carriers' element={<Carriers />} />
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
