{/* 
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from '@/components/ui/use-toast';
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
import { Calendar } from '@/components/ui/calendar';
import { X, MoreVertical, Download } from 'lucide-react';

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
  const [statusFilter, setStatusFilter] = useState();
  const [newLeave, setNewLeave] = useState({
    employeeName: '',
    designation: '',
    date: '',
    reason: '',
    document: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedMonth, setSelectedMonth] = useState('September, 2024');

  // Filter leave applications based on status
  const filteredLeaveApplications = leaveApplications.filter(leave => {
    if (!statusFilter) return true;
    return leave.status === statusFilter;
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
    
    // Check if employee exists and is present
    // In a real app, this would be a database query
    const isPresent = true; // Mock check
    
    if (!isPresent) {
      toast({
        title: 'Cannot Add Leave',
        description: 'Only present employees can take leaves.',
        variant: 'destructive'
      });
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
    
    // In a real app, this would download the actual file from your server
    toast({
      title: 'Document Downloaded',
      description: `${document} has been downloaded.`
    });
  };

  // Get the highlighted dates for calendar (dates with approved leaves)
  const highlightedDates = calendarLeaves.map(leave => {
    const [day, month, year] = leave.date.split('/');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  });
  
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
                  <SelectItem value="">All Status</SelectItem>
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
            <div className="border rounded-lg overflow-hidden">
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
                              <Download size={20} />
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
            <div className="border rounded-lg p-8 text-center">
              <div className="p-4 mb-4">
                <p className="text-xl text-purple-800 font-semibold">
                  ONLY PRESENT EMPLOYEES CAN TAKE LEAVE
                </p>
              </div>
              <p className="text-gray-500">
                No leave applications found. Try adjusting your filters or add a new leave application.
              </p>
            </div>
          )}
        </div>
        
        
        <div className="w-full lg:w-80 xl:w-96">
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 bg-hr-purple text-white">
              <h3 className="font-semibold">Leave Calendar</h3>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={goToPreviousMonth} className="text-gray-500">
                  &lt;
                </button>
                <h4 className="font-medium">{selectedMonth}</h4>
                <button onClick={goToNextMonth} className="text-gray-500">
                  &gt;
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                <div className="text-center font-medium">S</div>
                <div className="text-center font-medium">M</div>
                <div className="text-center font-medium">T</div>
                <div className="text-center font-medium">W</div>
                <div className="text-center font-medium">T</div>
                <div className="text-center font-medium">F</div>
                <div className="text-center font-medium">S</div>
                
                
                <div className="h-8 border rounded"></div>
                <div className="h-8 border rounded"></div>
                <div className="h-8 border rounded"></div>
                <div className="h-8 border rounded"></div>
                <div className="h-8 border rounded">1</div>
                <div className="h-8 border rounded">2</div>
                <div className="h-8 border rounded">3</div>
                
                
                <div className="h-8 border rounded">4</div>
                <div className="h-8 border rounded">5</div>
                <div className="h-8 border rounded">6</div>
                <div className="h-8 border rounded">7</div>
                <div className="h-8 border rounded bg-purple-200">8</div>
                <div className="h-8 border rounded">9</div>
                <div className="h-8 border rounded">10</div>
                
              
                <div className="h-8 border rounded">11</div>
                <div className="h-8 border rounded">12</div>
                <div className="h-8 border rounded">13</div>
                <div className="h-8 border rounded">14</div>
                <div className="h-8 border rounded">15</div>
                <div className="h-8 border rounded">16</div>
                <div className="h-8 border rounded">17</div>
                
                <div className="h-8 border rounded">18</div>
                <div className="h-8 border rounded">19</div>
                <div className="h-8 border rounded">20</div>
                <div className="h-8 border rounded">21</div>
                <div className="h-8 border rounded">22</div>
                <div className="h-8 border rounded">23</div>
                <div className="h-8 border rounded">24</div>
                
                <div className="h-8 border rounded">25</div>
                <div className="h-8 border rounded">26</div>
                <div className="h-8 border rounded">27</div>
                <div className="h-8 border rounded">28</div>
                <div className="h-8 border rounded">29</div>
                <div className="h-8 border rounded">30</div>
                <div className="h-8 border rounded"></div>
              </div>
            </div>
            
          
            <div className="p-4 border-t">
              <h4 className="font-medium mb-2">Approved Leaves</h4>
              
              {calendarLeaves.map((leave, index) => (
                <div key={index} className="mb-2 text-sm">
                  <div className="font-medium">{leave.employee}</div>
                  <div className="text-gray-500 text-xs">{leave.position}</div>
                  <div className="text-gray-500 text-xs">{leave.date}</div>
                </div>
              ))}
              
              {calendarLeaves.length === 0 && (
                <p className="text-gray-500 text-sm">No approved leaves for this month.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
     
      <Dialog open={isAddLeaveModalOpen} onOpenChange={setIsAddLeaveModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-hr-purple text-white p-4 -m-6 mb-6 rounded-t-lg flex justify-between items-center">
              <span>Add New Leave</span>
              <button onClick={() => setIsAddLeaveModalOpen(false)} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleAddLeave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name*
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`hr-input pl-10 ${formErrors.employeeName ? 'border-red-500' : ''}`}
                  placeholder="Search Employee Name"
                  value={newLeave.employeeName}
                  onChange={e => setNewLeave({...newLeave, employeeName: e.target.value})}
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
              {formErrors.employeeName && <p className="text-red-500 text-xs mt-1">{formErrors.employeeName}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Designation*
              </label>
              <input
                type="text"
                className={`hr-input ${formErrors.designation ? 'border-red-500' : ''}`}
                placeholder="Designation"
                value={newLeave.designation}
                onChange={e => setNewLeave({...newLeave, designation: e.target.value})}
              />
              {formErrors.designation && <p className="text-red-500 text-xs mt-1">{formErrors.designation}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Leave Date*
              </label>
              <div className="relative">
                <input
                  type="text"
                  className={`hr-input ${formErrors.date ? 'border-red-500' : ''}`}
                  placeholder="DD/MM/YY"
                  value={newLeave.date}
                  onChange={e => setNewLeave({...newLeave, date: e.target.value})}
                />
                <button 
                  type="button"
                  className="absolute right-2 top-2 text-gray-500"
                  onClick={() => {}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              {formErrors.date && <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="hr-input rounded-r-none"
                  placeholder="Upload Documents"
                  value={newLeave.document ? newLeave.document.name : ''}
                  readOnly
                />
                <label className="inline-flex items-center justify-center px-4 py-2 border border-l-0 border-gray-300 bg-hr-purple text-white rounded-r-md cursor-pointer">
                  <Download className="h-5 w-5" />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleDocumentUpload}
                  />
                </label>
              </div>
            </div>
            
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason*
              </label>
              <input
                type="text"
                className={`hr-input ${formErrors.reason ? 'border-red-500' : ''}`}
                placeholder="Enter reason for leave"
                value={newLeave.reason}
                onChange={e => setNewLeave({...newLeave, reason: e.target.value})}
              />
              {formErrors.reason && <p className="text-red-500 text-xs mt-1">{formErrors.reason}</p>}
            </div>
            
            <div className="col-span-2 flex justify-center mt-4">
              <Button 
                type="submit" 
                className="bg-hr-purple hover:bg-hr-purple-light w-32"
              >
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Leaves; 
*/}

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { X, Download } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Leaves = () => {
  const [statusFilter, setStatusFilter] = useState();
  const [isAddLeaveModalOpen, setIsAddLeaveModalOpen] = useState(false);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [newLeave, setNewLeave] = useState({
    employeeName: '',
    designation: '',
    date: '',
    reason: '',
    document: null
  });
  const [formErrors, setFormErrors] = useState({});

  const handleDocumentUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewLeave({ ...newLeave, document: e.target.files[0] });
    }
  };

  const handleAddLeave = (e) => {
    e.preventDefault();
    const errors = {};
    if (!newLeave.employeeName) errors.employeeName = 'Required';
    if (!newLeave.designation) errors.designation = 'Required';
    if (!newLeave.date) errors.date = 'Required';
    if (!newLeave.reason) errors.reason = 'Required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newApplication = {
      id: leaveApplications.length + 1,
      employeeName: newLeave.employeeName,
      position: newLeave.designation,
      date: newLeave.date,
      reason: newLeave.reason,
      status: 'Pending',
      document: newLeave.document?.name || null,
      profile: '/placeholder.svg'
    };

    setLeaveApplications([...leaveApplications, newApplication]);
    toast({ title: 'Leave Added', description: 'Leave application submitted.' });
    setNewLeave({ employeeName: '', designation: '', date: '', reason: '', document: null });
    setFormErrors({});
    setIsAddLeaveModalOpen(false);
  };

  const filteredApplications = leaveApplications.filter(app => !statusFilter || app.status === statusFilter);

  return (
    <Layout title="Leaves">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddLeaveModalOpen(true)} className="bg-hr-purple text-white">
              Add Leave
            </Button>
          </div>

          <div className="rounded overflow-hidden">
            <div className="bg-hr-purple text-white px-4 py-2 font-semibold">Applied Leaves</div>
            <table className="w-full">
              <thead className="bg-hr-purple text-white">
                <tr>
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Reason</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Docs</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((leave) => (
                    <tr key={leave.id}>
                      <td className="p-3">
                        <img src={leave.profile} alt={leave.employeeName} className="w-8 h-8 rounded-full" />
                      </td>
                      <td className="p-3">{leave.employeeName}</td>
                      <td className="p-3">{leave.date}</td>
                      <td className="p-3">{leave.reason}</td>
                      <td className="p-3">{leave.status}</td>
                      <td className="p-3">{leave.document || 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-6 text-center text-hr-purple font-bold text-lg">
                      ONLY PRESENT EMPLOYEEES CAN TAKE LEAVE
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full lg:w-80 xl:w-96">
          <div className="border rounded overflow-hidden">
            <div className="bg-hr-purple text-white px-4 py-2 font-semibold">Leave Calendar</div>
            <div className="p-4">
              <div className="flex justify-between mb-2 text-sm">
                <button className="text-gray-600">&lt;</button>
                <span className="font-medium">September, 2024</span>
                <button className="text-gray-600">&gt;</button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="font-medium">{d}</div>)}
                {Array(35).fill(null).map((_, i) => (
                  <div key={i} className={`h-8 border rounded ${i === 7 ? 'bg-purple-200' : ''}`}>{i > 4 && i < 35 - 5 ? i - 4 : ''}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isAddLeaveModalOpen} onOpenChange={setIsAddLeaveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="bg-hr-purple text-white px-4 py-2 rounded-t flex justify-between">
              Add New Leave
              <button onClick={() => setIsAddLeaveModalOpen(false)}>
                <X className="text-white" />
              </button>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddLeave} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            <input
              type="text"
              placeholder="Search Employee Name"
              className="border px-3 py-2 rounded w-full"
              value={newLeave.employeeName}
              onChange={e => setNewLeave({ ...newLeave, employeeName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Designation*"
              className="border px-3 py-2 rounded w-full"
              value={newLeave.designation}
              onChange={e => setNewLeave({ ...newLeave, designation: e.target.value })}
            />
            <input
              type="text"
              placeholder="Leave Date*"
              className="border px-3 py-2 rounded w-full"
              value={newLeave.date}
              onChange={e => setNewLeave({ ...newLeave, date: e.target.value })}
            />
            <div className="flex items-center border px-3 py-2 rounded">
              <input type="file" onChange={handleDocumentUpload} className="w-full" />
              <Download className="text-hr-purple ml-2" />
            </div>
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Reason*"
                className="border px-3 py-2 rounded w-full"
                value={newLeave.reason}
                onChange={e => setNewLeave({ ...newLeave, reason: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 text-center">
              <Button className="bg-hr-purple text-white px-6 py-2 rounded" type="submit">Save</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Leaves;