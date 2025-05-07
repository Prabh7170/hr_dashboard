import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { X, MoreVertical, Download, Edit, Trash, UserPlus } from 'lucide-react';

const Candidates = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Selected",
      resume: null,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Interview",
      resume: null,
    },
  ]);
  
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ name: "", email: "", status: "" });
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    status: "Pending",
    resume: null,
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredCandidates = candidates.filter((c) => {
    return (
      c.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      c.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      c.status.toLowerCase().includes(filters.status.toLowerCase())
    );
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewCandidate({ ...newCandidate, resume: e.target.files[0] });
    }
  };

  const handleCreateCandidate = () => {
    // Validate the form
    const errors = {};
    if (!newCandidate.name) errors.name = 'Name is required';
    if (!newCandidate.email) errors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(newCandidate.email)) errors.email = 'Invalid email format';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    const id = candidates.length + 1;
    const created = { ...newCandidate, id };
    setCandidates([...candidates, created]);
    setNewCandidate({ name: "", email: "", status: "Pending", resume: null });
    setShowModal(false);
    
    toast({
      title: 'Candidate Added',
      description: `${created.name} has been added successfully.`
    });
  };

  const handleDeleteCandidate = (id) => {
    const candidateToDelete = candidates.find(c => c.id === id);
    setCandidates(candidates.filter(c => c.id !== id));
    
    toast({
      title: 'Candidate Removed',
      description: `${candidateToDelete?.name} has been removed from the system.`
    });
  };

  const downloadResume = (candidate) => {
    if (!candidate.resume) {
      toast({
        title: 'No Resume',
        description: 'This candidate has not uploaded a resume.',
        variant: 'destructive'
      });
      return;
    }
    
    toast({
      title: 'Resume Downloaded',
      description: `${candidate.resume.name} has been downloaded.`
    });
  };

  return (
    <Layout title="Candidates">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex gap-2 flex-wrap md:flex-nowrap w-full md:w-auto">
          <input
            type="text"
            name="name"
            placeholder="Search by name"
            value={filters.name}
            onChange={handleFilterChange}
            className="hr-input"
          />
          <input
            type="text"
            name="email"
            placeholder="Search by email"
            value={filters.email}
            onChange={handleFilterChange}
            className="hr-input"
          />
          <input
            type="text"
            name="status"
            placeholder="Search by status"
            value={filters.status}
            onChange={handleFilterChange}
            className="hr-input"
          />
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-hr-purple hover:bg-hr-purple-light w-full sm:w-auto"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Add Candidate
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-hr-purple text-white">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Resume</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-4">{candidate.name}</td>
                  <td className="p-4">{candidate.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      candidate.status === "Selected" 
                        ? "bg-green-100 text-green-800" 
                        : candidate.status === "Interview" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : candidate.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="p-4">
                    {candidate.resume ? candidate.resume.name : "N/A"}
                  </td>
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
                        {candidate.resume && (
                          <DropdownMenuItem
                            onClick={() => downloadResume(candidate)}
                            className="cursor-pointer"
                          >
                            <Download className="mr-2 h-4 w-4" /> Download Resume
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteCandidate(candidate.id)}
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
                <td colSpan={5} className="p-4 text-center">
                  No candidates found. Adjust your search filters or add a new candidate.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold bg-hr-purple text-white p-4 -m-6 mb-6 rounded-t-lg flex justify-between items-center">
              <span>Add Candidate</span>
              <button onClick={() => setShowModal(false)} className="text-white">
                <X className="h-6 w-6" />
              </button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name*
              </label>
              <input
                type="text"
                placeholder="Name"
                value={newCandidate.name}
                onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                className={`hr-input ${formErrors.name ? 'border-red-500' : ''}`}
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address*
              </label>
              <input
                type="email"
                placeholder="Email"
                value={newCandidate.email}
                onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })}
                className={`hr-input ${formErrors.email ? 'border-red-500' : ''}`}
              />
              {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={newCandidate.status}
                onChange={(e) => setNewCandidate({ ...newCandidate, status: e.target.value })}
                className="hr-input"
              >
                <option value="Pending">Pending</option>
                <option value="Interview">Interview</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume (optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="hr-input"
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => setShowModal(false)}
                variant="outline"
                className="mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateCandidate}
                className="bg-hr-purple hover:bg-hr-purple-light"
              >
                Create
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Candidates;
