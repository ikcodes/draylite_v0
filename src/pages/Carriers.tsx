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
import { API_URL } from "../utils/utils";
import toast from "react-hot-toast";
import { CarriersTable } from "../components/carriers/CarriersTable";
import { Carrier } from "../utils/types";
import { useParams } from "react-router-dom";
import { CarrierForm } from "../components/carriers/CarrierForm";
import { pageStyles } from "../utils/styles";
import { CarrierContactsList } from "../components/carriers/CarrierContactsList";

export const Carriers = () => {
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
  const [carriers, setCarriers] = useState([] as Carrier[]);
  const [carrierId, setCarrierId] = useState(0);

  //====================
  // API FUNCTIONS
  //====================
  const deleteCarrier = (carrierId: number) => {
    axios
      .delete(`${API_URL}/carriers/${carrierId}`)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Problem deleting carrier - please refresh and try again");
          console.log(response.data);
        } else {
          toast.success("Successfully deleted carrier!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => resetForm());
  };

  useEffect(() => {
    getCarriers();
  }, []);

  //======================
  // PAGE MGMT
  //======================
  const getCarriers = () => {
    setLoading(true);
    axios.get(`${API_URL}/carriers/port/${portId}`).then((res) => {
      res.data.data.carriers.map((carrier: any) => {
        carrier["carrier_preferred"] = carrier["carrier_preferred"] === 1;
        carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
        carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
        carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      });
      if (res.data.data.port.port_name) {
        setPortName(res.data.data.port.port_name);
      }
      setCarriers(res.data.data.carriers);
      setLoading(false);
    });
  };

  const viewCarrierContacts = (carrierId: number) => {
    setCarrierId(carrierId);
    setMode("view-contacts");
  };

  const editCarrier = (carrierId: number) => {
    setMode("edit");
    setCarrierId(carrierId);
  };

  const resetForm = () => {
    setMode("");
    getCarriers();
  };

  //======================
  // MARKUP
  //======================
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
