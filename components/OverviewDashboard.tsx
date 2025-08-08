import React from 'react';
import { ModernCard as Card, ModernCardContent as CardContent, ModernCardHeader as CardHeader } from "./ui/ModernCard";
import { Users, Calendar, DollarSign, Heart, TrendingUp, Clock } from "lucide-react";

// Simple CardTitle component
const CardTitle: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => (
  <h3 className={className} style={style}>{children}</h3>
);

export function OverviewDashboard() {
  const stats = [
    {
      title: "Total Members",
      value: "247",
      change: "+12 this month",
      icon: Users,
      gradient: "from-violet-500 to-violet-600",
      bgGradient: "from-violet-50 to-violet-100",
      color: "text-violet-600"
    },
    {
      title: "This Week's Attendance",
      value: "189",
      change: "76% attendance rate",
      icon: Calendar,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
      color: "text-blue-600"
    },
    {
      title: "Monthly Giving",
      value: "$12,847",
      change: "+8% from last month",
      icon: DollarSign,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
      color: "text-emerald-600"
    },
    {
      title: "Active Prayer Requests",
      value: "23",
      change: "5 answered this week",
      icon: Heart,
      gradient: "from-amber-500 to-yellow-500",
      bgGradient: "from-amber-50 to-yellow-100",
      color: "text-amber-600"
    }
  ];

  const recentActivities = [
    { type: "New Member", description: "Sarah Johnson joined the church", time: "2 hours ago", color: "bg-violet-100 text-violet-800" },
    { type: "Prayer Request", description: "Healing prayer for Mary Davis", time: "4 hours ago", color: "bg-blue-100 text-blue-800" },
    { type: "Event", description: "Youth Bible Study scheduled", time: "1 day ago", color: "bg-emerald-100 text-emerald-800" },
    { type: "Donation", description: "$500 donation received", time: "2 days ago", color: "bg-amber-100 text-amber-800" },
  ];

  const upcomingEvents = [
    { name: "Sunday Service", date: "Jan 28", time: "10:00 AM", color: "text-violet-600" },
    { name: "Bible Study", date: "Jan 30", time: "7:00 PM", color: "text-blue-600" },
    { name: "Youth Meeting", date: "Feb 1", time: "6:00 PM", color: "text-emerald-600" },
    { name: "Prayer Meeting", date: "Feb 3", time: "7:30 PM", color: "text-amber-600" },
  ];

  return (
    <div className="relative min-h-screen">
      {/* Tech Arc Background */}
      <div className="absolute inset-0 tech-arc">
        <div className="tech-arc-content">
          <div className="space-y-8 p-6 pt-16 bg-[rgba(255,255,255,0)]">
            {/* Hero Section with Arc */}
            <div className="relative text-center mb-12 pt-8">
              <div className="relative z-10">
                <h1 className="text-5xl mb-4 text-gray-900" style={{ fontFamily: 'var(--font-editorial)' }}>
                  Dashboard Overview
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Welcome back! Here's what's happening at Grace Community Church.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="card-hover-effect border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className={`w-full h-20 bg-gradient-to-br ${stat.bgGradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                        <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg relative z-10`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                        <p className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</p>
                        <p className={`text-xs font-medium ${stat.color}`}>{stat.change}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {/* Recent Activities */}
              <Card className="card-hover-effect border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 p-3 rounded-xl bg-gray-50/70 hover:bg-violet-50/70 transition-all duration-200">
                        <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-md font-medium ${activity.color}`}>
                              {activity.type}
                            </span>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="card-hover-effect border-0 shadow-sm bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/70 hover:bg-blue-50/70 transition-all duration-200">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{event.name}</p>
                          <p className={`text-sm font-medium ${event.color}`}>{event.time}</p>
                        </div>
                        <div className="text-right">
                          <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-sm border border-gray-200/50">
                            <div className="text-center">
                              <p className="text-xs text-gray-500 leading-none">{event.date.split(' ')[0]}</p>
                              <p className="text-sm font-semibold text-gray-900 leading-none">{event.date.split(' ')[1]}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Giving Progress */}
            <Card className="card-hover-effect border-0 shadow-sm bg-white/80 backdrop-blur-sm relative z-10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl" style={{ fontFamily: 'var(--font-editorial)' }}>
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  Monthly Giving Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-semibold text-gray-900">$12,847</p>
                      <p className="text-sm text-gray-500">raised of $15,000 goal</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-emerald-600">85.6%</p>
                      <p className="text-sm text-gray-500">completed</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm" 
                        style={{ width: '85.6%' }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Amazing progress! We're almost at our monthly goal. Thank you for your generous giving.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewDashboard;