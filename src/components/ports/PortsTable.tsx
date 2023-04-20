import { Box, Button, DataTable, Grid, Heading, Layer, Text } from "grommet";
import { Link } from "react-router-dom";

interface PortsTableProps {
  ports: any[];
}

export const PortsTable = (props: PortsTableProps) => {
  return (
    <DataTable
      data={props.ports}
      columns={[
        {
          property: "port_name",
          header: "Port",
          primary: true,
        },
        {
          header: "Page",
          align: "center",
          property: "",
          render: (datum: any) => (
            <Link to={`/port/${datum?.port_id}`} key={"port-page"}>
              <Button label={"View Port Page"} primary />
            </Link>
          ),
        },
        {
          header: "Carriers",
          property: "",
          align: "center",
          render: (datum: any) => (
            <Link to={`/port/${datum?.port_id}/carriers`} key={"i-think-this-was-wrong"}>
              <Button label={"View Carriers"} primary />
            </Link>
          ),
        },
        {
          header: "Warehouses",
          property: "",
          align: "center",
          render: (datum: any) => (
            <Link to={`/port/${datum?.port_id}/warehouses`} key={"warehauses"}>
              <Button label={"View Warehouses"} primary />
            </Link>
          ),
        },
      ]}
    />
  );
};
