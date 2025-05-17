
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockVendors, mockTimeSlots, mockBookings } from "@/data/mockData";
import { Vendor, TimeSlot, Booking } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Calendar, Clock, MapPin, Phone } from "lucide-react";
import Map from "@/components/Map";
import { useAuth } from "@/contexts/AuthContext";
import TimeSlotCard from "@/components/TimeSlotCard";
import { format, addDays } from "date-fns";

const VendorDetail = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    if (!vendorId) return;

    // In a real app, these would be API calls
    const foundVendor = mockVendors.find((v) => v.id === vendorId);
    if (!foundVendor) {
      toast.error("Vendor not found");
      navigate("/customer/dashboard");
      return;
    }

    setVendor(foundVendor);
    setTimeSlots(mockTimeSlots.filter((t) => t.vendorId === vendorId));

    if (user) {
      setUserBookings(
        mockBookings.filter((b) => b.customerId === user.id && b.vendorId === vendorId)
      );
    }
  }, [vendorId, navigate, user]);

  // This would be an API call in a real app
  const handleBookSlot = (timeSlotId: string) => {
    if (!user) {
      toast.error("You must be logged in to book a slot");
      return;
    }

    // Create a new booking
    const newBooking: Booking = {
      id: `b_${Date.now()}`,
      customerId: user.id,
      vendorId: vendor?.id || "",
      timeSlotId,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setUserBookings([...userBookings, newBooking]);
    toast.success("Slot booked successfully!");

    // Update time slot bookings count
    setTimeSlots(
      timeSlots.map((slot) =>
        slot.id === timeSlotId
          ? { ...slot, currentBookings: slot.currentBookings + 1 }
          : slot
      )
    );
  };

  // Get the dates for the next 3 days
  const dateOptions = [0, 1, 2].map((dayOffset) => {
    const date = addDays(new Date(), dayOffset);
    return {
      value: format(date, "yyyy-MM-dd"),
      label: dayOffset === 0 ? "Today" : format(date, "EEE, MMM d"),
    };
  });

  // Filter time slots for the selected date
  const filteredTimeSlots = timeSlots.filter(
    (slot) => slot.date === selectedDate
  );

  if (!vendor) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Vendor header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{vendor.name}</h1>
          <p className="text-gray-600">{vendor.description}</p>

          {vendor.categories && vendor.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {vendor.categories.map((category) => (
                <span
                  key={category}
                  className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Vendor status card */}
        {vendor.status && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <p className="text-gray-700 italic">"{vendor.status}"</p>
            </CardContent>
          </Card>
        )}

        {/* Vendor map and contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold mb-3">Vendor Location</h2>
            <Map vendor={vendor} height="h-[300px]" />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <p className="text-gray-600">{vendor.location?.address}</p>
                  </div>
                  {vendor.phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-3" />
                      <p className="text-gray-600">{vendor.phone}</p>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <div>
                      <p className="text-gray-600">Service area:</p>
                      <p className="text-sm">
                        {vendor.serviceArea.pinCode
                          ? `PIN code: ${vendor.serviceArea.pinCode}`
                          : ""}
                        {vendor.serviceArea.radius
                          ? `${
                              vendor.serviceArea.pinCode ? ", " : ""
                            }${vendor.serviceArea.radius} km radius`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Booking tabs */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Available Time Slots</h2>
          
          {/* Date selector */}
          <TabsList className="mb-6">
            {dateOptions.map((option) => (
              <TabsTrigger
                key={option.value}
                value={option.value}
                onClick={() => setSelectedDate(option.value)}
                className={selectedDate === option.value ? "bg-primary text-white" : ""}
              >
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Time slots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTimeSlots.length > 0 ? (
              filteredTimeSlots.map((slot) => {
                // Check if user already booked this slot
                const isBooked = userBookings.some(
                  (booking) => booking.timeSlotId === slot.id
                );
                return (
                  <TimeSlotCard
                    key={slot.id}
                    timeSlot={slot}
                    vendor={vendor}
                    isBooked={isBooked}
                    onBook={isBooked ? undefined : () => handleBookSlot(slot.id)}
                  />
                );
              })
            ) : (
              <div className="col-span-full">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">
                      No time slots available for this date. Please check another day.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorDetail;
