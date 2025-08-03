import axios from 'axios';
import { useEffect, useState } from 'react';

// --- Icon Components for Rewards ---
const TshirtIcon = () => <svg className="w-12 h-12 mx-auto mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l-1.586-1.586a2 2 0 00-2.828 0L8 14m-4 4h16a2 2 0 002-2V6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const LinkedinIcon = () => <svg className="w-12 h-12 mx-auto mb-3 text-indigo-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>;
const CeoIcon = () => <svg className="w-12 h-12 mx-auto mb-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>;

const rewards = [
    { threshold: 500, title: 'Company T-Shirt', description: 'A stylish branded tee.', Icon: TshirtIcon },
    { threshold: 1000, title: 'LinkedIn Recommendation', description: 'A public endorsement.', Icon: LinkedinIcon },
    { threshold: 2500, title: 'Lunch with the CEO', description: 'A one-on-one meeting.', Icon: CeoIcon },
];

function Dashboard() {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/intern`)
      .then(response => {
        setInternData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Could not load data. Is the backend server running?");
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(internData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="text-center p-10 text-gray-500">Loading Dashboard...</div>;
  if (error) return <div className="text-center p-10 text-red-500 bg-red-100 rounded-lg">{error}</div>;

  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-8">
        
        <div>
            <h1 className="text-4xl font-bold text-gray-800">Welcome, {internData.name}!</h1>
            <p className="text-gray-500">Here's your progress overview.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Your Referral Code</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-mono font-bold text-indigo-600 bg-indigo-50 p-3 rounded-lg">
              {internData.referralCode}
            </p>
            <button
              onClick={handleCopy}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
        <div className="lg:col-span-2 bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 rounded-xl shadow-lg flex flex-col justify-center">
          <h3 className="text-lg font-semibold opacity-90">Total Donations Raised</h3>
          <p className="text-4xl font-bold">${internData.donations.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewards.map(({ title, description, Icon, threshold }) => {
            const isUnlocked = internData.donations >= threshold;
            return (
              <div key={title} className={`p-6 rounded-xl transition-all transform ${isUnlocked ? 'bg-white shadow-lg hover:-translate-y-1' : 'bg-gray-50 shadow-inner'}`}>
                <div className={`transition-opacity ${!isUnlocked && 'opacity-40'}`}>
                  <Icon />
                  <h4 className="font-bold text-lg text-center">{title}</h4>
                  <p className="text-sm text-gray-600 text-center mb-4">{description}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${Math.min((internData.donations / threshold) * 100, 100)}%` }}></div>
                  </div>
                  <p className="text-xs text-center mt-2 font-medium text-gray-500">
                    ${internData.donations.toLocaleString()} / ${threshold.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
