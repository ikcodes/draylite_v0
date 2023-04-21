import axios from "axios";
import { Box, Button, Card, Text } from "grommet";
import { Add, FormClose } from "grommet-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import { WarehouseDetailsProps, Contact } from "../../utils/types";
import { API_URL } from "../../utils/utils";
import { ContactForm } from "../contacts/ContactForm";
import { ContactListItem } from "../contacts/ContactsListItem";
import { ContactFormWarehouse } from "../contacts/ContactFormWarehouse";

export const WarehouseContactsList = (props: WarehouseDetailsProps) => {
  const [mode, setMode] = useState<string>("");
  const { warehouse, contacts, refresh } = props as any;
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
    <>
      {/* ==================== */}
      {/*   CONTACTS FOR (x)   */}
      {/* ==================== */}
      <Box direction='row-responsive' justify='between' pad={{ top: "small", right: "xsmall" }}>
        <Box>
          <h1>Contacts</h1>
        </Box>
        <Box pad={{ top: "5px" }}>
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
            <ContactFormWarehouse
              mode={"add"}
              resetForm={resetForm}
              warehouseId={warehouse?.warehouse_id}
            />
          )}
          <Box>
            {contacts && (
              <Box direction='column' gap='small'>
                {contacts.map((con: Contact) => {
                  if (con.contact_id === editingContactId && mode === "edit") {
                    return (
                      <ContactFormWarehouse mode={"edit"} contact={con} resetForm={resetForm} />
                    );
                  } else {
                    return (
                      <Box basis='1/2'>
                        <ContactListItem
                          contact={con}
                          editContact={editContact}
                          deleteContact={deleteContact}
                        />
                      </Box>
                    );
                  }
                })}
              </Box>
            )}
            {!contacts?.length && <Text>No contacts currently exist for this warehouse.</Text>}
          </Box>
        </Box>
      </Box>
    </>
  );
};
