import axios from 'axios';
import { useEffect, useState } from 'react';

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/leaderboard`)
            .then(response => {
                setLeaderboard(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError("Could not load leaderboard. Is the backend server running?");
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center p-10 text-gray-500">Loading Leaderboard...</div>;
    if (error) return <div className="text-center p-10 text-red-500 bg-red-100 rounded-lg">{error}</div>;
    
    const topDonation = leaderboard.length > 0 ? leaderboard[0].donations : 0;

    return (
        <div className="animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Top Fundraisers</h1>
            <div className="space-y-4">
                {leaderboard.map((intern, index) => {
                    const rank = index + 1;
                    const progress = topDonation > 0 ? (intern.donations / topDonation) * 100 : 0;
                    
                    const rankClasses = {
                        1: 'text-yellow-500',
                        2: 'text-gray-500',
                        3: 'text-amber-600',
                    };
                    const rankClass = rankClasses[rank] || 'text-gray-700';

                    return (
                        <div key={intern._id} className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 transition-all transform hover:shadow-lg hover:scale-102">
                            <div className="w-12 text-center">
                                <span className={`font-bold text-2xl ${rankClass}`}>{rank}</span>
                            </div>
                            <div className="flex-grow">
                                <p className="font-bold text-gray-800">{intern.name}</p>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-600">${intern.donations.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">donated</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Leaderboard;
