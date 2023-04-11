import axios from "axios";
import { TextInput, Text, CheckBox, Button, FormField, Box, Heading, Grid } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { Formik, FormikValues } from "formik";
import { CarrierFormProps } from "../../utils/types";

// Initial form values for 'add' mode
const blankCarrier = {
  carrier_name: "",
  carrier_preferred: true,
  carrier_transload: true,
  carrier_hazmat: true,
  carrier_overweight: true,
};

export const CarrierForm = (props: CarrierFormProps) => {
  const { carrier, mode, portId, resetForm } = props;

  const handleSubmission = (data: FormikValues) => {
    let postData = { ...data };
    // api / db wants 1/0. all FE stuff is bool.
    postData["carrier_hazmat"] = postData["carrier_hazmat"] ? 1 : 0;
    postData["carrier_transload"] = postData["carrier_transload"] ? 1 : 0;
    postData["carrier_overweight"] = postData["carrier_overweight"] ? 1 : 0;
    postData["carrier_preferred"] = postData["carrier_preferred"] ? 1 : 0;

    postData["port_id"] = portId; // Hard set this bish

    //
    // ADD NEW CARRIER
    // ==================
    if (mode === "add") {
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
        .finally(() => resetForm());
    }
    //
    // EDIT EXISTING CARRIER
    // ========================
    else if (mode === "edit") {
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
        .finally(() => resetForm());
    } else {
      alert("Mode did not match add or edit!");
    }
  };
  return (
    <Formik
      initialValues={carrier || blankCarrier}
      // This isn't working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // Set errors
      // validate={(values: FormikValues) => {
      //   const errors = {};
      //   // if (!values.email) {
      //   // errors.email = "Required";
      //   // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      //   // errors.email = "Invalid email address";
      //   // }
      //   return errors;
      // }}
      onSubmit={(values) => handleSubmission(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Box pad='small'>
            <FormField label='Carrier Name'>
              <TextInput name='carrier_name' onChange={handleChange} value={values.carrier_name} />
            </FormField>
          </Box>
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
          <Box margin={{ vertical: "medium" }}>
            <Button label={"Save Carrier"} primary type='submit' />
          </Box>
        </form>
      )}
    </Formik>
  );
};
