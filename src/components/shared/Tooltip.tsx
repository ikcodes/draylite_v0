import { Box } from "grommet";

export const Tooltip = (text: string) => (
  <Box
    pad='xsmall'
    elevation='small'
    background='#EDEDED' // no opacity
    round='xsmall'
    margin='xsmall'
    overflow='hidden'
    align='center'
  >
    {text}
  </Box>
);
