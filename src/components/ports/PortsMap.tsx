import { Box, Grid, Text, WorldMap } from "grommet";
import { Link, useNavigate } from "react-router-dom";

interface PortsMapProps {
  ports: any[];
}

const placeProps = (name: string, link: string) => ({
  name,
  color: "#1BC5E7",
  ...{
    content: (
      <Box
        pad={{ horizontal: "small", vertical: "xsmall" }}
        background='#1BC5E7'
        style={{ cursor: "pointer" as any }}
      >
        <Link
          to={link}
          style={{
            color: "white",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          <Text>{name}</Text>
        </Link>
      </Box>
    ),
    dropProps: {
      align: { left: "right" },
      background: { color: "#1BC5E7", opacity: "strong" },
      elevation: "medium",
      margin: { left: "small" },
      round: "xsmall",
    },
  },
});

const mapContainerStyle = {
  // Todo: integrate this with the nav
  backgroundColor: "rgb(51, 51, 51)",
  overflow: "hidden",
  position: "relative" as any,
  height: "80vh",
  width: "100%",
};

const mapStyle = {
  position: "absolute" as any,
  left: 50,
  right: 50,
  top: 0,
  bottom: 0,
  height: "100%",
};

// PORTS MAP: Render a map of the U.S.
//  where clicking a point redirects
//  the user to that port's landing page.
//=========================================
export const PortsMap = (props: PortsMapProps) => {
  const navigate = useNavigate();

  // PORTS (Mapped dynamically from DB lat/lng)
  //===========================================
  const portsMapped = props?.ports?.map((port) => {
    const portLink = `/port/${port?.port_id}`;

    return {
      // location: [34.05, -118.25],
      location: [port?.port_lat, port?.port_lng],
      ...placeProps(port?.port_name, portLink),
      onClick: () => navigate(portLink),
    };
  });

  // PORTS (Mapped statically)
  //===========================
  const portsMappedStatic = [
    [
      {
        location: [42.358056, -71.063611],
        ...placeProps("Boston", "graph-1"),
      },
      {
        location: [34.05, -118.25],
        ...placeProps("Los Angeles", "graph-1"),
        onClick: () => navigate("/"),
      },
    ] as any,
  ];

  // RENDER MAP
  //===============
  return (
    <Grid>
      <Box align='center' pad={"none"}>
        <div style={mapContainerStyle}>
          <WorldMap
            viewBox='0 50 100 250'
            style={mapStyle}
            continents={[
              {
                name: "North America",
                color: "#ca2e21",
              },
            ]}
            places={portsMapped.length ? portsMapped : ([] as any)}
          />
        </div>
      </Box>
    </Grid>
  );
};
