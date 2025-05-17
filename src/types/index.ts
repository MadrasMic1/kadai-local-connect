
export type UserRole = "customer" | "vendor";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone?: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface Vendor extends User {
  role: "vendor";
  serviceArea: {
    pinCode?: string;
    radius?: number;
  };
  categories?: string[];
  description?: string;
  availability: TimeSlot[];
  status?: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
}

export interface Customer extends User {
  role: "customer";
  addresses?: Array<{
    id: string;
    title: string;
    address: string;
    pinCode: string;
    isDefault?: boolean;
  }>;
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  maxBookings?: number;
  currentBookings: number;
  vendorId: string;
}

export interface Booking {
  id: string;
  customerId: string;
  vendorId: string;
  timeSlotId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}
