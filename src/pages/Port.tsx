import axios from "axios";
import { Page, PageContent, Text, PageHeader } from "grommet";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/utils";
import { PortsTable } from "../components/ports/PortsTable";
import { pageContentStyles, pageStyles } from "../utils/styles";
import { useParams } from "react-router-dom";

export const Port = () => {
  // Local state
  const [portData, setPortData] = useState() as any;
  const [portName, setPortName] = useState("Example Port Name");

  const { portId } = useParams();

  useEffect(() => {
    getPortData();
  }, []);

  const getPortData = () => {
    const apiUrl = `${API_URL}/port/${portId}`;
    axios.get(apiUrl).then((res) => {
      setPortData(res.data.data);
      console.log("WE GOT THAT SHIT", res.data);
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
        </PageContent>
      </Page>
    </>
  );
};
