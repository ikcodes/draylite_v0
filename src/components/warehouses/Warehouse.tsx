import axios from "axios";
import { TextInput, Text, CheckBox, Button, FormField, Box, Heading, Grid } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { Formik, FormikValues } from "formik";
import { WarehouseFormProps } from "../../utils/types";

// Initial form values for 'add' mode
const blankWarehouse = {
  warehouse_name: "",
  warehouse_is_preferred: true,
  warehouse_hazmat: true, // these aren't working like the others...
  warehouse_overweight: true,
};

export const WarehouseForm = (props: WarehouseFormProps) => {
  const { warehouse, mode, portId, resetForm } = props;

  const handleSubmission = (data: FormikValues) => {
    let postData = { ...data };
    // api / db wants 1/0. all FE stuff is bool.
    postData["warehouse_hazmat"] = postData["warehouse_hazmat"] ? 1 : 0;
    postData["warehouse_overweight"] = postData["warehouse_overweight"] ? 1 : 0;
    postData["warehouse_is_preferred"] = postData["warehouse_is_preferred"] ? 1 : 0;

    postData["port_id"] = portId; // Hard set this bish

    //
    // ADD NEW WAREHAUS
    // ==================
    if (mode === "add") {
      axios
        .post(`${API_URL}/warehouses/create`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing warehouse - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed warehouse!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing warehouse - please refresh and try again`);
          console.log(error);
        })
        .finally(() => resetForm());
    }
    //
    // EDIT EXISTING WAREHAUS
    // ========================
    else if (mode === "edit") {
      axios
        .put(`${API_URL}/warehouses/update/${warehouse?.warehouse_id}`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem ${mode}ing warehouse - please refresh and try again`);
          } else {
            toast.success(`Successfully ${mode}ed warehouse!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem ${mode}ing warehouse - please refresh and try again`);
          console.log(error);
        })
        .finally(() => resetForm());
    } else {
      alert("Mode did not match add or edit!");
    }
  };
  return (
    <Formik
      initialValues={warehouse || blankWarehouse}
      // iDo: FIX FORMIK ERR HANDLIN's
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
            <FormField label='Warehouse Name'>
              <TextInput
                name='warehouse_name'
                onChange={handleChange}
                value={values.warehouse_name}
              />
            </FormField>
          </Box>
          <Grid columns='small'>
            <Box align='start'>
              <CheckBox
                checked={values.warehouse_is_preferred}
                name='warehouse_is_preferred'
                label='Preferred'
                onChange={handleChange}
              />
            </Box>
            <Box align='start'>
              <CheckBox
                checked={values.warehouse_overweight}
                name='warehouse_overweight'
                label='Overweight'
                onChange={handleChange}
              />
            </Box>
            <Box align='start'>
              <CheckBox
                checked={values.warehouse_hazmat}
                name='warehouse_hazmat'
                label='Hazmat'
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Box margin={{ vertical: "medium" }}>
            <Button label={"Save Warehouse"} primary type='submit' />
          </Box>
        </form>
      )}
    </Formik>
  );
};
