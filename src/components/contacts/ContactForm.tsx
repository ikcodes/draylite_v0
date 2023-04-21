import axios from "axios";
import { TextInput, Button, FormField, Box, MaskedInput, Card, Spinner, Text } from "grommet";
import toast from "react-hot-toast";
import { API_URL, emailMask, phoneMask } from "../../utils/utils";
import { ContactFormProps } from "../../utils/types";
import { Formik, FormikValues } from "formik";
import { useState } from "react";

export const ContactForm = (props: ContactFormProps) => {
  const { contact, mode, resetForm, carrierId } = props;

  const [formLoading, setFormLoading] = useState(false);

  const blankContact = {
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    contact_notes: "",
    carrier_id: carrierId,
  };

  const handleSubmission = (data: FormikValues) => {
    setFormLoading(true);
    let postData = { ...data };
    //
    // ADD CONTACT TO CARRIER
    // ========================
    if (mode === "add") {
      axios
        .post(`${API_URL}/contacts/create`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing contact - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed contact!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing contact - please refresh and try again`);
          console.log(error);
        })
        .finally(() => {
          setFormLoading(false);
          resetForm();
        });
    }
    //
    // EDIT EXISTING CARRIER
    // ========================
    else if (mode === "edit") {
      axios
        .put(`${API_URL}/contacts/update/${contact?.contact_id}`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing contact - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed carrier!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing contact - please refresh and try again`);
          console.log(error);
        })
        .finally(() => {
          setFormLoading(false);
          resetForm();
        });
    } else {
      alert("Mode did not match add or edit!");
    }
  };

  return (
    <Formik initialValues={contact || blankContact} onSubmit={(values) => handleSubmission(values)}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} style={{ paddingTop: 0, paddingBottom: 30 }}>
          <Card background='light-1' pad={{ top: "xsmall", horizontal: "medium" }}>
            {formLoading && (
              <Box align='center' direction='row-responsive' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Saving Contact data...</Text>
              </Box>
            )}

            {!formLoading && (
              <>
                {carrierId && <input type='hidden' name='carrier_id' value={carrierId} />}
                <h3>{mode === "add" ? "Adding New" : "Editing"} Contact</h3>
                <Box pad='none'>
                  <FormField label='Contact Name'>
                    <TextInput
                      name='contact_name'
                      onChange={handleChange}
                      value={values.contact_name}
                    />
                  </FormField>
                  <FormField label='Phone'>
                    <MaskedInput
                      name='contact_phone'
                      onChange={handleChange}
                      value={values.contact_phone}
                      mask={phoneMask}
                    />
                  </FormField>
                  <FormField label='Email'>
                    <MaskedInput
                      mask={emailMask}
                      name='contact_email'
                      onChange={handleChange}
                      value={values.contact_email}
                    />
                  </FormField>
                  {/* Notes */}
                  <FormField label='Notes'>
                    <TextInput
                      name='contact_notes'
                      onChange={handleChange}
                      value={values.contact_notes}
                    />
                  </FormField>
                  <Box direction='row-responsive'>
                    <Box width='small' pad={{ vertical: "medium", right: "medium" }}>
                      <Button label={"Save Contact"} primary type='submit' />
                    </Box>
                    <Box width='small' pad={{ vertical: "medium" }}>
                      <Button label={"Cancel"} secondary onClick={() => resetForm(false)} />
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};
