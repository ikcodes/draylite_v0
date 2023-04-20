import axios from "axios";
import { Page, PageContent, PageHeader, Card, Box, Button, Spinner, Text } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CarriersTable } from "../components/carriers/CarriersTable";
import { WarehousesTable } from "../components/warehouses/WarehousesTable";
import { CarrierForm } from "../components/carriers/CarrierForm";
import { Add, DocumentUpload } from "grommet-icons";
import { WarehouseForm } from "../components/warehouses/WarehouseForm";

export const Port = () => {
  // Local state
  const [loading, setLoading] = useState(true);
  const [portName, setPortName] = useState("");
  const [portData, setPortData] = useState() as any;
  const [carriers, setCarriers] = useState() as any;
  const [warehouses, setWarehouses] = useState() as any;
  const { portId } = useParams();

  const [addingCarrier, setAddingCarrier] = useState(false);
  const [addingWarehaus, setAddingWarehaus] = useState(false);

  useEffect(() => {
    getPortData();
  }, []);

  const getPortData = () => {
    setLoading(true);
    const apiUrl = `${API_URL}/port/${portId}`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (!res.data.data || !res.data.data.port) {
          toast.error("Failed to load ports! Please refresh the page and try again.");
          return;
        }
        const data = res.data.data;
        setPortData(data.port);
        setPortName(data.port.port_name);
        if (data.carriers) {
          setCarriers(data.carriers);
        }
        if (data.warehouses) {
          setWarehouses(data.warehouses);
        }
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setAddingCarrier(false);
    setAddingWarehaus(false);
    getPortData();
  };

  //======================
  // MARKUP
  //======================
  return (
    <div style={pageStyles}>
      {/*===================*/}
      {/*  LOADING SPINNER  */}
      {/*===================*/}
      {loading && (
        <Page background='light-2'>
          <PageContent style={pageContentStyles}>
            <Box align='center' style={{ minHeight: "80vh", marginTop: "40vh" }}>
              <Box align='center' direction='row-responsive' gap='small' pad='small'>
                <Spinner size='medium' />
                <Text size='medium'>Loading Port Data...</Text>
              </Box>
            </Box>
          </PageContent>
        </Page>
      )}

      {!loading && (
        <>
          {/*===============*/}
          {/*  PORT OF (x)  */}
          {/*===============*/}
          <Page background='light-1' pad={{ bottom: "medium" }}>
            <PageContent style={pageContentStyles}>
              <PageHeader
                title={portName ? `Port of ${portName}` : " "}
                style={{ fontWeight: "700 !important" }}
              />
              <Text style={{ paddingLeft: 4 }} size='small'>
                Now viewing all Carriers, Warehouses, and Info associated with the Port of{" "}
                {portName}.
              </Text>
            </PageContent>
          </Page>
          <Page background='light-2'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ top: "medium", bottom: "large" }}>
                {/*===============*/}
                {/* CARRIERS CARD */}
                {/*===============*/}
                <Box
                  align='center'
                  direction='row-responsive'
                  justify='between'
                  pad={{ bottom: "small" }}
                >
                  <Box>
                    <h1>Carriers</h1>
                  </Box>
                  <Box>
                    <Button
                      primary
                      icon={<Add />}
                      label='Add Carrier'
                      onClick={() => {
                        setAddingCarrier(true);
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  {/* ADD / EDIT CARRIER  */}
                  {addingCarrier && portId && (
                    <CarrierForm portId={portId} mode='add' resetForm={resetForm} />
                  )}
                </Box>
                <Card pad='medium' gap='small' background='white'>
                  <CarriersTable carriers={carriers} />
                </Card>
              </Box>
            </PageContent>
          </Page>
          {/*=================*/}
          {/*    WAREHAUSES   */}
          {/*=================*/}
          <Page background='light-1'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ top: "medium", bottom: "large" }}>
                {/* ADD / EDIT WAREHAUS  */}
                {addingWarehaus && portId && (
                  <WarehouseForm portId={portId} mode='add' resetForm={resetForm} />
                )}
                {/*===============*/}
                {/* WAREHAUSES CARD */}
                {/*===============*/}
                <Box
                  align='center'
                  direction='row-responsive'
                  justify='between'
                  pad={{ bottom: "small" }}
                >
                  <Box>
                    <h1>Warehouses</h1>
                  </Box>
                  <Box>
                    <Button
                      primary
                      icon={<Add />}
                      label='Add Warehouse'
                      onClick={() => {
                        setAddingWarehaus(true);
                      }}
                    />
                  </Box>
                </Box>
                <Card pad='medium' gap='small' background='white'>
                  <WarehousesTable warehouses={warehouses} />
                </Card>
              </Box>
            </PageContent>
          </Page>
          {/*==============*/}
          {/*  PORT INFO   */}
          {/*==============*/}
          <Page background='light-2'>
            <PageContent style={pageContentStyles}>
              <Box pad={{ top: "medium", bottom: "large" }}>
                <h1 style={{ marginBottom: 30 }}>Port Info</h1>
                <ul>
                  <li style={{ marginBottom: 10 }}>
                    <Text>
                      <strong>Address:</strong> {portData?.port_address}
                    </Text>
                  </li>
                  <li style={{ marginBottom: 10 }}>
                    <Text>
                      {" "}
                      <strong>Coordinates:</strong> {portData?.port_lat}&deg; N,{" "}
                      {portData?.port_lng}
                    </Text>
                    &deg; W
                  </li>
                </ul>
              </Box>
            </PageContent>
          </Page>
        </>
      )}
    </div>
  );
};
