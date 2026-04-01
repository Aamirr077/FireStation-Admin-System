import { randomUUID } from "crypto";

export const db = {
  admins: [
    {
      id: "admin-1",
      email: "admin@test.com",
      password: "password123",
    },
  ],
  drivers: [],
  vehicles: [],
  bookings: [],
  driverVehicle: [],
  bookingVehicle: [],
  bookingStatus: [],
  bookingLocation: [],
};

export function createId() {
  return randomUUID();
}
