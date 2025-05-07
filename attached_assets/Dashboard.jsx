
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Users, Calendar, FileText } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Candidates',
      value: '156',
      icon: <UserPlus className="h-8 w-8 text-blue-500" />,
      change: '+12%',
      trend: 'up',
    },
    {
      title: 'Active Employees',
      value: '284',
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: '+4%',
      trend: 'up',
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: <Calendar className="h-8 w-8 text-amber-500" />,
      change: '-2%',
      trend: 'down',
    },
    {
      title: 'Pending Leaves',
      value: '18',
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      change: '+7',
      trend: 'up',
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="border-b pb-3">
                    <div className="flex justify-between">
                      <div className="font-medium">Activity {item}</div>
                      <div className="text-sm text-gray-500">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-b pb-3 last:border-none">
                    <div className="font-medium">Event {item}</div>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(Date.now() + item * 86400000).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Brief description of upcoming event {item}.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
