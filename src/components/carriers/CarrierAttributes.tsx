import { Box, Text } from "grommet";
import { Trophy, Optimize, Test, Transaction } from "grommet-icons";
import { Carrier } from "../../utils/types";

interface CarrierAttributesProps {
  carrier: Carrier;
}

export const CarrierAttributes = (props: CarrierAttributesProps) => (
  <Box direction='row-responsive' style={{ minWidth: 350 }}>
    <Box direction='column' pad='small'>
      <Box
        align='center'
        pad={{ top: "13px" }}
        style={{
          borderRadius: "100%",
          backgroundColor: props.carrier.carrier_preferred ? "#1BC5E7" : "#ddd",
          marginLeft: 8,
          marginBottom: 4,
        }}
        height='50px'
        width='50px'
      >
        <Trophy color='white' />
      </Box>
      <Box align='center'>
        <Text
          color={props.carrier.carrier_preferred ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.carrier.carrier_preferred ? {} : { textDecoration: "line-through" as any }}
          weight={700}
        >
          Preferred
        </Text>
      </Box>
    </Box>
    <Box direction='column' pad='small'>
      <Box
        align='center'
        pad={{ top: "13px" }}
        style={{
          borderRadius: "100%",
          backgroundColor: props.carrier.carrier_overweight ? "#1BC5E7" : "#ddd",
          marginLeft: 14,
          marginBottom: 4,
        }}
        height='50px'
        width='50px'
      >
        <Optimize color='white' />
      </Box>
      <Box align='center'>
        <Text
          color={props.carrier.carrier_overweight ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.carrier.carrier_overweight ? {} : { textDecoration: "line-through" as any }}
          weight={700}
        >
          Overweight
        </Text>
      </Box>
    </Box>
    <Box direction='column' pad='small'>
      <Box
        align='center'
        pad={{ top: "13px" }}
        style={{
          borderRadius: "100%",
          backgroundColor: props.carrier.carrier_hazmat ? "#1BC5E7" : "#ddd",
          marginLeft: 1,
          marginBottom: 4,
        }}
        height='50px'
        width='50px'
      >
        <Test color='white' />
      </Box>
      <Box align='center'>
        <Text
          color={props.carrier.carrier_hazmat ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.carrier.carrier_hazmat ? {} : { textDecoration: "line-through" as any }}
          weight={700}
        >
          Hazmat
        </Text>
      </Box>
    </Box>
    <Box direction='column' pad='small'>
      <Box
        align='center'
        pad={{ top: "13px" }}
        style={{
          borderRadius: "100%",
          backgroundColor: props.carrier.carrier_transload ? "#1BC5E7" : "#ddd",
          marginLeft: 10,
          marginBottom: 4,
        }}
        height='50px'
        width='50px'
      >
        <Transaction color='white' />
      </Box>
      <Box align='center'>
        <Text
          color={props.carrier.carrier_transload ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.carrier.carrier_transload ? {} : { textDecoration: "line-through" as any }}
          weight={700}
        >
          Transload
        </Text>
      </Box>
    </Box>
  </Box>
);
