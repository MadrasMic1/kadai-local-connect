
import React from "react";
import { Link } from "react-router-dom";
import { Vendor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

interface VendorCardProps {
  vendor: Vendor;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor }) => {
  // Calculate if vendor has availability today
  const today = new Date().toISOString().split('T')[0];
  const hasAvailabilityToday = vendor.availability.some(slot => slot.date === today);
  
  // Get next availability
  const nextAvailability = vendor.availability
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-gray-900">{vendor.name}</h3>
            {hasAvailabilityToday && (
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                Available Today
              </span>
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{vendor.location?.address || "Location not specified"}</span>
            </div>
            
            {nextAvailability && (
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <span>Next available: {nextAvailability.date} at {nextAvailability.startTime}</span>
              </div>
            )}
            
            {vendor.status && (
              <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 italic">
                "{vendor.status}"
              </div>
            )}
          </div>
          
          <Button 
            asChild
            className="w-full bg-primary hover:bg-primary-600"
          >
            <Link to={`/customer/vendor/${vendor.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorCard;
