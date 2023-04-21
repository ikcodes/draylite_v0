import axios from "axios";
import { Page, PageContent, PageHeader, Box } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { PortsTable } from "../components/ports/PortsTable";
import { PortsMap } from "../components/ports/PortsMap";
import toast from "react-hot-toast";

export const Ports = () => {
  // Local state
  const [ports, setPorts] = useState([] as any[]);

  useEffect(() => {
    getPorts();
  }, []);

  const getPorts = () => {
    const apiUrl = `${API_URL}/ports`;
    axios.get(apiUrl).then((res) => {
      if (!res.data.data) {
        toast.error("Unable to fetch ports! Please refresh the page to try again.");
        return;
      }
      setPorts(res.data.data);
    });
  };

  //======================
  // MARKUP
  //======================
  return (
    <>
      <PortsMap ports={ports} />
      <Page background='light-3'>
        <PageContent style={{ marginTop: 0, paddingTop: 0 }}>
          <PageHeader title='All Ports' />
          <Box pad={{ bottom: "xlarge" }}>
            <PortsTable ports={ports} />
          </Box>
        </PageContent>
      </Page>
    </>
  );
};
