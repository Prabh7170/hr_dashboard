import React, { useState } from 'react';
import Layout from '@/components/Layout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { MoreVertical } from 'lucide-react';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      name: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present',
      profile: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Michael Johnson',
      position: 'Part Time',
      department: 'Developer',
      task: 'API Integration',
      status: 'Present',
      profile: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Emily Davis',
      position: 'Full Time',
      department: 'Marketing',
      task: 'Campaign Strategy',
      status: 'Absent',
      profile: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Robert Wilson',
      position: 'Full Time',
      department: 'HR',
      task: 'Employee Onboarding',
      status: 'Present',
      profile: '/placeholder.svg'
    },
    {
      id: 5,
      name: 'Amanda Lee',
      position: 'Part Time',
      department: 'Finance',
      task: 'Budget Analysis',
      status: 'Absent',
      profile: '/placeholder.svg'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Update attendance status
  const updateAttendanceStatus = (id, newStatus) => {
    const updatedRecords = attendanceRecords.map(record => 
      record.id === id ? { ...record, status: newStatus } : record
    );
    
    setAttendanceRecords(updatedRecords);
    
    const employee = updatedRecords.find(record => record.id === id);
    
    toast({
      title: 'Attendance Updated',
      description: `${employee?.name}'s attendance is marked as ${newStatus}.`
    });
  };

  // Filter attendance records
  const filteredAttendanceRecords = attendanceRecords.filter(record => {
    const statusMatch = statusFilter === 'all' || record.status === statusFilter;
    const searchMatch = !searchQuery || 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      record.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.task.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  return (
    <Layout title="Attendance">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="w-full sm:w-40">
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Present">Present</SelectItem>
              <SelectItem value="Absent">Absent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search"
            className="hr-input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-hr-purple text-white">
                <th className="text-left p-4">Profile</th>
                <th className="text-left p-4">Employee Name</th>
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Task</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendanceRecords.length > 0 ? (
                filteredAttendanceRecords.map((record, index) => (
                  <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {record.profile ? (
                          <img src={record.profile} alt={record.name} className="w-full h-full object-cover" />
                        ) : (
                          record.name.charAt(0)
                        )}
                      </div>
                    </td>
                    <td className="p-4">{record.name}</td>
                    <td className="p-4">{record.position}</td>
                    <td className="p-4">{record.department}</td>
                    <td className="p-4">{record.task}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className={`px-3 py-1 rounded border ${
                              record.status === 'Present' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300'
                            }`}
                          >
                            {record.status} <span className="ml-2">▼</span>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem 
                            className="cursor-pointer" 
                            onClick={() => updateAttendanceStatus(record.id, 'Present')}
                          >
                            Present
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer" 
                            onClick={() => updateAttendanceStatus(record.id, 'Absent')}
                          >
                            Absent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="p-4">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-4 text-center">
                    No attendance records found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Attendance;
