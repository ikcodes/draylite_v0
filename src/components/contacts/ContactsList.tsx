import { useParams } from "react-router-dom";

export const ContactsList = () => {
  const { carrierId } = useParams();
  return (
    <>
      <h1>Edit Carrier Contacts</h1>
      <h4>Carrier ID: {carrierId}</h4>
    </>
  );
};
