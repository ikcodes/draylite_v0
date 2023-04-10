import "../styles/App.css";
import { BrowserRouter as Router, Route, Link, useParams, Routes } from "react-router-dom";
import { Carriers } from "./carriers/Carriers";
import { Grommet, Header, Nav, Text, Image, Avatar } from "grommet";
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
            {navItems.map((item) => (
              <Link to={item.href} key={item.label}>
                <Text style={{ paddingLeft: 37 }} color='white'>
                  {item.label}
                </Text>
              </Link>
            ))}
          </Nav>
          <Link to='/'>
            <Avatar size='medium' src='/favicon.ico' round='large' align='right' />
          </Link>
        </Header>
        <Routes>
          <Route path='/port/:portId/carriers' element={<Carriers />} />
          <Route path='/' element={<Ports />} />
        </Routes>
      </Grommet>
      <Toaster position='bottom-center' reverseOrder={false} />
    </Router>
  </>
);

export default App;
