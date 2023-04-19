import axios from "axios";
import {
  Box,
  Button,
  FileInput,
  Form,
  FormExtendedEvent,
  FormField,
  Spinner,
  Text,
  TextInput,
} from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { DocumentDownload, DocumentUpload, DocumentVerified } from "grommet-icons";
import { useEffect, useState } from "react";
import FormData from "form-data";
// import { createReadStream } from "fs";

interface DocumentsProps {
  carrierId?: number;
}

export const Documents = (props: DocumentsProps) => {
  const { carrierId } = props;
  const [documents, setDocuments] = useState([]); // Separate calls to get carrier documents
  const [documentsLoading, setDocumentsLoading] = useState(true);

  const getDocuments = () => {
    try {
      setDocumentsLoading(true);
      axios
        .get(`${API_URL}/carrier/${carrierId}/documents`)
        .then((res) => {
          if (res.status !== 200 || !res.data) {
            toast.error(`Problem getting documents - please refresh and try again`);
          } else {
            setDocuments(res.data);
          }
        })
        .catch(function (error) {
          toast.error(`Problem getting document - please refresh and try again`);
          console.log(error);
        })
        .finally(() => {
          resetForm();
        });
    } catch (e) {
      toast.error("Experienced an error getting files. Please refresh and try again.");
      console.log(e);
    }
  };

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
        .finally(() => {
          getDocuments();
        });
    } catch (e) {
      console.log("yes error", e);
      alert(JSON.stringify(e));
    }
  };

  const formOnChange = (event: FormExtendedEvent<{}, Element>) => {
    console.log("onChange... should we clear?");
  };

  useEffect(() => getDocuments(), []);

  const resetForm = () => {
    setDocumentsLoading(false);
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
      <Box>
        <Form onChange={formOnChange} onSubmit={uploadDocuments}>
          <div style={{ marginTop: 15, marginBottom: 0 }}>
            <FileInput
              messages={{
                dropPrompt: "To upload, drop a file here or click to browse your system...",
              }}
              name='file'
            />
          </div>
          <p style={{ color: "#666" }}>
            <strong>Note:</strong> Uploading two documents with the same name will overwrite the
            previous document.
          </p>
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
      <Box pad={{ top: "large" }}>
        {documentsLoading && (
          <Box align='center' direction='row' gap='small' pad='small'>
            <Spinner size='medium' />
            <Text size='medium'>Loading Documents...</Text>
          </Box>
        )}
        {!documents.length && !documentsLoading && (
          <p>No existing documents &mdash; please upload to view.</p>
        )}
        {documents.length && !documentsLoading && (
          <>
            <Box direction='row'>
              <Box style={{ marginLeft: 17 }}>
                <DocumentDownload />
              </Box>
              <Box>
                <h3 style={{ marginTop: 5, marginLeft: 10 }}>Downloadable Documents</h3>
              </Box>
            </Box>
            <ul style={{ marginTop: "medium", marginBottom: "none" }}>
              {documents.map((document: any) => (
                <DocumentPreview downloadUrl={document.url} filename={document.filename} />
              ))}
            </ul>
          </>
        )}

        {/* <DocumentPreview downloadUrl={} */}
      </Box>
    </>
  );
};

const DocumentPreview = (props: any) => (
  // <Box>
  <li style={{ marginBottom: 15 }}>
    {props.filename} <a href={props.downloadUrl}>Download Here</a>
  </li>
  // </Box>
);
