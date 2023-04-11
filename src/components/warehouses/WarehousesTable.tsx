import { Box, Button, DataTable, Grid, Heading, Layer, Text } from "grommet";
import { useState } from "react";
import { Warehouse } from "../../utils/types";
import { ActionBox } from "../shared/ActionBox";
import { AttributeButton } from "../shared/AttributeButton";
import { DeleteModal } from "../shared/DeleteModal";

interface WarehousesTableProps {
  warehouses: Warehouse[];
  editWarehouse: (warehouseId: number) => void;
  deleteWarehouse: (warehouseId: number) => void;
  viewWarehouseContacts: (warehouseId: number) => void;
}

export const WarehousesTable = (props: WarehousesTableProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    // <Data data={props.Warehouses} toolbar>  //  Filtering ?
    <DataTable
      data={props.warehouses}
      columns={[
        {
          property: "warehouse_name",
          header: "Name",
          primary: true,
        },
        {
          property: "",
          header: "Attributes",
          render: (warehouse: Warehouse) => (
            <Grid
              columns={{
                count: 4,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
            >
              {warehouse.warehouse_preferred && (
                <AttributeButton icon='preferred' text='Warehouse Is Preferred' />
              )}
              {warehouse.warehouse_overweight && (
                <AttributeButton icon='overweight' text='Accepts Overweight Freight' />
              )}
              {warehouse.warehouse_hazmat && (
                <AttributeButton icon='hazmat' text='Accepts Hazmat Freight' />
              )}
              {warehouse.warehouse_transload && (
                <AttributeButton icon='transload' text='Accepts Transload Freight' />
              )}
            </Grid>
          ),
        },
        {
          header: "Actions",
          property: "",
          render: (warehouse: Warehouse) => (
            <Grid
              columns={{
                count: 3,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
              key={warehouse.warehouse_id}
            >
              <ActionBox
                actionButtonClick={() => props.viewWarehouseContacts(warehouse.warehouse_id)}
                toolTipText='View Carrier Contats'
                mode='view'
              />
              <ActionBox
                actionButtonClick={() => props.editWarehouse(warehouse.warehouse_id)}
                toolTipText='Edit This Carrier'
                mode='edit'
              />
              <ActionBox
                actionButtonClick={() => setIsDeleting(true)}
                toolTipText='Delete This Warehouse'
                mode='delete'
              />
              <DeleteModal
                heading={`Delete ${warehouse.warehouse_name}?`}
                message={`Are you sure you want to delete ${warehouse.warehouse_name}? This action cannot be undone.`}
                visible={isDeleting}
                closeFunction={() => setIsDeleting(false)}
                proceedFunction={() => {
                  props.deleteWarehouse(warehouse.warehouse_id);
                  setIsDeleting(false);
                }}
              />
            </Grid>
          ),
        },
      ]}
    />
  );
};
