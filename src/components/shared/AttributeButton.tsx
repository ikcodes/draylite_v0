import { Box, Text } from "grommet";
import { Optimize, Test, Trophy } from "grommet-icons";
import { Tooltip } from "./Tooltip";
import { attributeButtonStyles } from "../../utils/styles";

interface AttributeButtonProps {
  icon: "hazmat" | "overweight" | "preferred";
  text: string;
}

export const AttributeButton = (props: AttributeButtonProps) => (
  <Box align='center' pad={{ vertical: "xsmall" }} style={attributeButtonStyles} width='xxsmall'>
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
