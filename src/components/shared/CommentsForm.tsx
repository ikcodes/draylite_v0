import axios from "axios";
import { Box, Button, Form, FormField, TextInput } from "grommet";
import { ChatOption } from "grommet-icons";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { Formik, Field, FormikValues } from "formik";

interface CommentsProps {
  carrierId?: number;
  fireOnRefresh: () => void;
}

interface CommentValues {
  comment: string;
}

export const CommentsForm = (props: CommentsProps) => {
  const { carrierId, fireOnRefresh } = props;

  const initialValues: CommentValues = { comment: "" };

  //
  // SUBMIT COMMENT POST
  //======================
  const submitComment = (values: FormikValues) => {
    try {
      if (!values.comment) {
        toast.error("Invalid comment! Please leave something.");
        return;
      }
      const postData = {
        carrier_id: carrierId,
        comment: values.comment,
      };
      axios
        .post(`${API_URL}/comments`, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem adding comment - please refresh and try again`);
          } else {
            toast.success(`Successfully added comment!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem adding comment - please refresh and try again`);
          console.log(error);
        })
        .finally(() => fireOnRefresh());
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return (
    <>
      <h1>Comments Go Here!</h1>
      <Formik initialValues={initialValues} onSubmit={submitComment}>
        {/* TODO: Clear aht this form when you're done. */}
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} style={{ paddingTop: 25 }}>
            {carrierId && <input type='hidden' name='carrier_id' value={carrierId} />}
            <Box pad='none'>
              <FormField label='Contact'>
                <TextInput name='comment' onChange={handleChange} value={values.comment} />
              </FormField>
            </Box>
            <Box direction='row'>
              <Box width='small' pad={{ vertical: "medium", right: "medium" }}>
                <Button icon={<ChatOption />} label='Add Comment' primary type='submit' />
              </Box>
              <Box width='small' pad={{ vertical: "medium" }}>
                <Button label={"Cancel"} secondary onClick={() => fireOnRefresh()} />
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
