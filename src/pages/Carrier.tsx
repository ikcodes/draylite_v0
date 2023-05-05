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
import { FormPreviousLink, FormEdit } from "grommet-icons";
import { CarrierForm } from "../components/carriers/CarrierForm";
import { EntityAttributes } from "../components/shared/EntityAttributes";
import { useCarrier } from "../hooks/useCarrier";

export const Carrier = () => {
  const { carrierId } = useParams();
  const {
    loading,
    setLoading,
    carrier,
    setCarrier,
    contacts,
    setContacts,
    comments,
    setComments,
    editing,
    setEditing,
    getCarrierData,
    getCarrierComments,
  } = useCarrier(carrierId);

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
                  <EntityAttributes
                    preferred={carrier.preferred}
                    overweight={carrier.overweight}
                    hazmat={carrier.hazmat}
                    transload={carrier.transload}
                  />
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
