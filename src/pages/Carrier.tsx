import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Grid, Page, PageContent, PageHeader, Spinner, Text } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";
import { pageStyles } from "../utils/styles";
import { CarrierContactsList } from "../components/carriers/CarrierContactsList";
import { Documents } from "../components/shared/Documents";
import { CommentsForm } from "../components/comments/CommentsForm";
import { CommentsList } from "../components/comments/CommentsList";
import { Test, Trophy, Optimize, Transaction } from "grommet-icons";

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
  const [comments, setComments] = useState() as any;
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

      // Set base carrier info (shouldn't change unless edited)
      let carrier = data.carrier;
      carrier["carrier_preferred"] = carrier["carrier_preferred"] === 1;
      carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
      carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
      carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      setCarrier(carrier);
      console.log("carrier ? ", carrier);
      setCarrierName(data.carrier.carrier_name);

      // Set additional data (separated so we can refresh it without refreshing the whole page)
      if (data.contacts) {
        setContacts(data.contacts);
      }
      if (data.comments) {
        setComments(data.comments);
      }
      setLoading(false);
    });
  };

  const getCarrierComments = () => {
    axios.get(`${API_URL}/carrier/${carrierId}/comments`).then((res) => {
      if (!res.data) {
        toast.error("Unable to load comments...");
        console.log(res.data);
        return;
      }
      if (res.data.data) {
        setComments(res.data.data);
      }
    });
  };

  useEffect(() => {
    getCarrierData();
  }, []);

  return (
    <Page background='light-1' style={pageStyles}>
      <PageContent style={{ padding: 0 }}>
        {/* Loading Spinner */}
        {loading && (
          <Box align='center' style={{ minHeight: "80vh", marginTop: "40vh" }}>
            <Box align='center' direction='row' gap='small' pad='small'>
              <Spinner size='medium' />
              <Text size='medium'>Loading Carrier...</Text>
            </Box>
          </Box>
        )}

        {/* Main page content */}
        {!loading && (
          <>
            <Box background='light-2' pad='medium'>
              <Link to={`/port/${carrier?.port_id}`} style={{ marginTop: 10 }}>
                &larr; Back to {carrier?.port_name ? `Port of ${carrier.port_name}` : "Port"}
              </Link>
              <PageHeader title={carrierName || ``} style={{ paddingTop: 45, paddingBottom: 0 }} />
              <Box direction='row' pad={{ top: "small", bottom: "medium" }}>
                {carrier.carrier_hazmat && (
                  <Box pad={{ right: "small" }}>
                    <Test />
                  </Box>
                )}
                {carrier.carrier_preferred && (
                  <Box pad={{ right: "small" }}>
                    <Trophy />
                  </Box>
                )}
                {carrier.carrier_overweight && (
                  <Box pad={{ right: "small" }}>
                    <Optimize />
                  </Box>
                )}
                {carrier.carrier_transload && (
                  <Box pad={{ right: "small" }}>
                    {" "}
                    <Transaction />
                  </Box>
                )}
              </Box>
            </Box>

            {/* CARRIER CONTACTS LIST  */}
            <Box background='light-1' pad={{ left: "large", top: "medium", bottom: "medium" }}>
              <CarrierContactsList carrier={carrier} contacts={contacts} refresh={getCarrierData} />
            </Box>

            {/* DOCUMENTS LIST / UPLOAD */}
            <Box pad={"large"} background='light-2'>
              <Box width='large'>
                <Documents carrierId={carrier.carrier_id} />
              </Box>
            </Box>

            {/* COMMENTS LIST / ADD */}
            <Box
              width='large'
              pad={{ left: "large", top: "large", bottom: "medium" }}
              background='light-1'
            >
              <CommentsForm carrierId={carrier.carrier_id} fireOnRefresh={getCarrierComments} />
              <CommentsList comments={comments} />
            </Box>
          </>
        )}
      </PageContent>
    </Page>
  );
};
