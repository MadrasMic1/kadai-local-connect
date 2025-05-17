
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { mockVendors, mockBookings, mockTimeSlots, mockCustomers } from "@/data/mockData";
import { Vendor, Booking, TimeSlot, Customer } from "@/types";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import Map from "@/components/Map";
import { format, parseISO } from "date-fns";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [bookings, setBookings] = useState<Array<Booking & { customer: Customer; timeSlot: TimeSlot }>>([]);
  const [todaysSlots, setTodaysSlots] = useState<TimeSlot[]>([]);
  const [status, setStatus] = useState<string>("");
  const [liveLocationEnabled, setLiveLocationEnabled] = useState<boolean>(false);
  
  useEffect(() => {
    if (!user) return;

    // In a real app, these would be API calls
    const vendorData = mockVendors.find((v) => v.id === user.id);
    if (vendorData) {
      setVendor(vendorData);
      setStatus(vendorData.status || "");
      
      // Check if the vendor has current location data
      if (vendorData.currentLocation) {
        setLiveLocationEnabled(true);
      }
      
      // Get today's time slots
      const today = new Date().toISOString().split('T')[0];
      setTodaysSlots(mockTimeSlots.filter(slot => 
        slot.vendorId === user.id && 
        slot.date === today
      ));
      
      // Get today's bookings with customer info
      const vendorBookings = mockBookings
        .filter(booking => booking.vendorId === user.id)
        .map(booking => {
          const customer = mockCustomers.find(c => c.id === booking.customerId);
          const timeSlot = mockTimeSlots.find(t => t.id === booking.timeSlotId);
          
          if (customer && timeSlot) {
            return {
              ...booking,
              customer,
              timeSlot
            };
          }
          return null;
        })
        .filter((booking): booking is (Booking & { customer: Customer; timeSlot: TimeSlot }) => booking !== null);
      
      setBookings(vendorBookings);
    }
  }, [user]);

  const toggleLiveLocation = () => {
    if (!liveLocationEnabled) {
      // Request location permission
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, this would update the backend
            setLiveLocationEnabled(true);
            toast.success("Live location sharing enabled");
            
            // Create a watcher for continuous updates
            navigator.geolocation.watchPosition(
              (pos) => {
                console.log("Location updated:", pos.coords.latitude, pos.coords.longitude);
                // In a real app, this would update the backend
              },
              (error) => {
                console.error("Error tracking location:", error);
                toast.error("Failed to update location");
              },
              { enableHighAccuracy: true }
            );
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Please enable location services to share your location");
          }
        );
      } else {
        toast.error("Location services are not supported by your browser");
      }
    } else {
      // In a real app, this would stop the location watcher
      setLiveLocationEnabled(false);
      toast.info("Live location sharing disabled");
    }
  };

  const updateStatus = () => {
    // In a real app, this would update the backend
    toast.success("Status updated successfully");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600 mb-8">
          Manage your schedule, bookings, and availability
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Status and location */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Input
                    placeholder="Set your status message (e.g., 'Coming to Indiranagar at 4 PM')"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  />
                  
                  <Button 
                    onClick={updateStatus} 
                    className="w-full bg-primary hover:bg-primary-600"
                  >
                    Update Status
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Live Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Share your live location with customers so they can track your arrival.
                </p>
                <Button 
                  onClick={toggleLiveLocation} 
                  className={`w-full ${
                    liveLocationEnabled 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-primary hover:bg-primary-600'
                  }`}
                >
                  {liveLocationEnabled ? 'Stop Sharing Location' : 'Start Sharing Location'}
                </Button>
                
                {liveLocationEnabled && (
                  <p className="text-green-600 text-sm mt-2">
                    Customers can now see your location in real-time
                  </p>
                )}
              </CardContent>
            </Card>
            
            {vendor && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Current Location</CardTitle>
                </CardHeader>
                <CardContent className="pb-0">
                  <Map vendor={vendor} height="h-[200px]" />
                </CardContent>
                <CardFooter className="pt-4 pb-4">
                  <Link to="/vendor/profile" className="text-primary hover:underline text-sm w-full text-center">
                    Update service area settings
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
          
          {/* Right column - Today's schedule and bookings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's schedule */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Today's Schedule</CardTitle>
                <Link to="/vendor/slots">
                  <Button variant="outline" size="sm">Manage Slots</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {todaysSlots.length > 0 ? (
                  <div className="space-y-4">
                    {todaysSlots.map((slot) => (
                      <div 
                        key={slot.id} 
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                      >
                        <div>
                          <div className="flex items-center font-medium">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            {slot.startTime} - {slot.endTime}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            <User className="h-4 w-4 inline mr-1" />
                            {slot.currentBookings}/{slot.maxBookings || 'unlimited'} bookings
                          </div>
                        </div>
                        <Badge variant={slot.currentBookings > 0 ? "default" : "outline"}>
                          {slot.currentBookings > 0 ? `${slot.currentBookings} booked` : 'No bookings'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>You have no time slots scheduled for today</p>
                    <Link to="/vendor/slots">
                      <Button variant="link" className="text-primary mt-2">
                        Add time slots
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Today's bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <div 
                        key={booking.id} 
                        className="border p-4 rounded-lg"
                      >
                        <div className="flex justify-between">
                          <h3 className="font-medium">{booking.customer.name}</h3>
                          <Badge>{booking.status}</Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>
                              {format(parseISO(booking.timeSlot.date), 'MMMM d, yyyy')}
                            </span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>{booking.timeSlot.startTime} - {booking.timeSlot.endTime}</span>
                          </div>
                          {booking.customer.location && (
                            <div className="flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-2" />
                              <span>{booking.customer.location.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {bookings.length > 5 && (
                      <div className="text-center">
                        <Link to="/vendor/bookings">
                          <Button variant="link" className="text-primary">
                            View all {bookings.length} bookings
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>You have no bookings yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VendorDashboard;
