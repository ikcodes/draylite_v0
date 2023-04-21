import { Button, DataTable, Grid, Text } from "grommet";
import { Warehouse } from "../../utils/types";
import { AttributeButton } from "../shared/AttributeButton";
import { MapLocation } from "grommet-icons";
import { useNavigate } from "react-router-dom";

interface WarehousesTableProps {
  warehouses: Warehouse[];
}

export const WarehousesTable = (props: WarehousesTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      data={props.warehouses}
      columns={[
        {
          property: "",
          header: "Name",
          primary: true,
          render: (warehouse: Warehouse) => <Text weight={500}>{warehouse.warehouse_name}</Text>,
        },
        {
          property: "",
          header: "Attributes",
          size: "1/4",
          render: (warehouse: Warehouse) => (
            <Grid
              columns={{
                count: 4,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
            >
              {!!warehouse.warehouse_preferred && (
                <AttributeButton icon='preferred' text='Warehouse Is Preferred' />
              )}
              {!!warehouse.warehouse_overweight && (
                <AttributeButton icon='overweight' text='Accepts Overweight Freight' />
              )}
              {!!warehouse.warehouse_hazmat && (
                <AttributeButton icon='hazmat' text='Accepts Hazmat Freight' />
              )}
              {!!warehouse.warehouse_transload && (
                <AttributeButton icon='transload' text='Accepts Transload Freight' />
              )}
            </Grid>
          ),
        },
        {
          align: "center",
          header: "Contacts",
          property: "",
          render: (warehouse: Warehouse) => (
            <Text textAlign='center'>{warehouse.contacts?.length}</Text>
          ),
        },
        {
          align: "end",
          header: "",
          property: "",
          size: "1/5",
          render: (warehouse: Warehouse) => (
            <Button
              // FOR WAREHAUS: Use <MapLocation /> or <Organization />
              icon={<MapLocation />}
              label='View Warehouse Page'
              onClick={() => navigate(`/warehouse/${warehouse.warehouse_id}`)}
              secondary
              style={{ maxWidth: 300 }}
            />
          ),
        },
      ]}
    />
  );
};
