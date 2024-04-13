"use client";
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useRouter } from 'next/navigation';
import { Flex, Spinner } from "@radix-ui/themes";

const Issues = () => {
  const router = useRouter();
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(5);
  const [editableIssueId, setEditableIssueId] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get('/api/issues');
        setIssues(response.data);
        setTimeout(() => {
          setIsFetching(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching issues:', error);
        setIsFetching(false);
      }
    };
    fetchIssues();
  }, []);

  useEffect(() => {
    let filtered = [...issues];
    if (statusFilter) {
      filtered = filtered.filter(issue => issue.status === statusFilter.toUpperCase());
    }
    if (startDateFilter && endDateFilter) {
      filtered = filtered.filter(issue => {
        const issueDate = new Date(issue.date);
        return issueDate >= new Date(startDateFilter) && issueDate <= new Date(endDateFilter);
      });
    }
    setFilteredIssues(filtered);
  }, [issues, statusFilter, startDateFilter, endDateFilter]);

const totalIssues = filteredIssues.length;
const totalPages = Math.ceil(totalIssues / issuesPerPage);

let indexOfFirstIssue = totalIssues - (currentPage * issuesPerPage);
let indexOfLastIssue = indexOfFirstIssue + issuesPerPage;

if (indexOfFirstIssue < 0) {
  indexOfFirstIssue = 0;
}
if (indexOfLastIssue > totalIssues) {
  indexOfLastIssue = totalIssues;
}

const currentIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue).reverse();


  const paginate = pageNumber => setCurrentPage(pageNumber);

  const updateIssueStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/issues/${id}`, { status: newStatus });
      const response = await axios.get('/api/issues');
      setIssues(response.data);
      setEditableIssueId(null);
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };


  return (
    <>
      {isFetching ? (
        <div className="flex justify-center items-center">
          <Spinner size="3" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">View Issues</h1>
          <div className="mb-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 mr-2"
              >
              <option value="">Select Status</option>
              <option value="Open">Open</option>
              <option value="In_Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <input
              type="date"
              placeholder="Start Date"
              value={startDateFilter}
              onChange={e => setStartDateFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2 mr-2"
            />
            <input
              type="date"
              placeholder="End Date"
              value={endDateFilter}
              onChange={e => setEndDateFilter(e.target.value)}
              className="border border-gray-300 px-4 py-2"
            />
          </div>

          <table className="table-auto w-full border-collapse border">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-blue-900 text-white rounded-tl-lg">ID</th>
                <th className="px-4 py-2 bg-blue-900 text-white">Title</th>
                <th className="px-4 py-2 bg-blue-900 text-white">Date</th>
                <th className="px-4 py-2 bg-blue-900 text-white">Description</th>
                <th className="px-4 py-2 bg-blue-900 text-white">Status</th>
                <th className="px-4 py-2 bg-blue-900 text-white rounded-tr-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentIssues.map(issue => (
                <tr key={issue.id}>
                  <td className="px-4 py-2 border">{issue.id}</td>
                  <td className="px-4 py-2 border">{new Date(issue.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 border">{issue.title}</td>
                  <td className="px-4 py-2 border break-words">{issue.description}</td>
                  <td className="px-4 py-2 border">
                    {editableIssueId === issue.id ? (
                      <select
                        value={issue.status}
                        onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                        className="bg-white border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    ) : (
                    <span className={`inline-block px-2 py-1 rounded-lg ${issue.status === 'OPEN' ? 'bg-red-400 text-white' : issue.status === 'IN_PROGRESS' ? 'bg-yellow-300 text-black' : 'bg-green-400 text-white'}`}>
                        {issue.status}
                    </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    {editableIssueId === issue.id ? (
                      <button
                        onClick={() => setEditableIssueId(null)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditableIssueId(issue.id)}
                        className="bg-blue-400 text-white px-4 w-28 py-2 rounded-md focus:outline-none"
                      >
                        Edit Status
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-8">
            {Array.from({ length: Math.ceil(filteredIssues.length / issuesPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-2 ${
                  currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                } rounded-md focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Issues;
