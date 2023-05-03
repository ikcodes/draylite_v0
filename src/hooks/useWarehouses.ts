import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Warehouse } from "../utils/types";
import { API_URL } from "../utils/utils";

export const useWarehouses = (portId: string | undefined) => {
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [portName, setPortName] = useState("");
  const [warehouses, setWarehouses] = useState([] as Warehouse[]);
  const [warehouseId, setWarehouseId] = useState(0);

  const deleteWarehouse = (warehouseId: number) => {
    axios
      .delete(`${API_URL}/warehouses/${warehouseId}`)
      .then((response) => {
        if (response.status !== 200) {
          toast.error("Problem deleting warehouse - please refresh and try again");
          console.log(response.data);
        } else {
          toast.success("Successfully deleted warehouse!");
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => resetForm());
  };

  const getWarehouses = () => {
    setLoading(true);
    axios.get(`${API_URL}/warehouses/port/${portId}`).then((res) => {
      res.data.data.warehouses.map((warehouse: any) => {
        warehouse["warehouse_overweight"] = warehouse["warehouse_overweight"] === 1;
        warehouse["warehouse_preferred"] = warehouse["warehouse_preferred"] === 1;
        warehouse["warehouse_transload"] = warehouse["warehouse_transload"] === 1;
        warehouse["warehouse_hazmat"] = warehouse["warehouse_hazmat"] === 1;
      });
      if (res.data.data.port.port_name) {
        setPortName(res.data.data.port.port_name);
      }
      setWarehouses(res.data.data.warehouses);
      setLoading(false);
    });
  };

  const resetForm = () => {
    setMode("");
    getWarehouses();
  };

  return {
    mode,
    setMode,
    loading,
    setLoading,
    portName,
    setPortName,
    warehouses,
    setWarehouses,
    warehouseId,
    setWarehouseId,
    deleteWarehouse,
    getWarehouses,
    resetForm,
  };
};
