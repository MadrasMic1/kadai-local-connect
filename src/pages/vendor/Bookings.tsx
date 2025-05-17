
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { mockBookings, mockCustomers, mockTimeSlots } from "@/data/mockData";
import { Booking, Customer, TimeSlot } from "@/types";
import { format, parseISO, isToday, isTomorrow, isAfter, isBefore } from "date-fns";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Helper type for displaying bookings
interface EnhancedBooking extends Booking {
  customer: Customer;
  timeSlot: TimeSlot;
}

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<EnhancedBooking[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // In a real app, this would be an API call
    if (user) {
      // Get vendor's bookings and enhance them with customer and time slot data
      const vendorBookings = mockBookings
        .filter((booking) => booking.vendorId === user.id)
        .map((booking) => {
          const customer = mockCustomers.find((c) => c.id === booking.customerId);
          const timeSlot = mockTimeSlots.find((t) => t.id === booking.timeSlotId);

          if (customer && timeSlot) {
            return {
              ...booking,
              customer,
              timeSlot,
            };
          }
          return null;
        })
        .filter((booking): booking is EnhancedBooking => booking !== null);

      setBookings(vendorBookings);
    }
  }, [user]);

  // Filter bookings by search query
  const filteredBookings = bookings.filter((booking) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      booking.customer.name.toLowerCase().includes(searchLower) ||
      booking.customer.phone?.toLowerCase().includes(searchLower) ||
      (booking.customer.location?.address || "").toLowerCase().includes(searchLower)
    );
  });

  // Group bookings by date
  const todayBookings = filteredBookings.filter((booking) => 
    isToday(parseISO(booking.timeSlot.date))
  );
  
  const tomorrowBookings = filteredBookings.filter((booking) => 
    isTomorrow(parseISO(booking.timeSlot.date))
  );
  
  const futureBookings = filteredBookings.filter((booking) => 
    isAfter(parseISO(booking.timeSlot.date), new Date()) && 
    !isToday(parseISO(booking.timeSlot.date)) && 
    !isTomorrow(parseISO(booking.timeSlot.date))
  );
  
  const pastBookings = filteredBookings.filter((booking) => 
    isBefore(parseISO(booking.timeSlot.date), new Date()) && 
    !isToday(parseISO(booking.timeSlot.date))
  );

  // Helper function to render a booking
  const renderBooking = (booking: EnhancedBooking) => (
    <div 
      key={booking.id} 
      className="border p-4 rounded-lg"
    >
      <div className="flex justify-between">
        <h3 className="font-medium">{booking.customer.name}</h3>
        <Badge>{booking.status}</Badge>
      </div>
      <div className="mt-2 text-sm text-gray-600 space-y-1">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {format(parseISO(booking.timeSlot.date), 'MMMM d, yyyy')}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</span>
        </div>
        {booking.customer.phone && (
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            <span>{booking.customer.phone}</span>
          </div>
        )}
        {booking.customer.location?.address && (
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{booking.customer.location.address}</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderBookingSection = (title: string, bookingList: EnhancedBooking[]) => (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {bookingList.length > 0 ? (
          bookingList.map(renderBooking)
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              No bookings found
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Bookings</h1>
          <div className="w-64">
            <Input
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {renderBookingSection("Today", todayBookings)}
        {renderBookingSection("Tomorrow", tomorrowBookings)}
        {renderBookingSection("Upcoming", futureBookings)}
        {renderBookingSection("Past", pastBookings)}
      </div>
    </Layout>
  );
};

export default Bookings;
