export const VEHICLE_STATUSES = [
    "BEFORE_PICKUP",
    "WAITING_FOR_CUSTOMER",
    "AFTER_PICKUP",
    "COMPLETED",
    "TRANSFER_IN_PROGRESS",
    "NO_SHOW",
  ] as const;
  
  export type VehicleStatus = (typeof VEHICLE_STATUSES)[number];
  