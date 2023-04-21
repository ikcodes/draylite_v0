import { Layer } from "grommet-icons";
import { ContactListItemProps } from "../../utils/types";
import { Box, Button, Card, Text, Tip } from "grommet";
import toast from "react-hot-toast";

export const ContactListItem = (props: ContactListItemProps) => (
  // <Box height='large'>
  <Card
    key={`contact-list-item-${props.contact.contact_id}`}
    pad='small'
    background='light-1'
    flex='grow'
  >
    <Box pad='small'>
      <Text size='large'>
        <strong>{props.contact.contact_name}</strong>
      </Text>
    </Box>
    <Box pad='small'>
      {props.contact.contact_email !== " " && (
        <Text margin={{ bottom: "xsmall" }}>
          <strong style={{ fontWeight: 600 }}>Email: </strong>
          <a href={`mailto:${props.contact.contact_email}`}>{props.contact.contact_email}</a>
          <Tip content='Copy email address...' dropProps={{ align: { left: "right" } }}>
            <Layer
              size='small'
              style={{ stroke: "#666", paddingLeft: 10, cursor: "pointer" as any }}
              onClick={() => {
                navigator.clipboard.writeText(props.contact.contact_email);
                toast.success("Copied email address to clipboard.");
              }}
            />
          </Tip>
        </Text>
      )}
      {props.contact.contact_phone !== " " && (
        <Text margin={{ bottom: "xsmall" }}>
          <strong style={{ fontWeight: 600 }}>Phone: </strong>
          <a href={`tel:${props.contact.contact_phone}`}>{props.contact.contact_phone}</a>
          <Tip content='Copy phone number...' dropProps={{ align: { left: "right" } }}>
            <Layer
              size='small'
              style={{ stroke: "#666", paddingLeft: 10, cursor: "pointer" as any }}
              onClick={() => {
                navigator.clipboard.writeText(props.contact.contact_phone);
                toast.success("Copied phone number to clipboard.");
              }}
            />
          </Tip>
        </Text>
      )}
      {props.contact.contact_notes !== " " && (
        <Text margin={{ bottom: "xsmall" }}>
          <strong style={{ fontWeight: 600 }}>Notes: </strong>
          {props.contact.contact_notes}
        </Text>
      )}
      {props.contact.contact_notes === " " &&
        props.contact.contact_phone === " " &&
        props.contact.contact_email === " " && <Text>No info yet. Edit contact to add some!</Text>}
    </Box>
    <Box direction='row-responsive' pad={{ top: "small" }}>
      <Box pad={{ right: "small" }}>
        <Button
          size='small'
          label='Edit Contact'
          onClick={() => props.editContact(props.contact.contact_id)}
          primary
          style={{ fontWeight: 600 }}
        />
      </Box>
      <Box>
        <Button
          size='small'
          label='Delete Contact'
          onClick={() => props.deleteContact(props.contact.contact_id)}
          secondary
          style={{ fontWeight: 600 }}
        />
      </Box>
    </Box>
  </Card>
  // </Box>
);
