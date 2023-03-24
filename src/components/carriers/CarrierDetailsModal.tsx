import axios from "axios";
import { Box, Button, Layer, Text } from "grommet";
import { Add, FormClose } from "grommet-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { CarrierDetailsModalProps, Contact, ContactListItemProps } from "../../utils/types";
import { API_URL } from "../../utils/utils";
import { ContactForm } from "../contacts/ContactForm";

export const CarrierDetailsModal = (props: CarrierDetailsModalProps) => {
  const [mode, setMode] = useState<string>("");
  const { carrier, getCarriers, setParentMode } = props;
  const [editingContactId, setEditingContactId] = useState<number>();

  //====================
  // CHILD COMPONENTS
  //====================
  const ContactListItem = (props: ContactListItemProps) => (
    <li
      style={{
        marginTop: 10,
        marginBottom: 20,
        border: "2px solid #eee",
        borderRadius: 5,
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
        onClick={() => editContact(props.contact.contact_id)}
      />
      <Button
        size='small'
        label='Delete Contact'
        onClick={() => deleteContact(props.contact.contact_id)}
      />
    </li>
  );

  //====================
  // PAGE MGMT
  //====================
  const editContact = (contactId: number) => {
    setMode("edit");
    setEditingContactId(contactId);
  };

  const resetForm = () => {
    setEditingContactId(undefined);
    getCarriers();
    setMode("");
  };

  //====================
  // API FUNCTIONS
  //====================
  const deleteContact = (contactId: number) => {
    axios
      .delete(`${API_URL}/contacts/${contactId}`)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Problem deleting contact - please refresh and try again");
          console.log(response.data);
        } else {
          toast.success("Successfully deleted contact!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => resetForm());
  };

  return (
    <Layer
      onEsc={() => setParentMode("")}
      onClickOutside={() => setParentMode("")}
      style={{ overflow: "scroll" }}
    >
      <Box pad='medium' gap='small' width='xlarge'>
        <h2 style={{ marginBottom: 15 }}>Contacts for {carrier?.carrier_name || "Carrier"}</h2>
        <ul style={{ marginTop: 0, paddingLeft: 0, listStyle: "none" }}>
          {carrier?.contacts && (
            <>
              {carrier.contacts.map((con: Contact) => {
                if (con.contact_id === editingContactId && mode === "edit") {
                  return <ContactForm mode={"edit"} contact={con} resetForm={resetForm} />;
                } else {
                  return <ContactListItem contact={con} />;
                }
              })}
            </>
          )}
          {!carrier?.contacts?.length && <li>No contacts currently exist for this carrier.</li>}
        </ul>
        <FormClose
          onClick={() => {
            resetForm();
            setParentMode("");
          }}
          cursor='pointer'
          style={{ position: "absolute", right: 10, top: 10 }}
        />
        <Box width='small'>
          <Button
            primary
            disabled={mode === "add" || mode === "edit"}
            icon={<Add />}
            label='Add Contact'
            onClick={() => setMode("add")}
          />
        </Box>
        {mode === "add" && (
          <ContactForm mode={"add"} resetForm={resetForm} carrierId={carrier?.carrier_id} />
        )}
      </Box>
    </Layer>
  );
};
