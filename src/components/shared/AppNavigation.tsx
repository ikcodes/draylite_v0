import { Box, Header, Nav, Text, Avatar } from "grommet";
import { Link } from "react-router-dom";
import { navDrayliteStyles } from "../../utils/styles";

// Keep for now; you may want later.
/*
const navItems = [
  {
    href: "/",
    label: "View All Ports",
  },
];
*/

export const AppNavigation = () => (
  <Header background='dark-1' pad='small'>
    <Nav direction='row' align='left' gap='medium'>
      <Link to='/'>
        <Box direction='row'>
          <Box>
            <Avatar
              size='medium'
              src='/favicon.ico'
              round='large'
              align='right'
              style={{ marginLeft: 7 }}
            />
          </Box>
          <Box>
            <Text style={navDrayliteStyles}>
              Dray<span style={{ color: "#fff" }}>lite</span>
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
);
