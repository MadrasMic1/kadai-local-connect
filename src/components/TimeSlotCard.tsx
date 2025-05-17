
import React from "react";
import { TimeSlot, Vendor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { format, parseISO } from "date-fns";

interface TimeSlotCardProps {
  timeSlot: TimeSlot;
  vendor: Vendor;
  onBook?: () => void;
  isBooked?: boolean;
}

const TimeSlotCard: React.FC<TimeSlotCardProps> = ({
  timeSlot,
  vendor,
  onBook,
  isBooked = false,
}) => {
  // Format date and time for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "EEEE, MMMM d, yyyy");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return dateString;
    }
  };
  
  // Calculate available slots
  const availableSlots = 
    (timeSlot.maxBookings || 10) - timeSlot.currentBookings;

  return (
    <Card className={`overflow-hidden ${isBooked ? 'border-primary border-2' : ''}`}>
      <CardContent className="p-0">
        <div className="p-4 bg-white">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-medium text-gray-900">{vendor.name}</h3>
            {isBooked && (
              <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                Booked
              </span>
            )}
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{formatDate(timeSlot.date)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              <span>{timeSlot.startTime} - {timeSlot.endTime}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2" />
              <span>{timeSlot.currentBookings} booked • {availableSlots} slots available</span>
            </div>
          </div>
          
          {onBook && !isBooked && (
            <Button 
              onClick={onBook} 
              className="w-full bg-primary hover:bg-primary-600"
              disabled={availableSlots <= 0}
            >
              {availableSlots > 0 ? 'Book Slot' : 'Fully Booked'}
            </Button>
          )}
          
          {isBooked && (
            <div className="text-center py-2 text-green-600 font-medium text-sm">
              Your booking is confirmed
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSlotCard;
