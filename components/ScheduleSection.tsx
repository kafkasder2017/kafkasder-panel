import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Calendar, Clock, MapPin, Users, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  leader: string;
  attendees: number;
  type: 'service' | 'meeting' | 'study' | 'outreach';
  status: 'confirmed' | 'tentative' | 'cancelled';
}

export function ScheduleSection() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const scheduleEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Sunday Morning Service',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      leader: 'Pastor John Smith',
      attendees: 189,
      type: 'service',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Youth Bible Study',
      time: '7:00 PM',
      location: 'Youth Room',
      leader: 'Emily Wilson',
      attendees: 23,
      type: 'study',
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Elder Meeting',
      time: '6:30 PM',
      location: 'Conference Room',
      leader: 'Michael Davis',
      attendees: 8,
      type: 'meeting',
      status: 'tentative'
    },
    {
      id: '4',
      title: 'Community Outreach',
      time: '9:00 AM',
      location: 'Downtown Plaza',
      leader: 'Sarah Johnson',
      attendees: 15,
      type: 'outreach',
      status: 'confirmed'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-violet-100 text-violet-800';
      case 'study': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-emerald-100 text-emerald-800';
      case 'outreach': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'tentative': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDay.toDateString();
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl mb-2 text-gray-900" style={{ fontFamily: 'var(--font-editorial)' }}>
            Church Schedule
          </h1>
          <p className="text-lg text-gray-600">Manage and view church events, services, and activities</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('prev')}
                    className="border-violet-200 hover:bg-violet-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigateMonth('next')}
                    className="border-violet-200 hover:bg-violet-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {getDaysInMonth(currentDate).map((date, index) => (
                  <button
                    key={index}
                    onClick={() => date && setSelectedDay(date)}
                    className={`
                      h-12 rounded-lg text-sm font-medium transition-all duration-200
                      ${!date ? 'invisible' : ''}
                      ${isToday(date) ? 'bg-gradient-to-r from-violet-500 to-blue-500 text-white' : ''}
                      ${isSelected(date) && !isToday(date) ? 'bg-violet-100 text-violet-700' : ''}
                      ${!isToday(date) && !isSelected(date) ? 'hover:bg-gray-100 text-gray-700' : ''}
                    `}
                  >
                    {date?.getDate()}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Events */}
        <div>
          <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
                <Calendar className="h-5 w-5 text-violet-600" />
                Today's Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduleEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-4 rounded-xl bg-gray-50/70 hover:bg-violet-50/70 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{event.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                        {event.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Event List */}
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
            All Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduleEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-6 p-6 rounded-xl bg-gray-50/70 hover:bg-violet-50/70 transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-violet-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-violet-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <Badge className={`text-xs ${getTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(event.status)}`}>
                      {event.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span>{event.attendees} attending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarFallback className="text-xs">{event.leader.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span>{event.leader}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-violet-200 text-violet-700 hover:bg-violet-50">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}