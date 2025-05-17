import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { mockTimeSlots } from "@/data/mockData";
import { TimeSlot } from "@/types";
import { Calendar, Clock, Plus, Trash2, Users } from "lucide-react";
import { format, addDays } from "date-fns";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TimeSlots = () => {
  const { user } = useAuth();
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [date, setDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endTime, setEndTime] = useState<string>("11:00");
  const [maxBookings, setMaxBookings] = useState<number>(10);
  
  // Get next 7 days for tab selection
  const dateOptions = Array.from({ length: 7 }).map((_, i) => {
    const day = addDays(new Date(), i);
    return {
      value: format(day, "yyyy-MM-dd"),
      label: i === 0 ? "Today" : format(day, "EEE, MMM d"),
    };
  });

  useEffect(() => {
    if (!user) return;

    // In a real app, this would be an API call
    const vendorSlots = mockTimeSlots.filter((slot) => slot.vendorId === user.id);
    setSlots(vendorSlots);
  }, [user]);

  const addTimeSlot = () => {
    // Validate inputs
    if (!date || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (startTime >= endTime) {
      toast.error("End time must be after start time");
      return;
    }
    
    // Create new time slot
    const newSlot: TimeSlot = {
      id: `ts_${Date.now()}`,
      date,
      startTime,
      endTime,
      maxBookings,
      currentBookings: 0,
      vendorId: user?.id || "",
    };
    
    // Update state (in a real app, this would be an API call)
    setSlots([...slots, newSlot]);
    toast.success("Time slot added successfully");
    
    // Reset form
    setStartTime("09:00");
    setEndTime("11:00");
  };
  
  const deleteTimeSlot = (slotId: string) => {
    // In a real app, this would be an API call
    setSlots(slots.filter((slot) => slot.id !== slotId));
    toast.success("Time slot removed");
  };
  
  // Filter slots for the selected date
  const filteredSlots = slots.filter((slot) => slot.date === date);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Manage Time Slots</h1>
        
        <Tabs defaultValue={dateOptions[0].value} onValueChange={setDate}>
          <TabsList className="mb-6">
            {dateOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add new slot form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Slot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <p className="text-sm font-medium mt-1">{format(new Date(date), "EEEE, MMMM d, yyyy")}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="maxBookings">Maximum Bookings</Label>
                  <Input
                    id="maxBookings"
                    type="number"
                    min="1"
                    value={maxBookings}
                    onChange={(e) => setMaxBookings(parseInt(e.target.value))}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum number of customers that can book this slot
                  </p>
                </div>
                
                <Button 
                  onClick={addTimeSlot} 
                  className="w-full bg-primary hover:bg-primary-600"
                >
                  Add Time Slot
                </Button>
              </CardContent>
            </Card>
            
            {/* Existing slots */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Time Slots for {format(new Date(date), "MMMM d, yyyy")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredSlots.length > 0 ? (
                    <div className="space-y-4">
                      {filteredSlots.map((slot) => (
                        <div 
                          key={slot.id} 
                          className="flex justify-between items-center border p-4 rounded-lg"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-primary" />
                              <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Users className="h-4 w-4 mr-2" />
                              <span>{slot.currentBookings}/{slot.maxBookings} bookings</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => deleteTimeSlot(slot.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              disabled={slot.currentBookings > 0}
                              title={slot.currentBookings > 0 ? "Cannot delete slot with bookings" : "Delete slot"}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                      <p>No time slots defined for this date</p>
                      <p className="text-sm mt-2">Add your first time slot using the form</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default TimeSlots;
