import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
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
      <div className="container mx-auto">
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
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div className="font-medium">New employee onboarded</div>
                    <div className="text-sm text-gray-500">Today, 9:41 AM</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Sarah Johnson has been successfully onboarded as Marketing Specialist.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Leave request approved</div>
                    <div className="text-sm text-gray-500">Today, 8:30 AM</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Michael Brown's leave request for Sept 15-16 has been approved.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Candidate interview scheduled</div>
                    <div className="text-sm text-gray-500">Yesterday</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Interview scheduled with John Smith for Senior Developer position.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <div className="flex justify-between">
                    <div className="font-medium">Performance review completed</div>
                    <div className="text-sm text-gray-500">Yesterday</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Quarterly performance review completed for Design team.
                  </p>
                </div>
                
                <div className="pb-3">
                  <div className="flex justify-between">
                    <div className="font-medium">New job posting published</div>
                    <div className="text-sm text-gray-500">Sep 12, 2023</div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Job listing for UX/UI Designer position has been published.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <div className="font-medium">Team Meeting</div>
                  <p className="text-sm text-gray-500 mt-1">Sep 15, 2023</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Weekly team meeting to discuss project progress.
                  </p>
                </div>
                
                <div className="border-b pb-3">
                  <div className="font-medium">Training Workshop</div>
                  <p className="text-sm text-gray-500 mt-1">Sep 18, 2023</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Leadership skills development for managers.
                  </p>
                </div>
                
                <div className="pb-3">
                  <div className="font-medium">Company Anniversary</div>
                  <p className="text-sm text-gray-500 mt-1">Sep 22, 2023</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Celebration of company's 5th anniversary.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
