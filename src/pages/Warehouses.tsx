import axios from "axios";
import { Page, PageContent, Button, Text, Box, PageHeader, Spinner, Grid } from "grommet";
import { Add } from "grommet-icons";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import toast from "react-hot-toast";
import { WarehousesTable } from "../components/warehouses/WarehousesTable";
import { Warehouse } from "../utils/types";
import { useParams } from "react-router-dom";
import { WarehouseForm } from "../components/warehouses/WarehouseForm";
import { pageStyles } from "../utils/styles";

export const Warehouses = () => {
  let { portId } = useParams();
  //====================
  // LOCAL STATE
  //====================
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [portName, setPortName] = useState("");
  const [warehouses, setWarehouses] = useState([] as Warehouse[]);
  const [warehouseId, setWarehouseId] = useState(0);

  //====================
  // API FUNCTIONS
  //====================
  const deleteWarehouse = (warehouseId: number) => {
    axios
      .delete(`${API_URL}/warehouses/${warehouseId}`)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Problem deleting warehouse - please refresh and try again");
          console.log(response.data);
        } else {
          toast.success("Successfully deleted warehouse!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => resetForm());
  };

  useEffect(() => {
    getWarehouses();
    document.querySelector("body")?.scrollTo(0, 0);
  }, []);

  //======================
  // PAGE MGMT
  //======================
  const getWarehouses = () => {
    setLoading(true);
    axios.get(`${API_URL}/warehouses/port/${portId}`).then((res) => {
      res.data.data.warehouses.map((warehouse: any) => {
        warehouse["warehouse_overweight"] = warehouse["warehouse_overweight"] === 1;
        warehouse["warehouse_preferred"] = warehouse["warehouse_preferred"] === 1;
        warehouse["warehouse_transload"] = warehouse["warehouse_transload"] === 1;
        warehouse["warehouse_hazmat"] = warehouse["warehouse_hazmat"] === 1;
      });
      if (res.data.data.port.port_name) {
        setPortName(res.data.data.port.port_name);
      }
      setWarehouses(res.data.data.warehouses);
      setLoading(false);
    });
  };

  const resetForm = () => {
    setMode("");
    getWarehouses();
  };

  //======================
  // MARKUP
  //======================
  return (
    <>
      <Page background='light-1' style={pageStyles}>
        <PageContent>
          <PageHeader title={`${portName ? `${portName} Warehouses` : "Warehouses"}`} />
          <Text>Viewing all Warehouses assoiated with the Port of {portName}.</Text>

          {/* ADD WAREHOUSE BUTTON */}
          <Box pad={{ vertical: "medium" }} width='small'>
            <Button
              primary
              icon={<Add />}
              label='Add Warehouse'
              onClick={() => {
                setWarehouseId(0);
                setMode("add");
              }}
            />
          </Box>

          {/* ADD / EDIT FORM */}
          {(mode === "edit" || mode === "add") && (
            <Box animation='fadeIn'>
              <WarehouseForm
                warehouse={warehouses.find((c) => c.warehouse_id == warehouseId)}
                portId={Number(portId)}
                mode={mode}
                resetForm={resetForm}
              />
            </Box>
          )}

          <h3>Current List of Warehouses</h3>
          {loading && (
            <Grid>
              <Box align='center' direction='row-responsive' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Loading Warehouses...</Text>
              </Box>
            </Grid>
          )}
          {!loading && <WarehousesTable warehouses={warehouses} />}
        </PageContent>
      </Page>
    </>
  );
};
