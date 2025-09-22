import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function JobDetails() {
  const { id } = useParams();
  
  const [job, setJob] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
    skills: [],
    status: '',
    category: ''
  });
  
  const [showForm, setShowForm] = useState(false);
  const [bidData, setBidData] = useState({
    bid_amount: '',
    timeline: '',
    message: ''
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/jobs/job/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Failed to fetch job details');
        const data = await response.json();
        setJob(data.job);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleBidChange = (e) => {
    setBidData({
      ...bidData,
      [e.target.name]: e.target.value
    });
  };
const handleBidSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`https://freelancer-backend-qu3g.onrender.com/api/bids/submitbid/${id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bidData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit bid');
    }

    const data = await response.json();
    console.log('Bid submitted successfully:', data);
    
    
    setBidData({
      bid_amount: '',
      timeline: '',
      message: ''
    });
    setShowForm(false);
    
   
    toast.success('Bid submitted successfully!');

  } catch (error) {
    console.error('Error submitting bid:', error);
    toast.error(error.message || 'Error submitting bid');
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-blue-100 relative">
      <Navbar />

      <div className="flex justify-center items-center py-10 px-4">
        <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h1>
          <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <strong className="text-green-700">Budget:</strong>
              <p className="text-lg font-semibold text-gray-800">${job.budget}</p>
            </div>
            <div>
              <strong className="text-green-700">Deadline:</strong>
              <p className="text-lg font-semibold text-gray-800">
                {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div>
              <strong className="text-green-700">Category:</strong>
              <p className="text-lg font-semibold text-gray-800">{job.category}</p>
            </div>
            <div>
              <strong className="text-green-700">Status:</strong>
              <p className="text-lg font-semibold text-gray-800">{job.status}</p>
            </div>
          </div>

          <div>
            <strong className="text-green-700 block mb-2">Skills Required:</strong>
            {Array.isArray(job.skills) && job.skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium rounded-full 
                               bg-gradient-to-r from-green-400 to-blue-500 text-white 
                               shadow-md hover:scale-105 transition-transform duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specific skills listed</p>
            )}
          </div>
        </div>
      </div>

      {!showForm && (
        <div className="mt-5 flex justify-center sm:justify-end px-4">
          <button
            onClick={handleApplyClick}
            className="w-3/4 sm:w-auto px-6 py-3 text-lg font-semibold 
                       bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full 
                       shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 
                       transition-all duration-200 ease-in-out"
          >
            Apply Now
          </button>
        </div>
      )}

 
      {showForm && (
        <div className="flex justify-center px-4 py-6">
          <form
            onSubmit={handleBidSubmit}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/50 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Submit Your Bid</h2>

            <div className="mb-4">
              <label className="block mb-1 font-semibold">Bid Amount ($)</label>
              <input
                type="number"
                name="bid_amount"
                value={bidData.bid_amount}
                onChange={handleBidChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
<div className="mb-4">
              <label className="block mb-1 font-semibold">Timeline</label>
              <input
                type="text"
                name="timeline"
                value={bidData.timeline}
                onChange={handleBidChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Cover Letter</label>
              <textarea
                name="message"
                value={bidData.message}
                onChange={handleBidChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg shadow-md hover:scale-105 transition-all"
              >
                Submit Bid
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default JobDetails;

