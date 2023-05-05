import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Carrier } from "../utils/types";
import { API_URL } from "../utils/utils";

export const useCarriers = (portId: string | undefined) => {
  //====================
  // LOCAL STATE
  //====================
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [portName, setPortName] = useState("");
  const [carriers, setCarriers] = useState([] as Carrier[]);
  const [carrierId, setCarrierId] = useState(0);

  //====================
  // API FUNCTIONS
  //====================
  const deleteCarrier = (carrierId: number) => {
    axios
      .delete(`${API_URL}/carriers/${carrierId}`)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Problem deleting carrier - please refresh and try again");
          console.log(response.data);
        } else {
          toast.success("Successfully deleted carrier!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => resetForm());
  };

  useEffect(() => {
    getCarriers();
  }, []);

  //======================
  // PAGE MGMT
  //======================
  const getCarriers = () => {
    setLoading(true);
    axios.get(`${API_URL}/carriers/port/${portId}`).then((res) => {
      res.data.data.carriers.map((carrier: any) => {
        carrier["carrier_preferred"] = carrier["carrier_preferred"] === 1;
        carrier["carrier_overweight"] = carrier["carrier_overweight"] === 1;
        carrier["carrier_transload"] = carrier["carrier_transload"] === 1;
        carrier["carrier_hazmat"] = carrier["carrier_hazmat"] === 1;
      });
      if (res.data.data.port.port_name) {
        setPortName(res.data.data.port.port_name);
      }
      setCarriers(res.data.data.carriers);
      setLoading(false);
    });
  };

  const resetForm = () => {
    setMode("");
    getCarriers();
  };

  return {
    mode,
    setMode,
    loading,
    setLoading,
    portName,
    setPortName,
    carriers,
    setCarriers,
    carrierId,
    setCarrierId,
    deleteCarrier,
    getCarriers,
    resetForm,
  };
};
