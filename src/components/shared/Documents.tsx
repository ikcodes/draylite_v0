import axios from "axios";
import { Button } from "grommet";
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
      <h1>Documents Go Here, Bugaboo</h1>
      <Button primary icon={<DocumentUpload />} onClick={uploadDocument} label='Upload Document' />
    </>
  );
};
