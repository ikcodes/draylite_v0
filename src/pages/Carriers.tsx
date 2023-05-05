import { Add } from "grommet-icons";
import { pageStyles } from "../utils/styles";
import { useParams } from "react-router-dom";
import { useCarriers } from "../hooks/useCarriers";
import { CarrierForm } from "../components/carriers/CarrierForm";
import { CarriersTable } from "../components/carriers/CarriersTable";
import { Page, PageContent, Button, Text, Box, PageHeader, Spinner, Grid } from "grommet";

export const Carriers = () => {
  let { portId } = useParams();
  const {
    mode,
    setMode,
    loading,
    setLoading,
    portName,
    setPortName,
    carriers,
    setCarriers,
    carrierId,
    setCarrierId,
    deleteCarrier,
    getCarriers,
    resetForm,
  } = useCarriers(portId);

  return (
    <>
      <Page background='light-1' style={pageStyles}>
        <PageContent>
          <PageHeader title={`${portName ? `${portName} Carriers` : "Carriers"}`} />
          <Text>
            Use the table below to view and edit carriers that service {portName || "this port"}.
            <br />
            You may also add carriers using the "Add" button below, or remove any carriers as
            necessary.
          </Text>

          {/* ADD CARRIER BUTTON */}
          <Box pad={{ vertical: "medium" }} width='small'>
            <Button
              primary
              icon={<Add />}
              label='Add Carrier'
              onClick={() => {
                setCarrierId(0);
                setMode("add");
              }}
            />
          </Box>

          {/* ADD / EDIT FORM */}
          {mode === "add" && (
            <Box animation='fadeIn'>
              <CarrierForm
                carrier={carriers.find((c) => c.carrier_id == carrierId)}
                portId={Number(portId)}
                mode={mode}
                resetForm={resetForm}
              />
            </Box>
          )}

          <h3>Current List of Carriers</h3>
          {loading && (
            <Grid>
              <Box align='center' direction='row-responsive' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Loading Carriers...</Text>
              </Box>
            </Grid>
          )}
          {!loading && <CarriersTable carriers={carriers} />}
        </PageContent>
      </Page>
    </>
  );
};
