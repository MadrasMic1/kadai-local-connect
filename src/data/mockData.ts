
import { User, Vendor, Customer, TimeSlot, Booking } from "../types";

// Mock users (base)
export const mockUsers: User[] = [
  {
    id: "v1",
    name: "Farm Fresh Vegetables",
    role: "vendor",
    email: "freshveg@example.com",
    phone: "9876543210",
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Bangalore, Karnataka",
    },
  },
  {
    id: "v2",
    name: "Organic Fruits",
    role: "vendor",
    email: "organicfruits@example.com",
    phone: "8765432109",
    location: {
      latitude: 12.9783,
      longitude: 77.6408,
      address: "Bangalore, Karnataka",
    },
  },
  {
    id: "c1",
    name: "Rahul Kumar",
    role: "customer",
    email: "rahul@example.com",
    phone: "7654321098",
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Richmond Town, Bangalore",
    },
  },
  {
    id: "c2",
    name: "Priya Singh",
    role: "customer",
    email: "priya@example.com",
    phone: "6543210987",
    location: {
      latitude: 12.9783,
      longitude: 77.6408,
      address: "Indiranagar, Bangalore",
    },
  },
];

// Mock vendors
export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Farm Fresh Vegetables",
    role: "vendor",
    email: "freshveg@example.com",
    phone: "9876543210",
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Bangalore, Karnataka",
    },
    serviceArea: {
      pinCode: "560001",
      radius: 5,
    },
    categories: ["Vegetables", "Fruits"],
    description: "Fresh vegetables directly from farm",
    availability: [
      {
        id: "ts1",
        date: "2025-05-18",
        startTime: "08:00",
        endTime: "10:00",
        maxBookings: 10,
        currentBookings: 3,
        vendorId: "v1",
      },
      {
        id: "ts2",
        date: "2025-05-18",
        startTime: "16:00",
        endTime: "18:00",
        maxBookings: 10,
        currentBookings: 5,
        vendorId: "v1",
      },
      {
        id: "ts3",
        date: "2025-05-19",
        startTime: "09:00",
        endTime: "11:00",
        maxBookings: 10,
        currentBookings: 2,
        vendorId: "v1",
      },
    ],
    status: "Available today at 4 PM in Richmond Town",
    currentLocation: {
      latitude: 12.9746,
      longitude: 77.5993,
      lastUpdated: new Date().toISOString(),
    },
  },
  {
    id: "v2",
    name: "Organic Fruits",
    role: "vendor",
    email: "organicfruits@example.com",
    phone: "8765432109",
    location: {
      latitude: 12.9783,
      longitude: 77.6408,
      address: "Bangalore, Karnataka",
    },
    serviceArea: {
      pinCode: "560008",
      radius: 3,
    },
    categories: ["Fruits", "Organic"],
    description: "Premium organic fruits",
    availability: [
      {
        id: "ts4",
        date: "2025-05-18",
        startTime: "10:00",
        endTime: "12:00",
        maxBookings: 8,
        currentBookings: 6,
        vendorId: "v2",
      },
      {
        id: "ts5",
        date: "2025-05-19",
        startTime: "14:00",
        endTime: "16:00",
        maxBookings: 8,
        currentBookings: 1,
        vendorId: "v2",
      },
    ],
    status: "Will visit Indiranagar tomorrow at 2 PM",
    currentLocation: {
      latitude: 12.9780,
      longitude: 77.6400,
      lastUpdated: new Date().toISOString(),
    },
  },
];

// Mock customers
export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Rahul Kumar",
    role: "customer",
    email: "rahul@example.com",
    phone: "7654321098",
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "Richmond Town, Bangalore",
    },
    addresses: [
      {
        id: "a1",
        title: "Home",
        address: "123, Richmond Road, Richmond Town",
        pinCode: "560001",
        isDefault: true,
      },
      {
        id: "a2",
        title: "Office",
        address: "456, MG Road, Central Bangalore",
        pinCode: "560001",
        isDefault: false,
      },
    ],
  },
  {
    id: "c2",
    name: "Priya Singh",
    role: "customer",
    email: "priya@example.com",
    phone: "6543210987",
    location: {
      latitude: 12.9783,
      longitude: 77.6408,
      address: "Indiranagar, Bangalore",
    },
    addresses: [
      {
        id: "a3",
        title: "Home",
        address: "789, 12th Main, Indiranagar",
        pinCode: "560038",
        isDefault: true,
      },
    ],
  },
];

// Mock time slots
export const mockTimeSlots: TimeSlot[] = [
  {
    id: "ts1",
    date: "2025-05-18",
    startTime: "08:00",
    endTime: "10:00",
    maxBookings: 10,
    currentBookings: 3,
    vendorId: "v1",
  },
  {
    id: "ts2",
    date: "2025-05-18",
    startTime: "16:00",
    endTime: "18:00",
    maxBookings: 10,
    currentBookings: 5,
    vendorId: "v1",
  },
  {
    id: "ts3",
    date: "2025-05-19",
    startTime: "09:00",
    endTime: "11:00",
    maxBookings: 10,
    currentBookings: 2,
    vendorId: "v1",
  },
  {
    id: "ts4",
    date: "2025-05-18",
    startTime: "10:00",
    endTime: "12:00",
    maxBookings: 8,
    currentBookings: 6,
    vendorId: "v2",
  },
  {
    id: "ts5",
    date: "2025-05-19",
    startTime: "14:00",
    endTime: "16:00",
    maxBookings: 8,
    currentBookings: 1,
    vendorId: "v2",
  },
];

// Mock bookings
export const mockBookings: Booking[] = [
  {
    id: "b1",
    customerId: "c1",
    vendorId: "v1",
    timeSlotId: "ts2",
    status: "confirmed",
    createdAt: "2025-05-17T10:30:00Z",
  },
  {
    id: "b2",
    customerId: "c2",
    vendorId: "v2",
    timeSlotId: "ts4",
    status: "confirmed",
    createdAt: "2025-05-17T09:15:00Z",
  },
];
