import axios from "axios";
import { Box, Button, FileInput, Form, FormExtendedEvent, FormField, TextInput } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { DocumentUpload } from "grommet-icons";
import { useState } from "react";
import FormData from "form-data";
import { createReadStream } from "fs";

interface DocumentsProps {
  carrierId?: number;
}

export const Documents = (props: DocumentsProps) => {
  const { carrierId } = props;
  const [file, setFile] = useState() as any;

  //
  // UPLOAD DOCUMENT POST
  //======================
  const uploadDocuments = (event: FormExtendedEvent<{}, Element>) => {
    try {
      const formValues = event.value as any;

      // Three different ways to send post data
      const postData = {
        files: formValues.file[0],
      };

      let formData = new FormData();
      formData.append("files", formValues.file[0]);

      const form = new FormData();
      // This is where the error is right now: it needs fs to run createReadStream
      form.append("file[0]", createReadStream(formValues.file[0]));
      form.append("path[0]", "uploads/jpeg1.jpeg");
      console.log("form to post", form);

      // Just a quick switch to see what all 3 methods do in axios
      const dataToUpload = form;
      console.log("Data Im Uploading", dataToUpload);

      axios
        .post(`${API_URL}/upload`, form, {
          headers: form.getHeaders(),
        })
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem uploading document - please refresh and try again`);
          } else {
            toast.success(`Successfully uploaded document!`);
          }
        })
        .catch(function (error) {
          toast.error(`Problem uploading document - please refresh and try again`);
          console.log(error);
        })
        .finally(() => resetForm());
    } catch (e) {
      console.log("yes error", e);
      alert(JSON.stringify(e));
    }
  };

  const resetForm = () => {
    console.log("running reset");
  };

  //
  //  RENDER
  //======================
  return (
    <>
      <h1>Documents</h1>
      <Box>
        <Form
          onChange={(value) => console.log("Change", value)}
          onSubmit={uploadDocuments}
          // onSubmit={(event) => console.log("Submit", event.value, event.touched)}
        >
          <FormField label='Name' htmlFor='name' name='name'>
            <TextInput id='name' name='name' />
          </FormField>
          <FileInput
            name='file'
            onChange={(event: any) => {
              if (!event.target.files[0]) {
                console.log("no file!");
                return;
              }
              // console.log("file we are setting", event.target.files[0]);
              // setFile(event.target.files[0]);
              // const fileList = event.target.files;
              // for (let i = 0; i < fileList.length; i += 1) {
              // const file = fileList[i];
              // setFiles(fileList);
              // }
            }}
          />
          <p></p>
          <Box direction='row' justify='between' margin={{ top: "medium" }}>
            <Button label='Cancel' />
            <Button type='reset' label='Reset' />
            <Button icon={<DocumentUpload />} label='Upload Documents' type='submit' primary />
          </Box>
        </Form>
      </Box>
    </>
  );
};
