import { ContactListItemProps } from "../../utils/types";
import { Button, Text } from "grommet";

export const ContactListItem = (props: ContactListItemProps) => (
  <li
    key={`contact-list-item-${props.contact.contact_id}`}
    style={{
      marginTop: 10,
      marginBottom: 20,
      padding: 10,
    }}
  >
    <Text size='large'>
      <strong>{props.contact.contact_name}</strong>
    </Text>
    <ul style={{ marginTop: 5, marginBottom: 0 }}>
      {props.contact.contact_email !== " " && (
        <li>
          <a href={`mailto:${props.contact.contact_email}`}>{props.contact.contact_email}</a>
        </li>
      )}
      {props.contact.contact_phone !== " " && (
        <a href={`tel:${props.contact.contact_phone}`}>
          <li>{props.contact.contact_phone}</li>
        </a>
      )}
      {props.contact.contact_notes !== " " && <li>{props.contact.contact_notes}</li>}
      {props.contact.contact_notes === " " &&
        props.contact.contact_phone === " " &&
        props.contact.contact_email === " " && <li>No info yet. Edit contact to add some!</li>}
    </ul>
    <Button
      style={{ marginTop: 10, marginRight: 5 }}
      size='small'
      primary
      label='Edit Contact'
      onClick={() => props.editContact(props.contact.contact_id)}
    />
    <Button
      size='small'
      label='Delete Contact'
      onClick={() => props.deleteContact(props.contact.contact_id)}
      secondary
    />
  </li>
);
