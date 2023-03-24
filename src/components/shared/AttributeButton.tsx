import { Box, Text } from "grommet";
import { Optimize, Test, Trophy } from "grommet-icons";
import { Tooltip } from "./Tooltip";

interface AttributeButtonProps {
  icon: "hazmat" | "overweight" | "preferred";
  text: string;
}

export const AttributeButton = (props: AttributeButtonProps) => (
  <Box
    align='center'
    pad={{ vertical: "xsmall" }}
    style={{
      borderRadius: "20%",
      border: "2px solid #fefefe",
      paddingTop: 8,
      paddingBottom: 0,
    }}
    width='xxsmall'
  >
    <Text
      tip={{
        plain: true,
        dropProps: { align: { bottom: "top" } },
        content: Tooltip(props.text),
      }}
    >
      {props.icon == "hazmat" && <Test />}
      {props.icon == "overweight" && <Optimize />}
      {props.icon == "preferred" && <Trophy />}
    </Text>
  </Box>
);
