
import React, { useState } from "react";

const initialCandidates = [
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
];

export default function Candidate() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({ name: "", email: "", status: "" });
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    status: "Pending",
    resume: null,
  });

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
    setNewCandidate({ ...newCandidate, resume: e.target.files[0] });
  };

  const handleCreateCandidate = () => {
    const id = candidates.length + 1;
    const created = { ...newCandidate, id };
    setCandidates([...candidates, created]);
    setNewCandidate({ name: "", email: "", status: "Pending", resume: null });
    setShowModal(false);
  };

  const downloadResume = (candidate) => {
    if (!candidate.resume) return;
    const url = URL.createObjectURL(candidate.resume);
    const link = document.createElement("a");
    link.href = url;
    link.download = candidate.resume.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Candidates</h1>

      {/* Filter Inputs */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Search by name"
          value={filters.name}
          onChange={handleFilterChange}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="email"
          placeholder="Search by email"
          value={filters.email}
          onChange={handleFilterChange}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="status"
          placeholder="Search by status"
          value={filters.status}
          onChange={handleFilterChange}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          + Add Candidate
        </button>
      </div>

      {/* Candidate Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Resume</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate) => (
            <tr key={candidate.id}>
              <td className="p-2 border">{candidate.name}</td>
              <td className="p-2 border">{candidate.email}</td>
              <td className="p-2 border">{candidate.status}</td>
              <td className="p-2 border">
                {candidate.resume ? candidate.resume.name : "N/A"}
              </td>
              <td className="p-2 border">
                {candidate.resume && (
                  <button
                    onClick={() => downloadResume(candidate)}
                    className="text-blue-500 underline"
                  >
                    Download
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Create Candidate */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Candidate</h2>
            <input
              type="text"
              placeholder="Name"
              value={newCandidate.name}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, name: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newCandidate.email}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, email: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />
            <select
              value={newCandidate.status}
              onChange={(e) =>
                setNewCandidate({ ...newCandidate, status: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="Interview">Interview</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full border p-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCandidate}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
