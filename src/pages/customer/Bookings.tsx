
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockBookings, mockVendors, mockTimeSlots } from "@/data/mockData";
import { Booking, TimeSlot, Vendor } from "@/types";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Helper type for displaying bookings
interface EnhancedBooking extends Booking {
  vendor: Vendor;
  timeSlot: TimeSlot;
}

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<EnhancedBooking[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    if (user) {
      // Get user's bookings and enhance them with vendor and time slot data
      const userBookings = mockBookings
        .filter((booking) => booking.customerId === user.id)
        .map((booking) => {
          const vendor = mockVendors.find((v) => v.id === booking.vendorId);
          const timeSlot = mockTimeSlots.find((t) => t.id === booking.timeSlotId);

          if (vendor && timeSlot) {
            return {
              ...booking,
              vendor,
              timeSlot,
            };
          }
          return null;
        })
        .filter((booking): booking is EnhancedBooking => booking !== null);

      setBookings(userBookings);
    }
  }, [user]);

  // Cancel booking function
  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would be an API call
    setBookings(bookings.filter((b) => b.id !== bookingId));
    toast.success("Booking cancelled successfully");
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "EEEE, MMMM d, yyyy");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return dateString;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Bookings</h1>

        <div className="space-y-6">
          {/* Upcoming bookings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Upcoming</h2>
            {bookings.filter((b) => b.status === "confirmed").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings
                  .filter((b) => b.status === "confirmed")
                  .map((booking) => (
                    <Card key={booking.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.vendor.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(booking.timeSlot.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                          </span>
                        </div>
                        {booking.vendor.location && (
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.vendor.location.address}</span>
                          </div>
                        )}

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-500 hover:bg-red-50"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancel Booking
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-primary border-primary hover:bg-primary-50"
                          >
                            <Link to={`/customer/vendor/${booking.vendor.id}`}>
                              View Vendor
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">You have no upcoming bookings</p>
                  <Button asChild className="mt-4 bg-primary hover:bg-primary-600">
                    <Link to="/customer/dashboard">Find Vendors</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Past bookings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Past Bookings</h2>
            {bookings.filter((b) => b.status === "completed").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings
                  .filter((b) => b.status === "completed")
                  .map((booking) => (
                    <Card key={booking.id} className="bg-gray-50">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{booking.vendor.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{formatDate(booking.timeSlot.date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>
                            {booking.timeSlot.startTime} - {booking.timeSlot.endTime}
                          </span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="text-primary border-primary hover:bg-primary-50"
                          >
                            <Link to={`/customer/vendor/${booking.vendor.id}`}>
                              Book Again
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">You have no past bookings</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
