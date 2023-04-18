import axios from "axios";
import { Button, FileInput } from "grommet";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";
import { DocumentUpload } from "grommet-icons";

interface DocumentsProps {
  carrierId?: number;
}

export const Documents = (props: DocumentsProps) => {
  const { carrierId } = props;

  //
  // UPLOAD DOCUMENT POST
  //======================
  const uploadDocument = () => {
    try {
      const postData = {
        carrier_id: carrierId,
      };
      axios
        .post(`${API_URL}/documents`, postData)
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
      <FileInput
        name='file'
        onChange={(event: any) => {
          const fileList = event.target.files;
          for (let i = 0; i < fileList.length; i += 1) {
            const file = fileList[i];
            console.log(file);
          }
        }}
      />
    </>
  );
};
