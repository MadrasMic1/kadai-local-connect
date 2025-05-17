
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Vendor } from "@/types";
import { mockVendors } from "@/data/mockData";
import Map from "@/components/Map";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const VendorProfile = () => {
  const { user } = useAuth();
  const vendorData = React.useMemo(() => {
    return mockVendors.find((v) => v.id === user?.id) || null;
  }, [user]);

  const [name, setName] = useState<string>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [description, setDescription] = useState<string>(vendorData?.description || "");
  const [address, setAddress] = useState<string>(vendorData?.location?.address || "");
  const [radius, setRadius] = useState<number>(vendorData?.serviceArea.radius || 5);
  const [pinCode, setPinCode] = useState<string>(vendorData?.serviceArea.pinCode || "");
  const [categories, setCategories] = useState<string>(
    vendorData?.categories?.join(", ") || ""
  );

  const handleSaveProfile = () => {
    // In a real app, this would be an API call
    toast.success("Profile updated successfully");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Vendor Profile</h1>

        <Tabs defaultValue="basic">
          <TabsList className="mb-8">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="service">Service Area</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal information */}
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your business name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Business Description</Label>
                    <Input
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief description of your services"
                    />
                  </div>

                  <div>
                    <Label htmlFor="categories">Categories</Label>
                    <Input
                      id="categories"
                      value={categories}
                      onChange={(e) => setCategories(e.target.value)}
                      placeholder="Vegetables, Fruits, Organic, etc. (comma-separated)"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate categories with commas
                    </p>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-primary hover:bg-primary-600"
                  >
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              {/* Current location */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your address"
                    />
                  </div>

                  {vendorData && (
                    <div>
                      <p className="mb-2 text-sm text-gray-600">Current Location on Map</p>
                      <Map vendor={vendorData} height="h-[300px]" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="service">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Service Area</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="Service area PIN code"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      The primary PIN code you serve
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="radius">Service Radius (km)</Label>
                    <Input
                      id="radius"
                      type="number"
                      min="1"
                      max="50"
                      value={radius}
                      onChange={(e) => setRadius(parseInt(e.target.value))}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      How far you're willing to travel from your location
                    </p>
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-primary hover:bg-primary-600"
                  >
                    Save Service Area
                  </Button>
                </CardContent>
              </Card>

              {vendorData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Service Area Visualization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      In a real app, this would show a map with your service area
                      highlighted
                    </p>
                    <div className="bg-gray-100 rounded-lg p-6 h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-gray-500 mb-2">Service Area</p>
                        <p className="font-medium">PIN: {pinCode || "Not set"}</p>
                        <p className="font-medium">Radius: {radius} km</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorProfile;
