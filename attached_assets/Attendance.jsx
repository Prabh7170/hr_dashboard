
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';
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
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      employeeId: 101,
      employeeName: 'Jane Copper',
      position: 'Full Time',
      department: 'Designer',
      task: 'Dashboard Home page Alignment',
      status: 'Present',
      profile: '/placeholder.svg'
    },
    {
      id: 2,
      employeeId: 102,
      employeeName: 'Michael Johnson',
      position: 'Part Time',
      department: 'Developer',
      task: 'API Integration',
      status: 'Present',
      profile: '/placeholder.svg'
    },
    {
      id: 3,
      employeeId: 103,
      employeeName: 'Emily Davis',
      position: 'Full Time',
      department: 'Marketing',
      task: 'Campaign Strategy',
      status: 'Absent',
      profile: '/placeholder.svg'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState();

  const updateAttendanceStatus = (id, newStatus) => {
    const updatedRecords = attendanceRecords.map(record =>
      record.id === id ? { ...record, status: newStatus } : record
    );

    setAttendanceRecords(updatedRecords);

    const record = updatedRecords.find(r => r.id === id);

    toast({
      title: 'Attendance Updated',
      description: `${record?.employeeName} marked as ${newStatus}.`
    });
  };

  const filteredRecords = attendanceRecords.filter(record => {
    if (!statusFilter || statusFilter === 'All') return true;
    return record.status === statusFilter;
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
              <SelectItem value="All">All Status</SelectItem>
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

      <div className="border rounded-lg overflow-hidden">
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
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {record.profile ? (
                          <img src={record.profile} alt={record.employeeName} className="w-full h-full object-cover" />
                        ) : (
                          record.employeeName.charAt(0)
                        )}
                      </div>
                    </td>
                    <td className="p-4">{record.employeeName}</td>
                    <td className="p-4">{record.position}</td>
                    <td className="p-4">{record.department}</td>
                    <td className="p-4">{record.task}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className={`${
                              record.status === 'Present'
                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300'
                                : 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300'
                            }`}
                          >
                            {record.status} <span className="ml-2">▼</span>
                          </Button>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">Edit Task</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
