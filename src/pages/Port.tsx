import axios from "axios";
import { Page, PageContent, PageHeader, Card } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CarriersTable } from "../components/carriers/CarriersTable";
import { WarehousesTable } from "../components/warehouses/WarehousesTable";

export const Port = () => {
  // Local state
  const [portName, setPortName] = useState("");
  const [portData, setPortData] = useState() as any;
  const [carriers, setCarriers] = useState() as any;
  const [warehouses, setWarehouses] = useState() as any;

  const { portId } = useParams();

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
      setPortData(data);
      setPortName(data.port.port_name);
      if (data.carriers) {
        setCarriers(data.carriers);
      }
      if (data.warehouses) {
        setWarehouses(data.warehouses);
      }
    });
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
          <PageHeader title={portName ? `Port of ${portName}` : " "} />
          {/* <p style={{ marginTop: 0, marginBottom: 30 }}> */}
          {/* Now viewing all Carriers and Warehouses for {portName}. */}
          {/* </p> */}

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
          <Card pad='medium' gap='small' background='white'>
            <WarehousesTable
              warehouses={warehouses}
              editWarehouse={(warehouseId: number) => alert("Function not implemented.")}
              deleteWarehouse={(warehouseId: number) => alert("Function not implemented.")}
              viewWarehouseContacts={(warehouseId: number) => alert("Function not implemented.")}
            />
          </Card>
        </PageContent>
      </Page>
    </>
  );
};
