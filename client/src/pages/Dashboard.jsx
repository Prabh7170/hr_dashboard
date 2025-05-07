import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { UserPlus, Users, Calendar, FileText, TrendingUp, TrendingDown, ChevronRight, Clock } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Candidates',
      value: '156',
      icon: <UserPlus className="h-8 w-8 text-blue-500" />,
      change: '+12%',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Active Employees',
      value: '284',
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: '+4%',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      change: '-2%',
      trend: 'down',
      color: 'yellow'
    },
    {
      title: 'Pending Leaves',
      value: '18',
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      change: '+7',
      trend: 'up',
      color: 'purple'
    },
  ];

  const activities = [
    {
      title: 'New employee onboarded',
      time: 'Today, 9:41 AM',
      description: 'Sarah Johnson has been successfully onboarded as Marketing Specialist.'
    },
    {
      title: 'Leave request approved',
      time: 'Today, 8:30 AM',
      description: 'Michael Brown\'s leave request for Sept 15-16 has been approved.'
    },
    {
      title: 'Candidate interview scheduled',
      time: 'Yesterday',
      description: 'Interview scheduled with John Smith for Senior Developer position.'
    },
    {
      title: 'Performance review completed',
      time: 'Yesterday',
      description: 'Quarterly performance review completed for Design team.'
    },
    {
      title: 'New job posting published',
      time: 'Sep 12, 2023',
      description: 'Job listing for UX/UI Designer position has been published.'
    }
  ];

  const events = [
    {
      title: 'Team Meeting',
      date: 'Sep 15, 2023',
      description: 'Weekly team meeting to discuss project progress.'
    },
    {
      title: 'Training Workshop',
      date: 'Sep 18, 2023',
      description: 'Leadership skills development for managers.'
    },
    {
      title: 'Company Anniversary',
      date: 'Sep 22, 2023',
      description: 'Celebration of company\'s 5th anniversary.'
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
            <p className="text-gray-500 mt-1">Here's what's happening with your HR dashboard today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="hr-btn hr-btn-primary">
              <span>View Reports</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="hr-stat-card">
              <div className="flex justify-between">
                <div>
                  <div className="hr-stat-title">{stat.title}</div>
                  <div className="hr-stat-value">{stat.value}</div>
                  <div className={`hr-stat-trend ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-amber-100' :
                  'bg-purple-100'
                }`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="hr-card col-span-2">
            <div className="hr-card-header">
              <div className="hr-card-title">Recent Activities</div>
              <button className="text-hr-purple text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="hr-card-content">
              <div className="space-y-5">
                {activities.map((activity, index) => (
                  <div key={index} className={`${index < activities.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                    <div className="flex justify-between">
                      <div className="font-medium text-gray-800">{activity.title}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" /> {activity.time}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hr-card">
            <div className="hr-card-header">
              <div className="hr-card-title">Upcoming Events</div>
              <button className="text-hr-purple text-sm font-medium hover:underline flex items-center">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </div>
            <div className="hr-card-content">
              <div className="space-y-5">
                {events.map((event, index) => (
                  <div key={index} className={`${index < events.length - 1 ? 'border-b border-gray-100 pb-4' : ''}`}>
                    <div className="font-medium text-gray-800">{event.title}</div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="h-3.5 w-3.5 mr-1.5" /> {event.date}
                    </div>
                    <p className="text-sm text-gray-600 mt-1.5">
                      {event.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
