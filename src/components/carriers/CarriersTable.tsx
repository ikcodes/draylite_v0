import { Button, DataTable, Grid, Text } from "grommet";
import { Carrier } from "../../utils/types";
import { AttributeButton } from "../shared/AttributeButton";
import { Deliver } from "grommet-icons";
import { useNavigate } from "react-router-dom";

interface CarriersTableProps {
  carriers: Carrier[];
}

export const CarriersTable = (props: CarriersTableProps) => {
  const navigate = useNavigate();

  return (
    <DataTable
      data={props.carriers}
      columns={[
        {
          property: "",
          header: "Name",
          primary: true,
          render: (carrier: Carrier) => <Text weight={500}>{carrier.carrier_name}</Text>,
        },
        {
          property: "",
          header: "Attributes",
          size: "1/4",
          render: (carrier: Carrier) => (
            <Grid
              columns={{
                count: 4,
                size: "small",
              }}
              gap='xxsmall'
              width='xxsmall'
            >
              {!!carrier.carrier_preferred && (
                <AttributeButton icon='preferred' text='Carrier Is Preferred' />
              )}
              {!!carrier.carrier_overweight && (
                <AttributeButton icon='overweight' text='Accepts Overweight Freight' />
              )}
              {!!carrier.carrier_hazmat && (
                <AttributeButton icon='hazmat' text='Accepts Hazmat Freight' />
              )}
              {!!carrier.carrier_transload && (
                <AttributeButton icon='transload' text='Accepts Transload Freight' />
              )}
            </Grid>
          ),
        },
        {
          align: "center",
          header: "Contacts",
          property: "",
          render: (carrier: Carrier) => <Text textAlign='center'>{carrier.contacts?.length}</Text>,
        },
        {
          align: "center",
          header: "",
          property: "",
          render: (carrier: Carrier) => (
            <Button
              // FOR WAREHAUS: Use <MapLocation /> or <Organization />
              icon={<Deliver />}
              label='View Carrier Page'
              onClick={() => navigate(`/carrier/${carrier.carrier_id}`)}
              primary
            />
          ),
        },
      ]}
    />
  );
};
