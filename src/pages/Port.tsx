import axios from "axios";
import { Page, PageContent, PageHeader, Card, Box, Heading, Grid, Button } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CarriersTable } from "../components/carriers/CarriersTable";
import { WarehousesTable } from "../components/warehouses/WarehousesTable";
import { CarrierForm } from "../components/carriers/CarrierForm";
import { Add } from "grommet-icons";

export const Port = () => {
  // Local state
  const [portName, setPortName] = useState("");
  const [portData, setPortData] = useState() as any;
  const [carriers, setCarriers] = useState() as any;
  const [warehouses, setWarehouses] = useState() as any;
  const { portId } = useParams();

  const [adding, setAdding] = useState(false);

  useEffect(() => {
    getPortData();
  }, []);

  const getPortData = () => {
    const apiUrl = `${API_URL}/port/${portId}`;
    axios.get(apiUrl).then((res) => {
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
    });
  };

  const resetForm = () => {
    setAdding(false);
    getPortData();
  };

  //======================
  // MARKUP
  //======================
  return (
    <>
      <Page background='light-1' style={pageStyles}>
        <PageContent style={pageContentStyles}>
          {/*===============*/}
          {/*  PORT OF (x)  */}
          {/*===============*/}
          <Box align='bottom' direction='row' justify='between'>
            <Box>
              <PageHeader title={portName ? `Port of ${portName}` : " "} />
            </Box>
            <Box>
              <Button
                primary
                icon={<Add />}
                label='Add Carrier'
                onClick={() => {
                  setAdding(true);
                }}
              />
            </Box>
          </Box>
          {/* <p style={{ marginTop: 0, marginBottom: 30 }}> */}
          {/* Now viewing all Carriers and Warehouses for {portName}. */}
          {/* </p> */}

          {/* ADD / EDIT CARRIER  */}
          {adding && portId && <CarrierForm portId={portId} mode='add' resetForm={resetForm} />}

          {/*===============*/}
          {/* CARRIERS CARD */}
          {/*===============*/}
          <h1 style={{ marginLeft: 10, marginTop: 30, marginBottom: 30 }}>Carriers</h1>
          <Card pad='medium' gap='small' background='white' style={{ marginBottom: 60 }}>
            <CarriersTable
              carriers={carriers}
              editCarrier={(carrierId: number) => alert("Function not implemented.")}
              deleteCarrier={(carrierId: number) => alert("Function not implemented.")}
              viewCarrierContacts={(carrierId: number) => alert("Function not implemented.")}
            />
          </Card>

          {/*=================*/}
          {/* WAREHAUSES CARD */}
          {/*=================*/}
          <h1 style={{ marginLeft: 10, marginTop: 10, marginBottom: 30 }}>Warehouses</h1>
          <Card pad='medium' gap='small' background='white' style={{ marginBottom: 60 }}>
            <WarehousesTable
              warehouses={warehouses}
              editWarehouse={(warehouseId: number) => alert("Function not implemented.")}
              deleteWarehouse={(warehouseId: number) => alert("Function not implemented.")}
              viewWarehouseContacts={(warehouseId: number) => alert("Function not implemented.")}
            />
          </Card>

          {/*==============*/}
          {/*  PORT INFO   */}
          {/*==============*/}
          <div style={{ marginLeft: 10 }}>
            <h1 style={{ marginTop: 10, marginBottom: 30 }}>Port Info</h1>
            <ul>
              <li style={{ marginBottom: 10 }}>
                <strong>Address:</strong> {portData?.port_address}
              </li>
              <li style={{ marginBottom: 10 }}>
                <strong>Coordinates:</strong> {portData?.port_lat}&deg; N, {portData?.port_lng}&deg;
                W
              </li>
            </ul>
          </div>
        </PageContent>
      </Page>
    </>
  );
};
