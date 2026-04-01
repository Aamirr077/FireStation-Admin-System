import type { VehicleStatus } from "./constants.js";

export type UUID = string;

export type Driver = {
  id: UUID;
  name: string;
  phone: string;
  preferred_comm: "whatsapp" | string;
  active: boolean;
  created_at: string;
};

export type Vehicle = {
  id: UUID;
  brand: string;
  model: string;
  color: string;
  license_plate: string;
  active: boolean;
  created_at: string;
};

export type Booking = {
  id: UUID;
  booking_ref: string;
  pickup_at: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  notes: string | null;
  created_at: string;
};

export type BookingAllocation = {
  booking_id: UUID;
  vehicle_id: UUID;
  vehicle_identifier: string;
};

export type StatusEvent = {
  booking_id: UUID;
  status: VehicleStatus;
  updated_by: string;
  updated_at: string;
};
