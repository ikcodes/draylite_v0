import axios from "axios";
import toast from "react-hot-toast";
import { ChatOption } from "grommet-icons";
import { API_URL } from "../../utils/utils";
import { Box, Button, FormField, TextInput } from "grommet";
import { Formik, FormikValues, FormikHelpers } from "formik";
import { useState } from "react";

interface CommentsFormProps {
  carrierId?: number;
  warehouseId?: number;
  fireOnRefresh: () => void;
}

interface CommentsFormValues {
  comment: string;
}

export const CommentsForm = (props: CommentsFormProps) => {
  const { carrierId, warehouseId, fireOnRefresh } = props;
  const initialValues: CommentsFormValues = { comment: "" };
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  //
  // SUBMIT COMMENT POST
  //======================
  const submitComment = (
    values: FormikValues,
    { resetForm }: FormikHelpers<CommentsFormValues>
  ) => {
    try {
      if (!values.comment) {
        toast.error("Invalid comment! Please leave something.");
        return;
      }
      let postData;
      let apiUrl = "";
      if (warehouseId) {
        postData = {
          warehouse_id: warehouseId,
          comment: values.comment,
        };
        apiUrl = `${API_URL}/comments/warehouse`;
      }
      if (carrierId) {
        postData = {
          carrier_id: carrierId,
          comment: values.comment,
        };
        apiUrl = `${API_URL}/comments`;
      }
      if (!postData?.carrier_id && !postData?.warehouse_id) {
        toast.error("need at least a warehouse or carrier id!");
        return;
      }
      setCommentSubmitting(true);
      axios
        .post(apiUrl, postData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem adding comment - please refresh and try again`);
            setCommentSubmitting(false);
          }
        })
        .catch(function (error) {
          toast.error(`Problem adding comment - please refresh and try again`);
          console.log(error);
        })
        .finally(() => {
          resetForm();
          fireOnRefresh();
          setCommentSubmitting(false);
          toast.success(`Successfully added comment!`);
        });
    } catch (e) {
      toast.error("An unspecified error occurred - please refresh the page and try again");
      console.log(JSON.stringify(e));
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={submitComment}>
        {({ values, handleChange, handleSubmit, resetForm }) => (
          <form onSubmit={handleSubmit}>
            {carrierId && <input type='hidden' name='carrier_id' value={carrierId} />}
            <Box direction='row-responsive'>
              <Box pad='none' width='large'>
                <FormField>
                  <TextInput
                    disabled={commentSubmitting}
                    name='comment'
                    onChange={handleChange}
                    placeholder='Leave a comment... '
                    value={values.comment}
                  />
                </FormField>
              </Box>
              <Box width='medium' pad={{ vertical: "small", left: "medium" }}>
                <Button
                  disabled={commentSubmitting}
                  icon={<ChatOption />}
                  label='Add Comment'
                  primary
                  type='submit'
                />
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};
