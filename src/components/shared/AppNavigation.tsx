import { Box, Header, Nav, Text, Avatar, DropButton, Heading, Button } from "grommet";
import { Link } from "react-router-dom";
import { navDrayliteStyles } from "../../utils/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/utils";
import { Port } from "../../utils/types";

const portsMenuStyles = {};

export const AppNavigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const [ports, setPorts] = useState([]);

  const getPorts = () => {
    const apiUrl = `${API_URL}/ports`;
    axios.get(apiUrl).then((res) => {
      setPorts(res.data.data);
    });
  };

  useEffect(() => getPorts(), []);

  const DropContent = () => (
    <Box pad='small' style={portsMenuStyles}>
      <Box>{ports?.map((port: any) => portLink(port))}</Box>
    </Box>
  );

  const portLink = (port: Port) => (
    <Link key={`nav-port-${port.port_id}`} to={`/port/${port.port_id}`}>
      <Box pad={{ vertical: "small" }}>
        <Text color={"light-1"}>{port.port_name}</Text>
      </Box>
    </Link>
  );

  return (
    <Header background='dark-1' pad='small'>
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
      <Nav direction='row' gap='medium' justify='between'>
        <DropButton
          primary
          label='Select A Port'
          open={menuOpen}
          onOpen={() => setMenuOpen(true)}
          onClose={() => setMenuOpen(false)}
          dropContent={<DropContent />}
          dropProps={{ align: { top: "bottom" } }}
        />
      </Nav>
    </Header>
  );
};

// Hardcoded array of nav links
/*
const navItems = [
  {
    href: "/",
    label: "View All Ports",
  },
];
*/

// And how to render them
{
  /*
        {navItems.map((item) => (
          <Link to={item.href} key={item.label}>
            <Text style={{ paddingLeft: 37 }} color='white'>
              {item.label}
            </Text>
          </Link>
        ))}
      */
}
