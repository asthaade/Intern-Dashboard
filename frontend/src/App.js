import { useState } from 'react';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import LoginPage from './LoginPage';

// --- Navigation Icons ---
const DashboardIcon = () => (
  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
);

const LeaderboardIcon = () => (
  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
);

const navItems = [
    { name: 'Dashboard', page: 'dashboard', icon: <DashboardIcon /> },
    { name: 'Leaderboard', page: 'leaderboard', icon: <LeaderboardIcon /> }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const navigateTo = (page) => setCurrentPage(page);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col p-4 transition-all">
        <div className="text-center pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Intern Portal</h2>
        </div>
        <ul className="mt-6 flex-grow space-y-2">
            {navItems.map((item) => (
                 <li
                    key={item.name}
                    onClick={() => navigateTo(item.page)}
                    className={`flex items-center px-4 py-3 rounded-md cursor-pointer transition-all group ${currentPage === item.page ? 'bg-blue-600 shadow-lg' : 'hover:bg-gray-700'}`}
                >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                </li>
            ))}
        </ul>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'leaderboard' && <Leaderboard />}
      </main>
    </div>
  );
}

export default App;