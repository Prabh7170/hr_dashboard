import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AttendanceCalendar from '@/components/ui/calendar/attendance-calendar';
import { X, Download } from 'lucide-react';

const Leaves = () => {
  const [leaveApplications, setLeaveApplications] = useState([
    {
      id: 1,
      employeeId: 101,
      employeeName: 'Jane Cooper',
      position: 'Full Time',
      department: 'Designer',
      date: '10/09/24',
      reason: 'Visiting House',
      status: 'Approved',
      document: 'leave_document.pdf',
      profile: '/placeholder.svg'
    },
    {
      id: 2,
      employeeId: 102,
      employeeName: 'John Smith',
      position: 'Full Time',
      department: 'Developer',
      date: '15/09/24',
      reason: 'Medical Emergency',
      status: 'Pending',
      document: 'medical_certificate.pdf',
      profile: '/placeholder.svg'
    },
    {
      id: 3,
      employeeId: 103,
      employeeName: 'Sarah Johnson',
      position: 'Part Time',
      department: 'Marketing',
      date: '20/09/24',
      reason: 'Personal Leave',
      status: 'Rejected',
      document: null,
      profile: '/placeholder.svg'
    }
  ]);

  const [calendarLeaves, setCalendarLeaves] = useState([
    {
      date: '10/09/24',
      employee: 'Jane Cooper',
      position: 'Full Time Designer'
    }
  ]);

  const [date, setDate] = useState(new Date());
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [newLeave, setNewLeave] = useState({
    employeeName: '',
    designation: '',
    date: '',
    reason: '',
    document: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('September, 2024');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter leave applications
  const filteredLeaveApplications = leaveApplications.filter(leave => {
    const statusMatch = !statusFilter || leave.status === statusFilter;
    const searchMatch = !searchQuery || 
      leave.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      leave.reason.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  // Function to update leave status
  const updateLeaveStatus = (id, newStatus) => {
    const updatedLeaves = leaveApplications.map(leave => 
      leave.id === id ? { ...leave, status: newStatus } : leave
    );
    
    setLeaveApplications(updatedLeaves);
    
    const leave = updatedLeaves.find(l => l.id === id);
    
    // If approved, add to calendar
    if (newStatus === 'Approved' && leave) {
      // Check if already in calendar
      const existingCalendarLeave = calendarLeaves.find(cl => 
        cl.date === leave.date && cl.employee === leave.employeeName
      );
      
      if (!existingCalendarLeave) {
        setCalendarLeaves([
          ...calendarLeaves,
          {
            date: leave.date,
            employee: leave.employeeName,
            position: `${leave.position} ${leave.department}`
          }
        ]);
      }
    }
    
    // If rejected or pending, remove from calendar
    if (newStatus !== 'Approved') {
      setCalendarLeaves(calendarLeaves.filter(cl => 
        !(cl.date === leave.date && cl.employee === leave.employeeName)
      ));
    }
    
    toast({
      title: 'Leave Status Updated',
      description: `${leave?.employeeName}'s leave request is now ${newStatus}.`
    });
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = {};
    if (!newLeave.employeeName) errors.employeeName = 'Employee name is required';
    if (!newLeave.designation) errors.designation = 'Designation is required';
    if (!newLeave.date) errors.date = 'Leave date is required';
    if (!newLeave.reason) errors.reason = 'Reason is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Add new leave
    const newLeaveApplication = {
      id: leaveApplications.length > 0 ? Math.max(...leaveApplications.map(l => l.id)) + 1 : 1,
      employeeId: Math.floor(Math.random() * 1000),
      employeeName: newLeave.employeeName,
      position: newLeave.designation.split(' ')[0] || 'Full Time',
      department: newLeave.designation.split(' ')[1] || 'Staff',
      date: newLeave.date,
      reason: newLeave.reason,
      status: 'Pending',
      document: newLeave.document ? newLeave.document.name : null,
      profile: '/placeholder.svg'
    };
    
    setLeaveApplications([...leaveApplications, newLeaveApplication]);
    setIsAddLeaveModalOpen(false);
    
    toast({
      title: 'Leave Added',
      description: 'The leave application has been submitted successfully.'
    });
    
    // Reset form
    setNewLeave({
      employeeName: '',
      designation: '',
      date: '',
      reason: '',
      document: null
    });
    setFormErrors({});
  };

  const handleDocumentUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewLeave({
        ...newLeave,
        document: e.target.files[0]
      });
    }
  };

  const downloadDocument = (document) => {
    if (!document) {
      toast({
        title: 'No Document',
        description: 'No document attached to this leave application.',
        variant: 'destructive'
      });
      return;
    }
    
    toast({
      title: 'Document Downloaded',
      description: `${document} has been downloaded.`
    });
  };

  // Mock navigation between months
  const goToPreviousMonth = () => {
    setSelectedMonth('August, 2024');
  };
  
  const goToNextMonth = () => {
    setSelectedMonth('October, 2024');
  };

  return (
    <Layout title="Leaves">
      <div className="flex flex-col lg:flex-row gap-6">
       
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="w-full sm:w-40">
              <Select onValueChange={setStatusFilter} value={statusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
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
            
            <Button 
              className="bg-hr-purple hover:bg-hr-purple-light w-full sm:w-auto"
              onClick={() => setIsAddLeaveModalOpen(true)}
            >
              Add Leave
            </Button>
          </div>
          
          {filteredLeaveApplications.length > 0 ? (
            <div className="border rounded-lg overflow-hidden bg-white shadow">
              <div className="p-4 bg-hr-purple text-white">
                <h3 className="font-semibold">Applied Leaves</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-hr-purple text-white">
                      <th className="text-left p-4">Profile</th>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-left p-4">Reason</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Docs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeaveApplications.map((leave, index) => (
                      <tr key={leave.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {leave.profile ? (
                              <img src={leave.profile} alt={leave.employeeName} className="w-full h-full object-cover" />
                            ) : (
                              leave.employeeName.charAt(0)
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            {leave.employeeName}
                            <div className="text-xs text-gray-500">{leave.position} {leave.department}</div>
                          </div>
                        </td>
                        <td className="p-4">{leave.date}</td>
                        <td className="p-4">{leave.reason}</td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="outline" 
                                className={`${
                                  leave.status === 'Approved' 
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300' : 
                                  leave.status === 'Rejected'
                                    ? 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300'
                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300'
                                }`}
                              >
                                {leave.status} <span className="ml-2">▼</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem 
                                className="cursor-pointer" 
                                onClick={() => updateLeaveStatus(leave.id, 'Approved')}
                              >
                                Approved
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer" 
                                onClick={() => updateLeaveStatus(leave.id, 'Pending')}
                              >
                                Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="cursor-pointer" 
                                onClick={() => updateLeaveStatus(leave.id, 'Rejected')}
                              >
                                Rejected
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                        <td className="p-4">
                          {leave.document && (
                            <button 
                              className="text-hr-purple hover:text-hr-purple-dark"
                              onClick={() => downloadDocument(leave.document)}
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-500">No leave applications found.</p>
            </div>
          )}
        </div>
        
        <div className="lg:w-1/3">
          <AttendanceCalendar 
            date={date}
            setDate={setDate}
            calendarLeaves={calendarLeaves}
            selectedMonth={selectedMonth}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
          />
        </div>
      </div>

      <Dialog open={isAddLeaveModalOpen} onOpenChange={setIsAddLeaveModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-hr-purple text-white p-4 -m-6 mb-6 rounded-t-lg flex justify-between items-center">
              <span>Add Leave</span>
              <button onClick={() => setIsAddLeaveModalOpen(false)} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleAddLeave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name*
              </label>
              <input
                type="text"
                className={`hr-input ${formErrors.employeeName ? 'border-red-500' : ''}`}
                value={newLeave.employeeName}
                onChange={e => setNewLeave({ ...newLeave, employeeName: e.target.value })}
              />
              {formErrors.employeeName && <p className="text-red-500 text-xs mt-1">{formErrors.employeeName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation*
              </label>
              <input
                type="text"
                className={`hr-input ${formErrors.designation ? 'border-red-500' : ''}`}
                value={newLeave.designation}
                onChange={e => setNewLeave({ ...newLeave, designation: e.target.value })}
                placeholder="e.g. Full Time Designer"
              />
              {formErrors.designation && <p className="text-red-500 text-xs mt-1">{formErrors.designation}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date*
              </label>
              <input
                type="text"
                className={`hr-input ${formErrors.date ? 'border-red-500' : ''}`}
                value={newLeave.date}
                onChange={e => setNewLeave({ ...newLeave, date: e.target.value })}
                placeholder="DD/MM/YY"
              />
              {formErrors.date && <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason*
              </label>
              <textarea
                className={`hr-input min-h-[80px] ${formErrors.reason ? 'border-red-500' : ''}`}
                value={newLeave.reason}
                onChange={e => setNewLeave({ ...newLeave, reason: e.target.value })}
              />
              {formErrors.reason && <p className="text-red-500 text-xs mt-1">{formErrors.reason}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supporting Document (optional)
              </label>
              <input
                type="file"
                className="hr-input"
                onChange={handleDocumentUpload}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddLeaveModalOpen(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-hr-purple hover:bg-hr-purple-light"
              >
                Submit Leave
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Leaves;
