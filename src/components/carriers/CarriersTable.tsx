import { Box, Button, DataTable, Grid, Heading, Layer, Text } from "grommet";
import { useState } from "react";
import { Carrier } from "../../utils/types";
import { ActionBox } from "../shared/ActionBox";
import { AttributeButton } from "../shared/AttributeButton";
import { DeleteModal } from "../shared/DeleteModal";

interface CarriersTableProps {
  carriers: Carrier[];
  editCarrier: (carrierId: number) => void;
  deleteCarrier: (carrierId: number) => void;
  viewCarrierContacts: (carrierId: number) => void;
}

export const CarriersTable = (props: CarriersTableProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    // <Data data={props.carriers} toolbar>  //  Filtering ?
    <DataTable
      data={props.carriers}
      columns={[
        {
          property: "carrier_name",
          header: "Name",
          primary: true,
        },
        {
          property: "",
          header: "Attributes",
          render: (datum: Carrier) => (
            <Grid
              columns={{
                count: 3,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
            >
              {datum.carrier_is_preferred && (
                <AttributeButton icon='preferred' text='Carrier Is Preferred' />
              )}
              {datum.carrier_overweight && (
                <AttributeButton icon='overweight' text='Accepts Overweight Freight' />
              )}
              {datum.carrier_hazmat && (
                <AttributeButton icon='hazmat' text='Accepts Hazmat Freight' />
              )}
            </Grid>
          ),
        },
        {
          header: "Actions",
          property: "",
          render: (datum: Carrier) => (
            <Grid
              columns={{
                count: 3,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
            >
              <ActionBox
                actionButtonClick={() => props.viewCarrierContacts(datum.carrier_id)}
                toolTipText='View Carrier Contats'
                mode='view'
              />
              <ActionBox
                actionButtonClick={() => props.editCarrier(datum.carrier_id)}
                toolTipText='Edit This Carrier'
                mode='edit'
              />
              <ActionBox
                actionButtonClick={() => setIsDeleting(true)}
                toolTipText='Delete This Carrier'
                mode='delete'
              />
              <DeleteModal
                heading={`Delete ${datum.carrier_name}?`}
                message={`Are you sure you want to delete ${datum.carrier_name}? This action cannot be undone.`}
                visible={isDeleting}
                closeFunction={() => setIsDeleting(false)}
                proceedFunction={() => {
                  props.deleteCarrier(datum.carrier_id);
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