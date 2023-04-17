import axios from "axios";
import { Button } from "grommet";
import { ChatOption } from "grommet-icons";
import toast from "react-hot-toast";
import { API_URL } from "../../utils/utils";

interface CommentsProps {
  carrierId?: number;
}

export const Comments = (props: CommentsProps) => {
  const { carrierId } = props;

  //
  // ADD COMMENT POST
  //======================
  const addComment = () => {
    try {
      const postData = {
        carrier_id: carrierId,
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
        .finally(() => resetForm());
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  const resetForm = () => {
    console.log("running reset");
  };

  return (
    <>
      <h1>Comments Go Here!</h1>
      <Button primary icon={<ChatOption />} onClick={addComment} label='Add Comment' />
    </>
  );
};
