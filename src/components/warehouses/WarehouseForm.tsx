import axios from "axios";
import { TextInput, Text, CheckBox, Button, Box, Grid, Card, Spinner } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { Formik, FormikValues } from "formik";
import { WarehouseFormProps, blankWarehouse } from "../../utils/types";
import { useState } from "react";

export const WarehouseForm = (props: WarehouseFormProps) => {
  const { warehouse, mode, portId, resetForm } = props;

  const [formLoading, setFormLoading] = useState(false);

  const handleSubmission = (data: FormikValues) => {
    if (!data.warehouse_name) {
      toast.error("Please provide a warehouse name to save one.");
      return;
    }

    let postData = { ...data };
    // api / db wants 1/0. all FE stuff is bool.
    postData["warehouse_hazmat"] = postData["warehouse_hazmat"] ? 1 : 0;
    postData["warehouse_transload"] = postData["warehouse_transload"] ? 1 : 0;
    postData["warehouse_overweight"] = postData["warehouse_overweight"] ? 1 : 0;
    postData["warehouse_preferred"] = postData["warehouse_preferred"] ? 1 : 0;
    postData["port_id"] = portId; // Can be number or string - both work.

    //
    // ADD NEW CARRIER
    // ==================
    if (mode === "add") {
      setFormLoading(true);
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
        .finally(() => {
          setFormLoading(false);
          resetForm();
        });
    } else {
      alert("Mode did not match add or edit!");
    }
  };
  return (
    <Formik
      initialValues={warehouse || blankWarehouse}
      onSubmit={(values) => handleSubmission(values)}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Card background='white' margin={{ bottom: "medium" }} pad='small'>
            {formLoading && (
              <Box align='center' direction='row-responsive' gap='small'>
                <Spinner size='medium' />
                <Text size='medium'>Saving Warehouse...</Text>
              </Box>
            )}
            {!formLoading && (
              <>
                <Box pad='small'>
                  <h2 style={{ marginBottom: 0 }}>
                    {mode == "edit" ? "Editing Warehouse " : "Adding New Warehouse"}
                  </h2>
                </Box>
                <Box pad='small'>
                  <TextInput
                    name='warehouse_name'
                    onChange={handleChange}
                    value={values.warehouse_name}
                    placeholder='Warehouse Name...'
                  />
                </Box>
                <Box pad='small'>
                  <Grid columns='small'>
                    <Box align='start'>
                      <CheckBox
                        checked={values.warehouse_preferred}
                        name='warehouse_preferred'
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
                    <Box align='start'>
                      <CheckBox
                        checked={values.warehouse_transload}
                        name='warehouse_transload'
                        label='Transload'
                        onChange={handleChange}
                      />
                    </Box>
                  </Grid>
                </Box>
                <Box direction='row'>
                  <Box margin={{ vertical: "medium", horizontal: "small" }} width='medium'>
                    <Button disabled={formLoading} label={"Save Warehouse"} primary type='submit' />
                  </Box>
                  <Box margin={{ vertical: "medium", horizontal: "small" }} width='medium'>
                    <Button disabled={formLoading} label={"Cancel"} secondary onClick={resetForm} />
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
