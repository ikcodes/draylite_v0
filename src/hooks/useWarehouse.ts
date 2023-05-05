import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { API_URL } from "../utils/utils";

export const useWarehouse = (warehouseId: string | undefined) => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [contacts, setContacts] = useState() as any;
  const [comments, setComments] = useState() as any;
  const [warehouse, setWarehouse] = useState() as any;

  //===================================================
  // GET CARRIER DATA:
  // All attributes that affect this SPECIFIC warehouse.
  //====================================================
  const getWarehouseData = () => {
    setLoading(true);
    const url = `${API_URL}/warehouses/${warehouseId}`;
    axios.get(url).then((res) => {
      if (!res.data.data || !res.data.data.warehouse) {
        setLoading(false);
        console.log(res.data.data);
        toast.error("Unable to get warehouse! Please refresh the page to try again.");
        return;
      }
      const data = res.data.data;

      // Set base warehouse info (shouldn't change unless edited)
      let warehouse = data.warehouse;
      warehouse["warehouse_preferred"] = warehouse["warehouse_preferred"] === 1;
      warehouse["warehouse_overweight"] = warehouse["warehouse_overweight"] === 1;
      warehouse["warehouse_transload"] = warehouse["warehouse_transload"] === 1;
      warehouse["warehouse_hazmat"] = warehouse["warehouse_hazmat"] === 1;
      setWarehouse(warehouse);

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

  const getWarehouseComments = () => {
    axios.get(`${API_URL}/warehouse/${warehouseId}/comments`).then((res) => {
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
    getWarehouseData();
  }, []);

  return {
    loading,
    setLoading,
    editing,
    setEditing,
    contacts,
    setContacts,
    comments,
    setComments,
    warehouse,
    setWarehouse,
    getWarehouseComments,
    getWarehouseData,
  };
};
