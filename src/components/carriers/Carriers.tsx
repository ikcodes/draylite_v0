import axios from "axios";
import { Page, PageContent, Button, Text, Box, Heading, Card, PageHeader } from "grommet";
import { Add, FormClose } from "grommet-icons";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/utils";
import toast from "react-hot-toast";
import { CarrierForm } from "./CarrierForm";
import { CarriersTable } from "./CarriersTable";
import { Carrier } from "../../utils/types";
import { CarrierDetailsModal } from "./CarrierDetailsModal";

export const Carriers = () => {
  //====================
  // LOCAL STATE
  //====================
  const [mode, setMode] = useState("");
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
    console.log("get");
    getCarriers();
  }, []);

  //======================
  // PAGE MGMT
  //======================
  const getCarriers = () => {
    axios.get(`${API_URL}/carriers`).then((res) => {
      res.data.data.map((carrier: any) => {
        carrier["carrier_is_preferred"] = carrier["carrier_is_preferred"] === 1;
        carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
        carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      });
      console.log("GOT CARRIERS", res.data.data);
      setCarriers(res.data.data);
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
      <Page background='light-1'>
        <PageContent>
          <PageHeader title='Carriers' />
          <Text>
            Carriers move containers from Ports to Destinations. They manage any given number of
            Draymen and are the crux of this platform.
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

          {/* VIEW CONTACTS MODAL */}

          {mode === "view-contacts" && (
            <CarrierDetailsModal
              carrier={carriers.find((c) => c.carrier_id == carrierId)}
              getCarriers={getCarriers}
              setParentMode={setMode}
            />
          )}

          {/* ADD / EDIT FORM */}
          {(mode === "edit" || mode === "add") && (
            <Box animation='fadeIn'>
              <Card pad='medium' gap='medium' background='white' style={{ position: "relative" }}>
                <Heading size='small' margin='none'>
                  {mode === "edit" ? "Edit" : "Add"} Carrier
                </Heading>
                <FormClose
                  onClick={() => resetForm()}
                  cursor='pointer'
                  style={{ position: "absolute", right: 10, top: 10 }}
                />
                <CarrierForm
                  carrier={carriers.find((c) => c.carrier_id == carrierId)}
                  mode={mode}
                  resetForm={resetForm}
                />
              </Card>
            </Box>
          )}

          <h3>Current List of Carriers</h3>
          <CarriersTable
            carriers={carriers}
            deleteCarrier={deleteCarrier}
            editCarrier={editCarrier}
            viewCarrierContacts={viewCarrierContacts}
          />
        </PageContent>
      </Page>
    </>
  );
};
