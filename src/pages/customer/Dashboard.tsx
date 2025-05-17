
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockVendors } from "@/data/mockData";
import { Vendor } from "@/types";
import VendorCard from "@/components/VendorCard";
import { toast } from "sonner";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
    address: string;
  } | null>(null);

  // Load vendors on mount
  useEffect(() => {
    // In a real app, this would fetch vendors from an API
    setVendors(mockVendors);
  }, []);

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: user?.location?.address || "Your current location",
          });
          toast.success("Location detected successfully");
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to access your location");
          
          // Fallback to mock location
          if (user?.location) {
            setUserLocation({
              ...user.location,
              address: user.location.address || "Default location",
            });
          }
        }
      );
    }
  }, [user]);

  // Filter vendors based on search query
  const filteredVendors = vendors.filter((vendor) => {
    const searchTerms = searchQuery.toLowerCase();
    return (
      vendor.name.toLowerCase().includes(searchTerms) ||
      (vendor.description?.toLowerCase().includes(searchTerms) || false) ||
      (vendor.categories?.some(cat => cat.toLowerCase().includes(searchTerms)) || false)
    );
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name?.split(" ")[0]}!</h1>
          <p className="text-gray-600">
            Find and book local vendors in your area.
          </p>
        </div>

        {/* Location and search bar */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <p className="text-sm text-gray-600">
                  {userLocation?.address || "Detecting your location..."}
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search for vendors, services, etc."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's vendors */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Available Today</h2>
            <Button variant="ghost" className="text-primary">
              <Calendar className="h-4 w-4 mr-2" />
              View Calendar
            </Button>
          </div>
          
          {filteredVendors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-gray-500">No vendors found. Try a different search.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent bookings */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Recent Bookings</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Visits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-center py-6">
                You don't have any upcoming bookings yet. Browse vendors to book your first slot!
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary-600">
                <a href="#vendors">Find Vendors</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
