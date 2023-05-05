import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";

export const usePort = (portId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [portName, setPortName] = useState("");
  const [portData, setPortData] = useState() as any;
  const [carriers, setCarriers] = useState() as any;
  const [warehouses, setWarehouses] = useState() as any;
  const [addingCarrier, setAddingCarrier] = useState(false);
  const [addingWarehaus, setAddingWarehaus] = useState(false);

  useEffect(() => {
    getPortData();
  }, []);

  const getPortData = () => {
    setLoading(true);
    const apiUrl = `${API_URL}/port/${portId}`;
    axios
      .get(apiUrl)
      .then((res) => {
        if (!res.data.data || !res.data.data.port) {
          toast.error("Failed to load ports! Please refresh the page and try again.");
          return;
        }
        const data = res.data.data;
        setPortData(data.port);
        setPortName(data.port.port_name);
        if (data.carriers) {
          setCarriers(data.carriers);
        }
        if (data.warehouses) {
          setWarehouses(data.warehouses);
        }
      })
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setAddingCarrier(false);
    setAddingWarehaus(false);
    getPortData();
  };

  return {
    loading,
    setLoading,
    portName,
    setPortName,
    portData,
    setPortData,
    carriers,
    setCarriers,
    warehouses,
    setWarehouses,
    addingCarrier,
    setAddingCarrier,
    addingWarehaus,
    setAddingWarehaus,
    getPortData,
    resetForm,
  };
};
