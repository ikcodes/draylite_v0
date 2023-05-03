import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Page, PageContent, PageHeader, Spinner, Text } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { CarrierContactsList } from "../components/carriers/CarrierContactsList";
import { Documents } from "../components/shared/Documents";
import { CommentsForm } from "../components/comments/CommentsForm";
import { CommentsList } from "../components/comments/CommentsList";
import { Test, Trophy, Optimize, Transaction, FormPreviousLink, FormEdit } from "grommet-icons";
import { CarrierForm } from "../components/carriers/CarrierForm";

export const Carrier = () => {
  const { carrierId } = useParams();
  //====================
  // LOCAL STATE
  //====================
  const [loading, setLoading] = useState(true);
  const [carrier, setCarrier] = useState() as any;
  const [contacts, setContacts] = useState() as any;
  const [comments, setComments] = useState() as any;

  const [editing, setEditing] = useState(false);

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

  // CARRIER ATTRIBUTES
  // It's very tempting to make these dynamic,
  // but the sizing of each word conflicts with
  // the necessary positioning aspects.
  //==============================================
  const CarrierAttributes = () => (
    <Box direction='row-responsive' style={{ minWidth: 350 }}>
      <Box direction='column' pad='small'>
        <Box
          align='center'
          pad={{ top: "13px" }}
          style={{
            borderRadius: "100%",
            backgroundColor: carrier.carrier_preferred ? "#1BC5E7" : "#ddd",
            marginLeft: 8,
            marginBottom: 4,
          }}
          height='50px'
          width='50px'
        >
          <Trophy color='white' />
        </Box>
        <Box align='center'>
          <Text
            color={carrier.carrier_preferred ? "#1BC5E7" : "#ddd"}
            size='small'
            style={carrier.carrier_preferred ? {} : { textDecoration: "line-through" as any }}
            weight={700}
          >
            Preferred
          </Text>
        </Box>
      </Box>
      <Box direction='column' pad='small'>
        <Box
          align='center'
          pad={{ top: "13px" }}
          style={{
            borderRadius: "100%",
            backgroundColor: carrier.carrier_overweight ? "#1BC5E7" : "#ddd",
            marginLeft: 14,
            marginBottom: 4,
          }}
          height='50px'
          width='50px'
        >
          <Optimize color='white' />
        </Box>
        <Box align='center'>
          <Text
            color={carrier.carrier_overweight ? "#1BC5E7" : "#ddd"}
            size='small'
            style={carrier.carrier_overweight ? {} : { textDecoration: "line-through" as any }}
            weight={700}
          >
            Overweight
          </Text>
        </Box>
      </Box>
      <Box direction='column' pad='small'>
        <Box
          align='center'
          pad={{ top: "13px" }}
          style={{
            borderRadius: "100%",
            backgroundColor: carrier.carrier_hazmat ? "#1BC5E7" : "#ddd",
            marginLeft: 1,
            marginBottom: 4,
          }}
          height='50px'
          width='50px'
        >
          <Test color='white' />
        </Box>
        <Box align='center'>
          <Text
            color={carrier.carrier_hazmat ? "#1BC5E7" : "#ddd"}
            size='small'
            style={carrier.carrier_hazmat ? {} : { textDecoration: "line-through" as any }}
            weight={700}
          >
            Hazmat
          </Text>
        </Box>
      </Box>
      <Box direction='column' pad='small'>
        <Box
          align='center'
          pad={{ top: "13px" }}
          style={{
            borderRadius: "100%",
            backgroundColor: carrier.carrier_transload ? "#1BC5E7" : "#ddd",
            marginLeft: 10,
            marginBottom: 4,
          }}
          height='50px'
          width='50px'
        >
          <Transaction color='white' />
        </Box>
        <Box align='center'>
          <Text
            color={carrier.carrier_transload ? "#1BC5E7" : "#ddd"}
            size='small'
            style={carrier.carrier_transload ? {} : { textDecoration: "line-through" as any }}
            weight={700}
          >
            Transload
          </Text>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div style={pageStyles}>
      {/* Loading Spinner */}
      {loading && (
        <Page background='light-1'>
          <PageContent style={pageContentStyles}>
            <Box align='center' style={{ minHeight: "80vh", marginTop: "40vh" }}>
              <Box align='center' direction='row-responsive' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Loading Carrier...</Text>
              </Box>
            </Box>
          </PageContent>
        </Page>
      )}

      {/* Main page content */}
      {!loading && (
        <>
          <Page background='light-1'>
            <PageContent style={pageContentStyles}>
              <Box
                direction='row-responsive'
                justify='between'
                pad={{ vertical: "medium" }}
                width='xlarge'
              >
                <Link
                  to={`/port/${carrier?.port_id}`}
                  style={{ textDecoration: "none", color: "#666" }}
                >
                  <Box direction='row-responsive'>
                    <Box>
                      <FormPreviousLink />
                    </Box>
                    <Box>
                      <Text size='small' color='drayliteBlue' style={{ paddingTop: 2 }}>
                        Back to {carrier?.port_name ? `Port of ${carrier.port_name}` : "Port"}
                      </Text>
                    </Box>
                  </Box>
                </Link>
                <Box>
                  <Box
                    style={{ cursor: "pointer" as any, color: "purple" }}
                    onClick={() => setEditing(true)}
                    direction='row-responsive'
                  >
                    <Box>
                      <FormEdit size='medium' />
                    </Box>
                    <Box>
                      <Text size='small' color='#666' style={{ paddingTop: 2 }}>
                        Edit This Carrier
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* CARRIER ATTRIBUTES */}
              <Box
                align='end'
                pad={{ top: "small", bottom: "medium" }}
                direction='row-responsive'
                justify='between'
                width='xlarge'
              >
                <Box>
                  <PageHeader
                    title={carrier.carrier_name || ``}
                    style={{ paddingTop: 0, paddingBottom: 15 }}
                  />
                  <Text style={{ paddingLeft: 4 }} size='small'>
                    Now viewing all Contacts, Documents, and Comments associated with{" "}
                    {carrier.carrier_name}.
                  </Text>
                </Box>
                <Box>
                  <CarrierAttributes />
                </Box>
              </Box>
            </PageContent>
          </Page>

          {editing && (
            <Page background='light-2'>
              <PageContent style={pageContentStyles}>
                <Box width='xlarge' pad={{ top: "medium" }}>
                  <CarrierForm
                    carrier={carrier}
                    mode={"edit"}
                    portId={1}
                    resetForm={() => {
                      setEditing(false);
                      getCarrierData();
                    }}
                  />
                </Box>
              </PageContent>
            </Page>
          )}

          {/* CARRIER CONTACTS LIST  */}
          <Page background='light-2'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ vertical: "medium" }} width='xlarge'>
                <CarrierContactsList
                  carrier={carrier}
                  contacts={contacts}
                  refresh={getCarrierData}
                />
              </Box>
            </PageContent>
          </Page>

          {/* DOCUMENTS LIST / UPLOAD */}
          <Page background='light-1'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ vertical: "medium" }}>
                <Box width='large'>
                  <Documents carrierId={carrier.carrier_id} />
                </Box>
              </Box>
            </PageContent>
          </Page>

          {/* COMMENTS LIST / ADD */}
          <Page background='light-2'>
            <PageContent style={pageContentStyles}>
              <Box width='large' pad={{ vertical: "medium" }}>
                <Box>
                  <h1>Comments</h1>
                </Box>
                <Box>
                  {/* <Box pad={{ vertical: "small" }}> */}
                  <CommentsForm carrierId={carrier.carrier_id} fireOnRefresh={getCarrierComments} />
                </Box>
                <Box pad={{ vertical: "medium", left: "small" }}>
                  <CommentsList comments={comments} />
                </Box>
              </Box>
            </PageContent>
          </Page>
        </>
      )}
    </div>
  );
};
