import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';

function MyBids() {
  const [activeTab, setActiveTab] = useState('bids'); 
  const [bids, setBids] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [jobsInfo, setJobsInfo] = useState({}); 

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await axios.get('https://freelancer-backend-qu3g.onrender.com/api/bids/mybids', { withCredentials: true });
        setBids(res.data.bids || []);
      } catch (err) {
        console.error('Error fetching bids:', err);
      }
    };
    fetchBids();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('https://freelancer-backend-qu3g.onrender.com/api/tasks/my-tasks', { withCredentials: true });
        const taskData = res.data || [];
        setTasks(taskData);

      
        const jobIds = [...new Set(taskData.filter(t => t.job_id).map(t => t.job_id._id))]; 
        const jobsMap = {};
        await Promise.all(jobIds.map(async (jobId) => {
          try {
            const jobRes = await axios.get(`https://freelancer-backend-qu3g.onrender.com/api/jobs/job/${jobId}`, { withCredentials: true });
            jobsMap[jobId] = {
              status: jobRes.data.status,
              certificate: jobRes.data.certificate || null
            };
          } catch (err) {
            console.error(`Error fetching job ${jobId}:`, err);
          }
        }));
        setJobsInfo(jobsMap);

      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'open': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };


  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">


        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent tracking-wide">
            {activeTab === 'bids' ? 'My Bids' : 'My Tasks'}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            {activeTab === 'bids'
              ? 'Track your job bids, monitor progress, and follow up on opportunities.'
              : 'View your assigned tasks grouped by job and manage them.'}
          </p>
        </div>

        
        <div className="flex justify-center mb-8 gap-4">
          <button onClick={() => setActiveTab('bids')} 
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab==='bids' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Bids
          </button>
          <button onClick={() => setActiveTab('tasks')} 
            className={`px-6 py-2 rounded-full font-semibold transition ${activeTab==='tasks' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
            Tasks
          </button>
        </div>

        {activeTab === 'bids' ? (
          bids.length === 0 ? <p className="text-center text-gray-500">No bids found.</p> :
          <div className="space-y-4">
            {bids.map(bid => (
              <div key={bid._id} className="bg-white rounded-xl shadow-lg p-5 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-emerald-600">{bid.job_id?.title || 'Job Deleted'}</h2>
                  <div className="text-sm text-gray-600 mt-1 space-y-1">
                    <p><span className="font-medium text-emerald-600">Bid Amount:</span> ${bid.bid_amount}</p>
                    <p><span className="font-medium text-emerald-600">Timeline:</span> {bid.timeline}</p>
                    {bid.job_id?.deadline && <p><span className="font-medium text-emerald-600">Deadline:</span> {new Date(bid.job_id.deadline).toLocaleDateString()}</p>}
                    <p className="italic">{bid.message || 'No message provided'}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className={`px-3 py-1 text-xs rounded-full font-semibold ${getStatusStyle(bid.status)}`}>{bid.status}</span>
                  {bid.job_id ? <Link to={`/job/${bid.job_id._id}`} className="px-4 py-2 text-sm rounded-full text-white font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-md hover:shadow-lg transition">View Job</Link> : 
                  <button disabled className="px-4 py-2 text-sm rounded-full bg-gray-400 text-white cursor-not-allowed">Job Unavailable</button>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          tasks.filter(t => t.job_id).length === 0 ? <p className="text-center text-gray-500">No tasks assigned.</p> :
          Array.from(tasks.reduce((map, t) => {
            if (!t.job_id) return map; // skip null jobs
            const jobId = t.job_id._id;
            if (!map.has(jobId)) map.set(jobId, []);
            map.get(jobId).push(t);
            return map;
          }, new Map())).map(([jobId, jobTasks]) => {
            const job = jobTasks[0].job_id;
            if (!job) return null; 
            const jobStatus = jobsInfo[jobId]?.status || job.status;
            const certificate = jobsInfo[jobId]?.certificate || job.certificate;

            return (
              <div key={jobId} className="mb-6 bg-white rounded-xl shadow-lg p-5 border border-gray-100">
                
              
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-bold text-emerald-600">{job.title}</h2>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getStatusStyle(jobStatus)}`}>
                    {jobStatus}
                  </span>
                </div>

             
                {jobStatus === 'completed' && certificate && (
                  <button 
                    onClick={() => handleDownload(certificate, `${job.title}-certificate.pdf`)}
                    className="inline-block mb-3 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Download Certificate
                  </button>
                )}

                {/* Tasks under job */}
                {jobTasks.map(task => (
                  <div key={task._id} className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center flex-col sm:flex-row sm:items-center gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-700">{task.title}</h3>
                      <p className="text-gray-600 italic">{task.description}</p>
                      <span className={`px-2 py-1 mt-1 inline-block text-xs rounded-full font-semibold ${getStatusStyle(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Link to={`/tasks/${task._id}`} className="px-4 py-1 text-sm rounded-full text-white font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 shadow-md hover:shadow-lg transition">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}

              </div>
            )
          })
        )}

      </div>
      <Footer />
    </div>
  );
}

export default MyBids;
