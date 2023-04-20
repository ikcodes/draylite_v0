import axios from "axios";
import toast from "react-hot-toast";
import { ChatOption } from "grommet-icons";
import { API_URL } from "../../utils/utils";
import { Box, Button, FormField, TextInput } from "grommet";
import { Formik, FormikValues, FormikHelpers } from "formik";
import { useState } from "react";

interface CommentsFormProps {
  fireOnRefresh?: () => void;
}

interface CommentsFormValues {
  comment: string;
}

export const CommentsForm = (props: CommentsFormProps) => {
  const { fireOnRefresh } = props;
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
      const postData = {
        comment: values.comment,
      };
      alert(JSON.stringify(postData));
      setCommentSubmitting(true);
      /* Here's the axios part, if you like.
      axios
        .post(`${API_URL}/comments`, postData)
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
          setCommentSubmitting(false);
          toast.success(`Successfully added comment!`);
          if (fireOnRefresh) {
            fireOnRefresh();
          }
        });
        */
    } catch (e) {
      toast.error("An unspecified error occurred - please refresh the page and try again");
      console.log(JSON.stringify(e));
    }
  };

  return (
    <>
      <h1>Comments</h1>
      <Formik initialValues={initialValues} onSubmit={submitComment}>
        {({ values, handleChange, handleSubmit, resetForm }) => (
          <form onSubmit={handleSubmit} style={{ paddingTop: 25 }}>
            <Box pad='none'>
              <FormField label='Comment'>
                <TextInput
                  disabled={commentSubmitting}
                  name='comment'
                  onChange={handleChange}
                  value={values.comment}
                />
              </FormField>
            </Box>
            <Box direction='row-responsive'>
              <Box width='medium' pad={{ vertical: "medium", right: "medium" }}>
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
