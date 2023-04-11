import axios from "axios";
import { Page, PageContent, Text, PageHeader } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { PortsTable } from "../components/ports/PortsTable";
import { pageContentStyles, pageStyles } from "../utils/styles";

export const Port = () => {
  // Local state
  const [ports, setPorts] = useState([] as any[]);

  useEffect(() => {
    getPorts();
  }, []);

  const [portName, setPortName] = useState("Example Port Name");

  const getPorts = () => {
    const apiUrl = `${API_URL}/ports`;
    axios.get(apiUrl).then((res) => {
      // Transform if needed...
      res.data.data.map((port: any) => {
        // port["carrier_preferred"] = carrier["carrier_preferred"] === 1;
        // carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
        // carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
        // carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      });
      setPorts(res.data.data);
    });
  };

  //======================
  // MARKUP
  //======================
  return (
    <>
      <Page background='light-1' style={pageStyles}>
        <PageContent style={pageContentStyles}>
          <PageHeader title={`Port of ${portName}`} />
          <PortsTable ports={ports} />
        </PageContent>
      </Page>
    </>
  );
};
