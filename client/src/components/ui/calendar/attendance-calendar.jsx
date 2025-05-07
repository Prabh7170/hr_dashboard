import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AttendanceCalendar = ({ 
  date, 
  setDate, 
  calendarLeaves = [], 
  selectedMonth, 
  goToPreviousMonth, 
  goToNextMonth 
}) => {
  
  // Get the highlighted dates (dates with approved leaves)
  const highlightedDates = calendarLeaves.map(leave => {
    if (typeof leave.date === 'string') {
      const [day, month, year] = leave.date.split('/');
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return leave.date;
  });

  // Function to check if a date is highlighted
  const isHighlighted = (date) => {
    return highlightedDates.some(d => 
      d.getDate() === date.getDate() && 
      d.getMonth() === date.getMonth() && 
      d.getFullYear() === date.getFullYear()
    );
  };

  // Function to get leave info for a date
  const getLeaveInfo = (date) => {
    if (!date) return null;
    
    return calendarLeaves.find(leave => {
      if (typeof leave.date === 'string') {
        const [day, month, year] = leave.date.split('/');
        const leaveDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
        return (
          leaveDate.getDate() === date.getDate() && 
          leaveDate.getMonth() === date.getMonth() && 
          leaveDate.getFullYear() === date.getFullYear()
        );
      }
      return (
        leave.date.getDate() === date.getDate() && 
        leave.date.getMonth() === date.getMonth() && 
        leave.date.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-medium">Leave Calendar</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToPreviousMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">{selectedMonth}</span>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border-none"
          modifiers={{
            highlighted: highlightedDates,
          }}
          modifiersStyles={{
            highlighted: {
              backgroundColor: 'rgba(108, 79, 255, 0.1)',
              color: '#6C4FFF',
              fontWeight: 'bold',
            }
          }}
          components={{
            DayContent: ({ day }) => {
              // Add null check to prevent "Cannot read properties of undefined" error
              if (!day) return null;
              
              const leaveInfo = getLeaveInfo(day);
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  {day.getDate()}
                  {leaveInfo && (
                    <div className="absolute -bottom-6 left-0 right-0 text-[9px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap px-1">
                      {leaveInfo.employee}
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
      
      {calendarLeaves.length > 0 && (
        <div className="px-4 pb-4">
          <h4 className="text-sm font-medium mb-2">Leaves Today</h4>
          <div className="space-y-2">
            {calendarLeaves.map((leave, index) => (
              <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                <div className="font-medium">{leave.employee}</div>
                <div className="text-gray-500">{leave.position}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceCalendar;
