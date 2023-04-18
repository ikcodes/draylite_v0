import axios from "axios";
import { Box, Button, Card } from "grommet";
import { Add, FormClose } from "grommet-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { CarrierDetailsProps, Contact } from "../../utils/types";
import { API_URL } from "../../utils/utils";
import { ContactForm } from "../contacts/ContactForm";
import { ContactListItem } from "../contacts/ContactsListItem";

export const CarrierContactsList = (props: CarrierDetailsProps) => {
  const [mode, setMode] = useState<string>("");
  const { carrier, contacts, refresh } = props as any;
  const [editingContactId, setEditingContactId] = useState<number>();

  //====================
  // CONTACT FUNCTIONS
  //====================
  const resetForm = (fetchNew: boolean = true) => {
    setEditingContactId(undefined);
    setMode("");
    // When cancelling, we don't want to completely reload the page.
    if (fetchNew) {
      refresh();
    }
  };
  const editContact = (contactId: number) => {
    setMode("edit");
    setEditingContactId(contactId);
  };
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

  //=====================
  // CONTACT LIST MARKUP
  //=====================
  return (
    <Box pad='small' gap='small' width='xlarge'>
      {/* ==================== */}
      {/*   CONTACTS FOR (x)   */}
      {/* ==================== */}
      <Box direction='row-responsive' justify='between' align='left' gap='medium'>
        <Box style={{ marginTop: 15 }}>
          <h1>Contacts</h1>
        </Box>
        <Box align='middle'>
          <Button
            primary
            disabled={mode === "add" || mode === "edit"}
            icon={<Add />}
            label='Add Contact'
            onClick={() => setMode("add")}
            style={{ marginTop: 5 }}
          />
        </Box>
      </Box>
      <Box>
        <Box>
          {/* ==================== */}
          {/*   ADD CONTACT FORM   */}
          {/* ==================== */}
          {mode === "add" && (
            <ContactForm mode={"add"} resetForm={resetForm} carrierId={carrier?.carrier_id} />
          )}
          <ul style={{ marginTop: 0, paddingLeft: 0, listStyle: "none" }}>
            {contacts && (
              <>
                {contacts.map((con: Contact) => {
                  if (con.contact_id === editingContactId && mode === "edit") {
                    return <ContactForm mode={"edit"} contact={con} resetForm={resetForm} />;
                  } else {
                    return (
                      <ContactListItem
                        contact={con}
                        editContact={editContact}
                        deleteContact={deleteContact}
                      />
                    );
                  }
                })}
              </>
            )}
            {!contacts?.length && <li>No contacts currently exist for this carrier.</li>}
          </ul>
        </Box>
      </Box>
    </Box>
  );
};
