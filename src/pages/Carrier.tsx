import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Grid, Page, PageContent, PageHeader, Spinner, Text } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";
import { pageStyles } from "../utils/styles";
import { CarrierContactsList } from "../components/carriers/CarrierContactsList";

export const Carrier = () => {
  const { carrierId } = useParams();
  if (!carrierId) {
    alert("No carrier id you fuck. this is broken.");
  }
  //====================
  // LOCAL STATE
  //====================
  // const [mode, setMode] = useState(""); // Does this page have mored anymore?
  const [loading, setLoading] = useState(true);
  const [carrier, setCarrier] = useState() as any;
  const [contacts, setContacts] = useState() as any;
  const [carrierName, setCarrierName] = useState("");

  //===================================================
  // GET CARRIER DATA:
  // All attributes that affect this SPECIFIC carrier.
  //====================================================
  const getCarrierData = () => {
    setLoading(true);
    const url = `${API_URL}/carriers/${carrierId}`;
    axios.get(url).then((res) => {
      if (!res.data.data || !res.data.data.carrier) {
        setLoading(false);
        console.log(res.data.data);
        toast.error("Unable to get carrier! Please refresh the page to try again.");
        return;
      }
      const data = res.data.data;
      let carrier = data.carrier;
      carrier["carrier_preferred"] = carrier["carrier_preferred"] === 1;
      carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
      carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
      carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      setCarrier(carrier);
      if (data.contacts) {
        setContacts(data.contacts);
      }
      setCarrierName(data.carrier.carrier_name);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCarrierData();
  }, []);

  return (
    <Page background='light-1' style={pageStyles}>
      <PageContent>
        <Link to={`/port/${carrier?.port_id}`} style={{ marginTop: 15 }}>
          &larr; Back to {carrier?.port_name ? `Port of ${carrier.port_name}` : "Port"}
        </Link>
        <PageHeader title={carrierName || ``} />

        {loading && (
          <Grid>
            <Box align='center' direction='row' gap='small' pad='small'>
              <Spinner size='medium' />
              <Text size='medium'>Loading Carrier...</Text>
            </Box>
          </Grid>
        )}

        {!loading && (
          <>
            {/* CARRIER CONTACTS LIST  */}
            <CarrierContactsList carrier={carrier} contacts={contacts} refresh={getCarrierData} />

            <h2>Documents go here</h2>
            <hr />
            <h2>Comments go here</h2>
          </>
        )}
      </PageContent>
    </Page>
  );
};
