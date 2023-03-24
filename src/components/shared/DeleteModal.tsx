import { Box, Button, Heading, Layer, Text } from "grommet";

interface DeleteModalProps {
  heading: string;
  message: string;
  visible: boolean;
  closeFunction: () => void;
  proceedFunction: () => void;
}

export const DeleteModal = (props: DeleteModalProps) => {
  return (
    <>
      {props.visible && (
        <Layer onClickOutside={props.closeFunction} onEsc={props.closeFunction} position='center'>
          <Box pad='medium' gap='small' width='medium'>
            <Heading level={3} margin='none'>
              {props.heading}
            </Heading>
            <Text>{props.message}</Text>
            <Box
              as='footer'
              align='center'
              direction='row'
              gap='small'
              justify='end'
              pad={{ top: "medium", bottom: "small" }}
            >
              <Button label='Cancel' onClick={props.closeFunction} color='dark-3' />
              <Button
                color='status-critical'
                label={
                  <Text color='white'>
                    <strong>Delete</strong>
                  </Text>
                }
                onClick={props.proceedFunction}
                primary
              />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  );
};
