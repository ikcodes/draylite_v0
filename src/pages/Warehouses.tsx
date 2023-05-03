import { Page, PageContent, Button, Text, Box, PageHeader, Spinner, Grid } from "grommet";
import { Add } from "grommet-icons";
import { useEffect } from "react";
import { WarehousesTable } from "../components/warehouses/WarehousesTable";
import { useParams } from "react-router-dom";
import { WarehouseForm } from "../components/warehouses/WarehouseForm";
import { pageStyles } from "../utils/styles";
import { useWarehouses } from "../hooks";

export const Warehouses = () => {
  let { portId } = useParams();
  const {
    mode,
    setMode,
    loading,
    setLoading,
    portName,
    setPortName,
    warehouses,
    setWarehouses,
    warehouseId,
    setWarehouseId,
    deleteWarehouse,
    getWarehouses,
    resetForm,
  } = useWarehouses(portId);

  useEffect(() => {
    getWarehouses();
    document.querySelector("body")?.scrollTo(0, 0);
  }, []);

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
