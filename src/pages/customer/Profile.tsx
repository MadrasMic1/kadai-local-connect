
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { Customer } from "@/types";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [name, setName] = useState<string>(user?.name || "");
  const [phone, setPhone] = useState<string>(user?.phone || "");
  const [addresses, setAddresses] = useState<
    Array<{
      id: string;
      title: string;
      address: string;
      pinCode: string;
      isDefault?: boolean;
    }>
  >((user as Customer)?.addresses || []);
  const [newAddress, setNewAddress] = useState({
    title: "",
    address: "",
    pinCode: "",
    isDefault: false,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleSaveProfile = () => {
    // In a real app, this would be an API call
    toast.success("Profile updated successfully");
  };

  const handleAddAddress = () => {
    // Validate
    if (!newAddress.title || !newAddress.address || !newAddress.pinCode) {
      toast.error("Please fill in all address fields");
      return;
    }

    const newAddressWithId = {
      ...newAddress,
      id: `address_${Date.now()}`,
    };

    // If this is the first address or marked as default, make it default
    if (addresses.length === 0 || newAddress.isDefault) {
      setAddresses([
        newAddressWithId,
        ...addresses.map((a) => ({ ...a, isDefault: false })),
      ]);
    } else {
      setAddresses([...addresses, newAddressWithId]);
    }

    // Reset the form
    setNewAddress({
      title: "",
      address: "",
      pinCode: "",
      isDefault: false,
    });
    setShowAddForm(false);
    toast.success("Address added successfully");
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
    toast.success("Address removed");
  };

  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    toast.success("Default address updated");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                />
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full bg-primary hover:bg-primary-600"
              >
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Addresses</CardTitle>
              {!showAddForm && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Address
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {showAddForm && (
                <div className="p-4 bg-gray-50 rounded-lg mb-6 space-y-4">
                  <h3 className="font-medium">Add New Address</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        Title
                      </label>
                      <Input
                        value={newAddress.title}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            title: e.target.value,
                          })
                        }
                        placeholder="Home, Work, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <Input
                        value={newAddress.pinCode}
                        onChange={(e) =>
                          setNewAddress({
                            ...newAddress,
                            pinCode: e.target.value,
                          })
                        }
                        placeholder="560001"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Full Address
                    </label>
                    <Input
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, address: e.target.value })
                      }
                      placeholder="Street, Area, City, State"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="defaultAddress"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label
                      htmlFor="defaultAddress"
                      className="text-sm text-gray-700"
                    >
                      Set as default address
                    </label>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleAddAddress}
                      className="bg-primary hover:bg-primary-600"
                    >
                      Save Address
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {addresses.length > 0 ? (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 relative ${
                        address.isDefault ? "border-primary bg-primary-50" : ""
                      }`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium">{address.title}</h3>
                          <p className="text-gray-700 text-sm mt-1">
                            {address.address}
                          </p>
                          <p className="text-gray-600 text-sm mt-1">
                            PIN: {address.pinCode}
                          </p>
                        </div>
                        <div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveAddress(address.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {address.isDefault && (
                        <span className="absolute top-2 right-2 bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                      {!address.isDefault && (
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-primary hover:text-primary-700 mt-2 px-0"
                        >
                          Set as default
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>You haven't added any addresses yet.</p>
                  {!showAddForm && (
                    <Button
                      variant="link"
                      onClick={() => setShowAddForm(true)}
                      className="text-primary mt-2"
                    >
                      Add your first address
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerProfile;
