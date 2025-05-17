
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">How KADAI Works</h1>

        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg text-gray-700 mb-6">
              KADAI connects customers with local vendors for convenient delivery services or scheduled visits. Here's how the platform works for both customers and vendors.
            </p>
          </div>

          {/* For Customers */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">For Customers</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">1. Create an Account</h3>
                  <p className="text-gray-700">
                    Sign up as a customer and provide your location details to find vendors in your area.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">2. Find Vendors</h3>
                  <p className="text-gray-700">
                    Browse through available vendors in your neighborhood and view their service offerings and availability.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">3. Book a Time Slot</h3>
                  <p className="text-gray-700">
                    Select a convenient time slot when the vendor will be available in your area. You'll see how many other customers have booked the same time slot.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">4. Track Live Location</h3>
                  <p className="text-gray-700">
                    On the day of service, you can track the vendor's live location to know exactly when they'll arrive at your location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* For Vendors */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">For Vendors</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">1. Register as a Vendor</h3>
                  <p className="text-gray-700">
                    Sign up as a vendor, complete your profile with business details, and define your service area.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">2. Set Your Availability</h3>
                  <p className="text-gray-700">
                    Create time slots for when you'll be available to serve customers in specific areas. Define how many bookings you can accept per slot.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">3. Manage Bookings</h3>
                  <p className="text-gray-700">
                    View and manage all your customer bookings from a convenient dashboard. Get customer details and delivery locations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">4. Share Live Location</h3>
                  <p className="text-gray-700">
                    During service hours, share your live location so customers can track your arrival. Update your status message to keep customers informed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Benefits of Using KADAI</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Convenience</h3>
                  <p className="text-gray-700">
                    Book services without phone calls or text messages. Everything is managed through the platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Transparency</h3>
                  <p className="text-gray-700">
                    See exactly when vendors are available and track their location in real-time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Local Economy</h3>
                  <p className="text-gray-700">
                    Support local vendors and businesses in your community by connecting directly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Time-Saving</h3>
                  <p className="text-gray-700">
                    Plan your schedule efficiently knowing exactly when vendors will arrive.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 mb-6">
              Join KADAI today and experience the convenience of connecting with local vendors or reaching more customers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-primary hover:bg-primary-600">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
