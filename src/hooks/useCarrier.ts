import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";

export const useCarrier = (carrierId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [carrier, setCarrier] = useState() as any;
  const [contacts, setContacts] = useState() as any;
  const [comments, setComments] = useState() as any;
  const [editing, setEditing] = useState(false);

  //===================================================
  // GET CARRIER DATA:
  // All attributes that affect this SPECIFIC carrier.
  //====================================================
  const getCarrierData = () => {
    setLoading(true);
    const url = `${API_URL}/carriers/${carrierId}`;
    axios.get(url).then((res) => {
      if (!res.data.data || !res.data.data.carrier) {
        setLoading(false);
        console.log(res.data.data);
        toast.error("Unable to get carrier! Please refresh the page to try again.");
        return;
      }
      const data = res.data.data;

      // Set base carrier info (shouldn't change unless edited)
      let carrier = data.carrier;
      carrier["carrier_preferred"] = carrier["carrier_preferred"] === 1;
      carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
      carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
      carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      setCarrier(carrier);

      // Set additional data (separated so we can refresh it without refreshing the whole page)
      if (data.contacts) {
        setContacts(data.contacts);
      }
      if (data.comments) {
        setComments(data.comments);
      }
      setLoading(false);
    });
  };

  const getCarrierComments = () => {
    axios.get(`${API_URL}/carrier/${carrierId}/comments`).then((res) => {
      if (!res.data) {
        toast.error("Unable to load comments...");
        console.log(res.data);
        return;
      }
      if (res.data.data) {
        setComments(res.data.data);
      }
    });
  };

  useEffect(() => {
    getCarrierData();
  }, []);

  return {
    loading,
    setLoading,
    carrier,
    setCarrier,
    contacts,
    setContacts,
    comments,
    setComments,
    editing,
    setEditing,
    getCarrierData,
    getCarrierComments,
  };
};
