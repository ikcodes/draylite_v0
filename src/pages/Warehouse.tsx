import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Page, PageContent, PageHeader, Spinner, Text } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { WarehouseContactsList } from "../components/warehouses/WarehouseContactsList";
import { Documents } from "../components/shared/Documents";
import { CommentsForm } from "../components/comments/CommentsForm";
import { CommentsList } from "../components/comments/CommentsList";
import { Test, Trophy, Optimize, Transaction, FormPreviousLink, FormEdit } from "grommet-icons";
import { WarehouseForm } from "../components/warehouses/WarehouseForm";

export const Warehouse = () => {
  const { warehouseId } = useParams();
  if (!warehouseId) {
    alert("No warehouse id you fuck. this is broken.");
  }
  //====================
  // LOCAL STATE
  //====================
  const [loading, setLoading] = useState(true);
  const [warehouse, setWarehouse] = useState() as any;
  const [contacts, setContacts] = useState() as any;
  const [comments, setComments] = useState() as any;

  const [editing, setEditing] = useState(false);

  //===================================================
  // GET CARRIER DATA:
  // All attributes that affect this SPECIFIC warehouse.
  //====================================================
  const getWarehouseData = () => {
    setLoading(true);
    const url = `${API_URL}/warehouses/${warehouseId}`;
    axios.get(url).then((res) => {
      if (!res.data.data || !res.data.data.warehouse) {
        setLoading(false);
        console.log(res.data.data);
        toast.error("Unable to get warehouse! Please refresh the page to try again.");
        return;
      }
      const data = res.data.data;

      // Set base warehouse info (shouldn't change unless edited)
      let warehouse = data.warehouse;
      warehouse["warehouse_preferred"] = warehouse["warehouse_preferred"] === 1;
      warehouse["warehouse_overweight"] = warehouse["warehouse_overweight"] === 1;
      warehouse["warehouse_transload"] = warehouse["warehouse_transload"] === 1;
      warehouse["warehouse_hazmat"] = warehouse["warehouse_hazmat"] === 1;
      setWarehouse(warehouse);

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

  const getWarehouseComments = () => {
    axios.get(`${API_URL}/warehouse/${warehouseId}/comments`).then((res) => {
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
    getWarehouseData();
  }, []);

  // CARRIER ATTRIBUTES
  // It's very tempting to make these dynamic,
  // but the sizing of each word conflicts with
  // the necessary positioning aspects.
  //==============================================
  const WarehouseAttributes = () => (
    <Box direction='row-responsive' style={{ minWidth: 350 }}>
      <Box direction='column' pad='small'>
        <Box
          align='center'
          pad={{ top: "13px" }}
          style={{
            borderRadius: "100%",
            backgroundColor: warehouse.warehouse_preferred ? "#1BC5E7" : "#ddd",
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
            color={warehouse.warehouse_preferred ? "#1BC5E7" : "#ddd"}
            size='small'
            style={warehouse.warehouse_preferred ? {} : { textDecoration: "line-through" as any }}
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
            backgroundColor: warehouse.warehouse_overweight ? "#1BC5E7" : "#ddd",
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
            color={warehouse.warehouse_overweight ? "#1BC5E7" : "#ddd"}
            size='small'
            style={warehouse.warehouse_overweight ? {} : { textDecoration: "line-through" as any }}
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
            backgroundColor: warehouse.warehouse_hazmat ? "#1BC5E7" : "#ddd",
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
            color={warehouse.warehouse_hazmat ? "#1BC5E7" : "#ddd"}
            size='small'
            style={warehouse.warehouse_hazmat ? {} : { textDecoration: "line-through" as any }}
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
            backgroundColor: warehouse.warehouse_transload ? "#1BC5E7" : "#ddd",
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
            color={warehouse.warehouse_transload ? "#1BC5E7" : "#ddd"}
            size='small'
            style={warehouse.warehouse_transload ? {} : { textDecoration: "line-through" as any }}
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
                <Text size='medium'>Loading Warehouse...</Text>
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
                  to={`/port/${warehouse?.port_id}`}
                  style={{ textDecoration: "none", color: "#666" }}
                >
                  <Box direction='row-responsive'>
                    <Box>
                      <FormPreviousLink />
                    </Box>
                    <Box>
                      <Text size='small' color='drayliteBlue' style={{ paddingTop: 2 }}>
                        Back to {warehouse?.port_name ? `Port of ${warehouse.port_name}` : "Port"}
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
                        Edit This Warehouse
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
                    title={warehouse.warehouse_name || ``}
                    style={{ paddingTop: 0, paddingBottom: 15 }}
                  />
                  <Text style={{ paddingLeft: 4 }} size='small'>
                    Now viewing all Contacts, Documents, and Comments associated with{" "}
                    {warehouse.warehouse_name}.
                  </Text>
                </Box>
                <Box>
                  <WarehouseAttributes />
                </Box>
              </Box>
            </PageContent>
          </Page>

          {editing && (
            <Page background='light-2'>
              <PageContent style={pageContentStyles}>
                <Box width='xlarge' pad={{ top: "medium" }}>
                  <WarehouseForm
                    warehouse={warehouse}
                    mode={"edit"}
                    portId={1}
                    resetForm={() => {
                      setEditing(false);
                      getWarehouseData();
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
                <WarehouseContactsList
                  warehouse={warehouse}
                  contacts={contacts}
                  refresh={getWarehouseData}
                />
              </Box>
            </PageContent>
          </Page>

          {/* DOCUMENTS LIST / UPLOAD */}
          {/* <Page background='light-1'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ vertical: "medium" }}>
                <Box width='large'>
                  <Documents warehouseId={warehouse.warehouse_id} />
                </Box>
              </Box>
            </PageContent>
          </Page> */}

          {/* COMMENTS LIST / ADD */}
          <Page background='light-2'>
            <PageContent style={pageContentStyles}>
              <Box width='large' pad={{ vertical: "medium" }}>
                <Box>
                  <h1>Comments</h1>
                </Box>
                <Box>
                  {/* <Box pad={{ vertical: "small" }}> */}
                  <CommentsForm
                    warehouseId={warehouse.warehouse_id}
                    fireOnRefresh={getWarehouseComments}
                  />
                </Box>
                <Box pad={{ vertical: "medium", left: "medium" }}>
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
