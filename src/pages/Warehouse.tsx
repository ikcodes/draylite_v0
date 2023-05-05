import { Link, useParams } from "react-router-dom";
import { Box, Page, PageContent, PageHeader, Spinner, Text } from "grommet";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { WarehouseContactsList } from "../components/warehouses/WarehouseContactsList";
import { CommentsForm } from "../components/comments/CommentsForm";
import { CommentsList } from "../components/comments/CommentsList";
import { FormPreviousLink, FormEdit } from "grommet-icons";
import { WarehouseForm } from "../components/warehouses/WarehouseForm";
import { useWarehouse } from "../hooks/useWarehouse";
import { EntityAttributes } from "../components/shared/EntityAttributes";

export const Warehouse = () => {
  const { warehouseId } = useParams();
  const {
    loading,
    // setLoading,
    editing,
    setEditing,
    contacts,
    comments,
    warehouse,
    // Keep these for now - use for dynaic part-page refreshes
    // setContacts,
    // setComments,
    // setWarehouse,
    getWarehouseComments,
    getWarehouseData,
  } = useWarehouse(warehouseId);

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
                  <EntityAttributes
                    preferred={warehouse.preferred}
                    overweight={warehouse.overweight}
                    hazmat={warehouse.hazmat}
                    transload={warehouse.transload}
                  />
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

          {/* TODO: WAREHAUS DOCUMENTS */}

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
