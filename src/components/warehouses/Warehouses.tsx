import axios from "axios";
import {
  Page,
  PageContent,
  Button,
  Text,
  Box,
  Heading,
  Card,
  PageHeader,
  Spinner,
  Grid,
} from "grommet";
import { Add, FormClose } from "grommet-icons";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/utils";
import toast from "react-hot-toast";
import { WarehousesTable } from "./WarehousesTable";
import { Warehouse } from "../../utils/types";
import { WarehouseDetailsModal } from "./WarehouseDetailsModal";
import { useParams } from "react-router-dom";
import { WarehouseForm } from "./Warehouse";
import { pageStyles } from "../../utils/styles";

export const Warehouses = () => {
  let { portId } = useParams();
  if (!portId) {
    alert("No port id you fuck. this is broken.");
  }
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
  }, []);

  //======================
  // PAGE MGMT
  //======================
  const getWarehouses = () => {
    setLoading(true);
    axios.get(`${API_URL}/warehouses/port/${portId}`).then((res) => {
      res.data.data.warehouses.map((warehouse: any) => {
        warehouse["warehouse_is_preferred"] = warehouse["warehouse_is_preferred"] === 1;
        warehouse["warehouse_overweight"] = warehouse["warehouse_overweight"] === 1;
        warehouse["warehouse_hazmat"] = warehouse["warehouse_hazmat"] === 1;
      });
      if (res.data.data.port.port_name) {
        setPortName(res.data.data.port.port_name);
      }
      setWarehouses(res.data.data.warehouses);
      setLoading(false);
    });
  };

  const viewWarehouseContacts = (warehouseId: number) => {
    setWarehouseId(warehouseId);
    setMode("view-contacts");
  };

  const editWarehouse = (warehouseId: number) => {
    setMode("edit");
    setWarehouseId(warehouseId);
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
          <Text>
            Use the table below to view and edit warehouses that run freight out of this port. You
            may also add warehouses using the "Add" button below, or remove any warehouses as
            necessary.
          </Text>

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

          {/* VIEW CONTACTS MODAL */}
          {mode === "view-contacts" && (
            <WarehouseDetailsModal
              warehouse={warehouses.find((c) => c.warehouse_id == warehouseId)}
              getWarehouses={getWarehouses}
              setParentMode={setMode}
            />
          )}

          {/* ADD / EDIT FORM */}
          {(mode === "edit" || mode === "add") && (
            <Box animation='fadeIn'>
              <Card pad='medium' gap='medium' background='white' style={{ position: "relative" }}>
                <Heading size='small' margin='none'>
                  {mode === "edit" ? "Edit" : "Add"} Warehouse
                </Heading>
                <FormClose
                  onClick={() => resetForm()}
                  cursor='pointer'
                  style={{ position: "absolute", right: 10, top: 10 }}
                />
                <WarehouseForm
                  warehouse={warehouses.find((c) => c.warehouse_id == warehouseId)}
                  portId={Number(portId)}
                  mode={mode}
                  resetForm={resetForm}
                />
              </Card>
            </Box>
          )}

          <h3>Current List of Warehouses</h3>
          {loading && (
            <Grid>
              <Box align='center' direction='row' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Loading Warehouses...</Text>
              </Box>
            </Grid>
          )}
          {!loading && (
            <WarehousesTable
              warehouses={warehouses}
              deleteWarehouse={deleteWarehouse}
              editWarehouse={editWarehouse}
              viewWarehouseContacts={viewWarehouseContacts}
            />
          )}
        </PageContent>
      </Page>
    </>
  );
};
