import { Box, Text } from "grommet";
import { View, Edit, Trash } from "grommet-icons";
import { Tooltip } from "./Tooltip";
import { buttonStyles } from "../../utils/styles";

interface ActionBoxProps {
  actionButtonClick: () => void;
  mode: "view" | "edit" | "delete";
  toolTipText: string;
}

export const ActionBox = (props: ActionBoxProps) => (
  <Box align='center' pad={"none"} width='xxsmall'>
    <Text
      tip={{
        plain: true,
        dropProps: { align: { bottom: "top" } },
        content: Tooltip(props.toolTipText),
      }}
    >
      {props.mode === "view" && (
        <View style={buttonStyles} onClick={() => props.actionButtonClick()} />
      )}
      {props.mode === "edit" && (
        <Edit style={buttonStyles} onClick={() => props.actionButtonClick()} />
      )}
      {props.mode === "delete" && (
        <Trash style={buttonStyles} onClick={() => props.actionButtonClick()} />
      )}
    </Text>
  </Box>
);
