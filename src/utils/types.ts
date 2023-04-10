//
// CARRIER TYPES
//===============

export interface Carrier {
  carrier_id: number;
  carrier_name: string;
  carrier_hazmat: boolean;
  carrier_overweight: boolean;
  carrier_is_preferred: boolean;
  contacts?: Contact[];
}

export interface CarrierFormProps {
  carrier?: Carrier;
  portId: number;
  mode: string;
  resetForm: any;
}

//
// CONTACT TYPES
//===============

export interface Contact {
  contact_id: number;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  contact_notes: string;
  carrier_id: number;
}

export interface ContactFormProps {
  carrierId?: number; // For new
  contact?: Contact; // For existing
  mode: string;
  resetForm: any;
}

export interface CarrierDetailsModalProps {
  carrier?: Carrier; // can still add without full data
  getCarriers: () => void;
  setParentMode: (mode: string) => void;
}

//
// WAREHOUSE TYPES
//=================

export interface Warehouse {
  warehouse_id: number;
  warehouse_name: string;
  warehouse_hazmat: boolean;
  warehouse_overweight: boolean;
  warehouse_is_preferred: boolean;
  contacts?: Contact[];
}

export interface WarehouseDetailsModalProps {
  warehouse?: Warehouse; // can still add without full data
  getWarehouses: () => void;
  setParentMode: (mode: string) => void;
}

export interface WarehouseFormProps {
  warehouse?: Warehouse;
  portId: number;
  mode: string;
  resetForm: any;
}

export interface ContactListItemProps {
  contact: Contact;
}
