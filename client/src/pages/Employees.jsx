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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, MoreVertical, Edit, Trash } from 'lucide-react';

const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane.copper@example.com',
      phone: '(704) 555-0127',
      position: 'Intern',
      department: 'Designer',
      joiningDate: '10/06/13',
      profile: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(684) 555-0102',
      position: 'Manager',
      department: 'Marketing',
      joiningDate: '05/12/18',
      profile: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(501) 555-0199',
      position: 'Senior Developer',
      department: 'Engineering',
      joiningDate: '02/03/20',
      profile: '/placeholder.svg'
    }
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [positionFilter, setPositionFilter] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const handleEmployeeEdit = (e) => {
    e.preventDefault();

    if (!currentEmployee) return;

    const errors = {};
    if (!currentEmployee.name) errors.name = 'Full name is required';
    if (!currentEmployee.email) errors.email = 'Email address is required';
    else if (!/^\S+@\S+\.\S+$/.test(currentEmployee.email)) errors.email = 'Invalid email format';
    if (!currentEmployee.phone) errors.phone = 'Phone number is required';
    if (!currentEmployee.position) errors.position = 'Position is required';
    if (!currentEmployee.department) errors.department = 'Department is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const updatedEmployees = employees.map(emp =>
      emp.id === currentEmployee.id ? currentEmployee : emp
    );
    setEmployees(updatedEmployees);
    setIsEditModalOpen(false);

    toast({
      title: 'Employee Updated',
      description: `${currentEmployee.name}'s information has been updated successfully.`
    });
  };

  const handleDeleteEmployee = (id) => {
    const employeeToDelete = employees.find(emp => emp.id === id);
    setEmployees(employees.filter(emp => emp.id !== id));

    toast({
      title: 'Employee Removed',
      description: `${employeeToDelete?.name} has been removed from the system.`
    });
  };

  const openEditModal = (employee) => {
    setCurrentEmployee(employee);
    setIsEditModalOpen(true);
    setFormErrors({});
  };

  const filteredEmployees = employees.filter(employee => {
    // Filter by position
    const positionMatch = !positionFilter || employee.position === positionFilter;
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    return positionMatch && searchMatch;
  });

  const positions = Array.from(new Set(employees.map(emp => emp.position)));

  return (
    <Layout title="Employees">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="w-full sm:w-40">
          <Select onValueChange={setPositionFilter} value={positionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Positions</SelectItem>
              {positions.map((position, index) => (
                <SelectItem key={index} value={position}>{position}</SelectItem>
              ))}
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
                <th className="text-left p-4">Email Address</th>
                <th className="text-left p-4">Phone Number</th>
                <th className="text-left p-4">Position</th>
                <th className="text-left p-4">Department</th>
                <th className="text-left p-4">Date of Joining</th>
                <th className="text-left p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee, index) => (
                  <tr key={employee.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {employee.profile ? (
                          <img src={employee.profile} alt={employee.name} className="w-full h-full object-cover" />
                        ) : (
                          employee.name.charAt(0)
                        )}
                      </div>
                    </td>
                    <td className="p-4">{employee.name}</td>
                    <td className="p-4">{employee.email}</td>
                    <td className="p-4">{employee.phone}</td>
                    <td className="p-4">{employee.position}</td>
                    <td className="p-4">{employee.department}</td>
                    <td className="p-4">{employee.joiningDate}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => openEditModal(employee)}
                            className="cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-4 text-center">
                    No employees found. Try adjusting your filters or add candidates as employees.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-hr-purple text-white p-4 -m-6 mb-6 rounded-t-lg flex justify-between items-center">
              <span>Edit Employee Details</span>
              <button onClick={() => setIsEditModalOpen(false)} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </DialogTitle>
          </DialogHeader>

          {currentEmployee && (
            <form onSubmit={handleEmployeeEdit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  className={`hr-input ${formErrors.name ? 'border-red-500' : ''}`}
                  value={currentEmployee.name}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, name: e.target.value })}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address*
                </label>
                <input
                  type="email"
                  className={`hr-input ${formErrors.email ? 'border-red-500' : ''}`}
                  value={currentEmployee.email}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, email: e.target.value })}
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  className={`hr-input ${formErrors.phone ? 'border-red-500' : ''}`}
                  value={currentEmployee.phone}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, phone: e.target.value })}
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department*
                </label>
                <input
                  type="text"
                  className={`hr-input ${formErrors.department ? 'border-red-500' : ''}`}
                  value={currentEmployee.department}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, department: e.target.value })}
                />
                {formErrors.department && <p className="text-red-500 text-xs mt-1">{formErrors.department}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position*
                </label>
                <select
                  className={`hr-input ${formErrors.position ? 'border-red-500' : ''}`}
                  value={currentEmployee.position}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, position: e.target.value })}
                >
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Manager">Manager</option>
                  <option value="Director">Director</option>
                  <option value="Senior Developer">Senior Developer</option>
                </select>
                {formErrors.position && <p className="text-red-500 text-xs mt-1">{formErrors.position}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Joining*
                </label>
                <input
                  type="text"
                  className="hr-input"
                  value={currentEmployee.joiningDate}
                  onChange={e => setCurrentEmployee({ ...currentEmployee, joiningDate: e.target.value })}
                />
              </div>

              <div className="col-span-2 flex justify-center mt-4">
                <Button
                  type="submit"
                  className="bg-hr-purple hover:bg-hr-purple-light"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Employees;
