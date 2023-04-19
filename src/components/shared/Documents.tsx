import axios from "axios";
import { Box, Button, FileInput, Form, FormExtendedEvent, FormField, TextInput } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { DocumentUpload } from "grommet-icons";
import { useState } from "react";
import FormData from "form-data";
// import { createReadStream } from "fs";

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
      // Get file and assemble post data
      const formValues = event.value as any;
      let formData = new FormData();
      formData.append("files", formValues.file[0]);
      formData.append("carrier_id", carrierId);
      axios
        .post(`${API_URL}/upload`, formData)
        .then((response) => {
          if (response.status !== 200) {
            toast.error(`Problem uploading document - please refresh and try again`);
          } else {
            toast.success(`Successfully uploaded ${formValues.file[0].name}!`);
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
      <h1>
        Documents
        {/* <DocumentUpload /> */}
      </h1>
      <p>
        <strong>Note:</strong> Uploading two documents with the same name will overwrite the
        previous document.
      </p>
      <Box>
        <Form
          onChange={(value) => console.log("Change", value)}
          onSubmit={uploadDocuments}
          // onSubmit={(event) => console.log("Submit", event.value, event.touched)}
        >
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
          <Box direction='row' margin={{ top: "medium" }}>
            <Box basis='1/2' margin={{ right: "xsmall" }}>
              <Button icon={<DocumentUpload />} label='Upload Document' type='submit' primary />
            </Box>
            <Box basis='1/4' margin={{ right: "xsmall" }}>
              <Button type='reset' label='Reset' />
            </Box>
            <Box basis='1/4' margin={{ right: "xsmall" }}>
              <Button label='Cancel' />
            </Box>
          </Box>
        </Form>
      </Box>
    </>
  );
};
