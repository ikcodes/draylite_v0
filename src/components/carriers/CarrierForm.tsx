import axios from "axios";
import { TextInput, Text, CheckBox, Button, Box, Grid, Card, Spinner } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { Formik, FormikValues } from "formik";
import { CarrierFormProps, blankCarrier } from "../../utils/types";
import { useState } from "react";

export const CarrierForm = (props: CarrierFormProps) => {
  const { carrier, mode, portId, resetForm } = props;

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmission = (data: FormikValues) => {
    if (!data.carrier_name) {
      toast.error("Please provide a carrier name to save one.");
      return;
    }

    let postData = { ...data };
    // api / db wants 1/0. all FE stuff is bool.
    postData["carrier_hazmat"] = postData["carrier_hazmat"] ? 1 : 0;
    postData["carrier_transload"] = postData["carrier_transload"] ? 1 : 0;
    postData["carrier_overweight"] = postData["carrier_overweight"] ? 1 : 0;
    postData["carrier_preferred"] = postData["carrier_preferred"] ? 1 : 0;
    postData["port_id"] = portId; // Can be number or string - both work.

    //
    // ADD NEW CARRIER
    // ==================
    if (mode === "add") {
      setFormLoading(true);
      axios
        .post(`${API_URL}/carriers/create`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing carrier - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed carrier!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing carrier - please refresh and try again`);
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
      setFormLoading(true);
      axios
        .put(`${API_URL}/carriers/update/${carrier?.carrier_id}`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing carrier - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed carrier!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing carrier - please refresh and try again`);
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
    <Formik initialValues={carrier || blankCarrier} onSubmit={(values) => handleSubmission(values)}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Card background='white' margin={{ bottom: "medium" }}>
            {formLoading && (
              <Box align='center' direction='row' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Saving Carrier...</Text>
              </Box>
            )}
            {!formLoading && (
              <>
                <Box pad='small'>
                  <h2 style={{ marginBottom: 0 }}>Adding New Carrier</h2>
                </Box>
                <Box pad='small'>
                  <TextInput
                    name='carrier_name'
                    onChange={handleChange}
                    value={values.carrier_name}
                    placeholder='Carrier Name...'
                  />
                </Box>
                <Box pad='small'>
                  <Grid columns='small'>
                    <Box align='start'>
                      <CheckBox
                        checked={values.carrier_preferred}
                        name='carrier_preferred'
                        label='Preferred'
                        onChange={handleChange}
                      />
                    </Box>
                    <Box align='start'>
                      <CheckBox
                        checked={values.carrier_overweight}
                        name='carrier_overweight'
                        label='Overweight'
                        onChange={handleChange}
                      />
                    </Box>
                    <Box align='start'>
                      <CheckBox
                        checked={values.carrier_hazmat}
                        name='carrier_hazmat'
                        label='Hazmat'
                        onChange={handleChange}
                      />
                    </Box>
                    <Box align='start'>
                      <CheckBox
                        checked={values.carrier_transload}
                        name='carrier_transload'
                        label='Transload'
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box margin={{ vertical: "medium", horizontal: "small" }} width='medium'>
                  <Button disabled={formLoading} label={"Save Carrier"} primary type='submit' />
                </Box>
              </>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};
