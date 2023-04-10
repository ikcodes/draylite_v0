import axios from "axios";
import { Page, PageContent, Text, PageHeader } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../../utils/utils";
import { PortsTable } from "./PortsTable";
import { pageStyles } from "../../utils/styles";

export const Ports = () => {
  // Local state
  const [ports, setPorts] = useState([] as any[]);

  useEffect(() => {
    getPorts();
  }, []);

  const getPorts = () => {
    const apiUrl = `${API_URL}/ports`;
    axios.get(apiUrl).then((res) => {
      // Transform if needed...
      res.data.data.map((port: any) => {
        // port["carrier_is_preferred"] = carrier["carrier_is_preferred"] === 1;
        // carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
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
        <PageContent>
          <PageHeader title='Ports' />
          <Text style={{ marginBottom: 20 }}>
            Select a port to view carriers that service that port. Edit, add, or delete Carriers as
            necessary.
          </Text>

          <PortsTable ports={ports} />
        </PageContent>
      </Page>
    </>
  );
};
