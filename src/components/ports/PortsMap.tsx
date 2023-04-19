import { Box, Grid, Text, WorldMap } from "grommet";
import { useNavigate } from "react-router-dom";

interface PortsMapProps {
  ports: any[];
}

const placeProps = (name: string, color: string) => ({
  name,
  color,
  ...{
    content: (
      <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
        <Text>{name}</Text>
      </Box>
    ),
    dropProps: {
      align: { left: "right" },
      background: { color, opacity: "strong" },
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
  position: "relative" as any, // FUCK YOUUUUU TS
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
    return {
      // location: [34.05, -118.25],
      location: [port?.port_lat, port?.port_lng],
      ...placeProps(port?.port_name, "graph-1"),
      onClick: () => navigate(`/port/${port?.port_id}`),
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
