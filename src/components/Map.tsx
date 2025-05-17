
import React, { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Vendor } from "@/types";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { toast } from "sonner";

interface MapProps {
  vendor?: Vendor;
  customerLocation?: { latitude: number; longitude: number };
  height?: string;
}

const Map: React.FC<MapProps> = ({ 
  vendor, 
  customerLocation, 
  height = "h-[300px]" 
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  
  useEffect(() => {
    // In a real implementation, we would initialize a map library like Leaflet here
    console.log("Map would be initialized with:", { vendor, customerLocation });

    // Get current user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error("Unable to access your location");
        }
      );
    }

    // This is just a placeholder. In a real app, you would integrate with a map library
    return () => {
      // Clean up map resources
    };
  }, [vendor, customerLocation]);

  // Function to open map directions in native apps
  const openDirections = () => {
    if (!vendor?.currentLocation) {
      toast.error("Vendor location not available");
      return;
    }

    // Open directions in Google Maps or Apple Maps
    const { latitude, longitude } = vendor.currentLocation;
    let url;
    
    // Check if it's an iOS device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    
    if (isIOS) {
      url = `maps://maps.apple.com/?daddr=${latitude},${longitude}`;
    } else {
      url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    }
    
    window.open(url, '_blank');
  };

  // Since we don't have an actual map implementation, we'll render a placeholder
  return (
    <div className={`relative w-full ${height} rounded-lg overflow-hidden bg-gray-100 mb-4`}>
      {/* Placeholder for map */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          {vendor?.currentLocation ? (
            <>
              <MapPin size={32} className="mx-auto mb-2 text-primary" />
              <p>
                Vendor is currently at<br />
                Latitude: {vendor.currentLocation.latitude.toFixed(4)}<br />
                Longitude: {vendor.currentLocation.longitude.toFixed(4)}
              </p>
              <p className="text-xs mt-2">
                Last updated: {new Date(vendor.currentLocation.lastUpdated).toLocaleTimeString()}
              </p>
            </>
          ) : (
            <p>Map would appear here with vendor location</p>
          )}
        </div>
      </div>
      
      {/* Directions button */}
      {vendor?.currentLocation && (
        <div className="absolute bottom-4 right-4">
          <Button 
            onClick={openDirections} 
            className="bg-primary hover:bg-primary-600 text-white"
          >
            <Navigation className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </div>
      )}
    </div>
  );
};

export default Map;
