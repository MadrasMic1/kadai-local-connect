
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin, User } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 md:py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Connect with Local Vendors in Your Area
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                KADAI helps you book delivery or visit time slots with local vendors based on their availability in your neighborhood.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  className="bg-primary hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-lg"
                >
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/how-it-works">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1572051538064-5ada2c513b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900" 
                  alt="Local vendor with vegetables" 
                  className="w-full rounded-lg object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How KADAI Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Time Slot</h3>
              <p className="text-gray-600">
                Browse available vendors in your area and select a convenient time for delivery or visit.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Book Your Slot</h3>
              <p className="text-gray-600">
                Reserve your spot with just a few clicks and get a confirmation instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Track Live Location</h3>
              <p className="text-gray-600">
                Know exactly when your vendor will arrive with real-time location tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For customers and vendors */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">For Customers</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Find local vendors available in your neighborhood</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Book time slots that fit your schedule</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Track vendor's live location for accurate ETAs</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Save favorite vendors for quick future bookings</span>
                </li>
              </ul>
              <Button asChild className="bg-primary hover:bg-primary-600 w-full">
                <Link to="/register">Register as Customer</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold mb-4">For Vendors</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Set your available time slots and service areas</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Manage your bookings in one convenient dashboard</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Share your live location with customers while on route</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                  <span>Build a loyal customer base in your service area</span>
                </li>
              </ul>
              <Button asChild className="bg-primary hover:bg-primary-600 w-full">
                <Link to="/register">Register as Vendor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join KADAI today and connect with local vendors or reach more customers in your area. It's free to sign up!
          </p>
          <Button asChild variant="secondary" size="lg">
            <Link to="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
