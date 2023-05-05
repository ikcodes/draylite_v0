// Like Carrier and Warehouse attributes, but suitable for both!
import { Trophy, Optimize, Test, Transaction } from "grommet-icons";
import { Box, Text } from "grommet";

interface EntityAttributes {
  preferred: boolean;
  overweight: boolean;
  hazmat: boolean;
  transload: boolean;
}

export const EntityAttributes = (props: EntityAttributes) => (
  <Box direction='row-responsive' style={{ minWidth: 350 }}>
    <Box direction='column' pad='small'>
      <Box
        align='center'
        pad={{ top: "13px" }}
        style={{
          borderRadius: "100%",
          backgroundColor: props.preferred ? "#1BC5E7" : "#ddd",
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
          color={props.preferred ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.preferred ? {} : { textDecoration: "line-through" as any }}
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
          backgroundColor: props.overweight ? "#1BC5E7" : "#ddd",
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
          color={props.overweight ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.overweight ? {} : { textDecoration: "line-through" as any }}
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
          backgroundColor: props.hazmat ? "#1BC5E7" : "#ddd",
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
          color={props.hazmat ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.hazmat ? {} : { textDecoration: "line-through" as any }}
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
          backgroundColor: props.transload ? "#1BC5E7" : "#ddd",
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
          color={props.transload ? "#1BC5E7" : "#ddd"}
          size='small'
          style={props.transload ? {} : { textDecoration: "line-through" as any }}
          weight={700}
        >
          Transload
        </Text>
      </Box>
    </Box>
  </Box>
);
